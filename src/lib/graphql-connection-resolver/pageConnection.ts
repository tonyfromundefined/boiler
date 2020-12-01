import { GraphQLResolveInfo } from 'graphql'
import { last, reverse } from 'lodash'

import { decodeCursor, encodeCursor } from './helpers'
import {
  Connection,
  ConnectionArgs,
  Edge,
  PageInfo,
  ResolverTypeWrapper,
} from './types'

export function pageConnection<
  Parent,
  Args extends ConnectionArgs,
  Context,
  Node
>({
  page: getPage,
  pageSize,
  lastPageNum: getLastPageNum,
}: {
  page: (
    pageNum: number,
    parent: Parent,
    args: Omit<Args, 'after' | 'before'>,
    context: Context,
    info: GraphQLResolveInfo
  ) => Promise<{
    nodes: Node[]
    hasNextPage: boolean
  }>
  pageSize: number
  lastPageNum?: (
    parent: Parent,
    args: Omit<Args, 'after' | 'before'>,
    context: Context,
    info: GraphQLResolveInfo
  ) => Promise<number | null>
}): (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Connection<ResolverTypeWrapper<Node>>> {
  return async (parent, args, context, info) => {
    if (args.first && args.last) {
      throw new Error(
        'args.first and args.last cannot be used at the same time'
      )
    }

    if (args.after) {
      const [pageNum, itemIndex] = decodeCursor(args.after)
        .split('#')
        .map(Number)

      if (pageNum === NaN || itemIndex === NaN) {
        throw new Error(`Invalid cursor type`)
      }
    }
    if (args.before) {
      const [pageNum, itemIndex] = decodeCursor(args.before)
        .split('#')
        .map(Number)

      if (pageNum === NaN || itemIndex === NaN) {
        throw new Error(`Invalid cursor type`)
      }
    }

    let afterPageNum = 1
    let afterItemIndex = -1

    let beforePageNum = Infinity
    let beforeItemIndex = pageSize

    if (getLastPageNum) {
      const lastPageNum = await getLastPageNum(parent, args, context, info)

      if (lastPageNum) {
        beforePageNum = lastPageNum
      }
    }

    if ('first' in args && args.after != null) {
      const [pageNum, itemIndex] = decodeCursor(args.after)
        .split('#')
        .map(Number)

      afterPageNum = pageNum
      afterItemIndex = itemIndex
    }
    if ('last' in args && args.before != null) {
      const [pageNum, itemIndex] = decodeCursor(args.before)
        .split('#')
        .map(Number)

      beforePageNum = pageNum
      beforeItemIndex = itemIndex
    }

    let edges: Array<Edge<Node>> = []
    const pageInfo: PageInfo = {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    }

    const promises: Array<Promise<{
      nodes: Node[]
      hasNextPage: boolean
      pageNum: number
    }>> = []

    if (args.first) {
      for (
        let i = 0;
        i < Math.ceil((afterItemIndex + 1 + args.first) / pageSize);
        i++
      ) {
        const pageNum = afterPageNum + i

        promises.push(
          getPage(
            pageNum,
            parent,
            {
              ...args,
              after: undefined,
              before: undefined,
            },
            context,
            info
          ).then((page) => ({
            ...page,
            pageNum,
          }))
        )
      }
    }
    if (args.last && beforePageNum !== Infinity) {
      for (
        let i =
          Math.ceil((pageSize - beforeItemIndex + 1 + args.last) / pageSize) -
          1;
        i >= 0;
        i--
      ) {
        if (beforePageNum - i > 0) {
          const pageNum = beforePageNum - i

          promises.push(
            getPage(
              pageNum,
              parent,
              {
                ...args,
                after: undefined,
                before: undefined,
              },
              context,
              info
            ).then((page) => ({
              ...page,
              pageNum,
            }))
          )
        }
      }
    }

    const responses = await Promise.all(promises)
    const lastResponse = last(responses)

    for (const response of responses) {
      response.nodes.map((node, nodeIndex) => {
        edges.push({
          cursor: encodeCursor([response.pageNum, nodeIndex].join('#')),
          node,
        })
      })

      if (!response.hasNextPage) {
        break
      }
    }

    const rightEdge = last(edges)

    if (args.first) {
      edges = edges.filter((edge) => {
        const [pageNum, itemIndex] = decodeCursor(edge.cursor)
          .split('#')
          .map(Number)

        return afterPageNum === pageNum
          ? afterItemIndex < itemIndex
          : afterPageNum < pageNum
      })
      edges = edges.filter((edge, edgeIndex) => {
        return edgeIndex < args.first!
      })
    }
    if (args.last) {
      edges = reverse(edges)
      edges = edges.filter((edge) => {
        const [pageNum, itemIndex] = decodeCursor(edge.cursor)
          .split('#')
          .map(Number)

        return beforePageNum === pageNum
          ? beforeItemIndex > itemIndex
          : beforePageNum > pageNum
      })
      edges = edges.filter((edge, edgeIndex) => {
        return edgeIndex < args.last!
      })
      edges = reverse(edges)
    }

    const firstEdge: Edge<Node> | undefined = edges[0]
    const lastEdge = last(edges)

    pageInfo.hasNextPage = !!lastResponse?.hasNextPage

    if (rightEdge?.cursor && lastEdge?.cursor) {
      const [rightEdgePageNum, rightEdgeItemIndex] = decodeCursor(
        rightEdge.cursor
      )
        .split('#')
        .map(Number)
      const [lastEdgePageNum, lastEdgeItemIndex] = decodeCursor(lastEdge.cursor)
        .split('#')
        .map(Number)

      if (
        rightEdgePageNum !== lastEdgePageNum ||
        rightEdgeItemIndex !== lastEdgeItemIndex
      ) {
        pageInfo.hasNextPage = true
      }
    }

    if (firstEdge?.cursor) {
      const [pageNum, itemIndex] = decodeCursor(firstEdge.cursor)
        .split('#')
        .map(Number)
      if (pageNum > 1 || itemIndex > 0) {
        pageInfo.hasPreviousPage = true
      }
    }

    if (firstEdge) {
      pageInfo.startCursor = firstEdge.cursor
    }
    if (lastEdge) {
      pageInfo.endCursor = lastEdge.cursor
    }

    return {
      edges,
      nodes: edges.map((edge) => edge.node),
      pageInfo,
    }
  }
}
