import { GraphQLResolveInfo } from 'graphql'
import { last } from 'lodash'

import { decodeCursor, encodeCursor } from './helpers'
import {
  Connection,
  ConnectionArgs,
  PageInfo,
  ResolverTypeWrapper,
} from './types'

export function connection<Parent, Args extends ConnectionArgs, Context, Node>({
  cursorFromNode: getCursorFromNode,
  nodes: getNodes,
}: {
  cursorFromNode: (node: Node, nodeIndex: number) => string
  nodes: (
    parent: Parent,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ) => Promise<Node[]>
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

    let nodes: Node[] = []

    if (args.first) {
      nodes = await getNodes(
        parent,
        {
          ...args,
          first: args.first,
          after: args.after && decodeCursor(args.after),
        },
        context,
        info
      )
    }
    if (args.last) {
      nodes = await getNodes(
        parent,
        {
          ...args,
          last: args.last,
          before: args.before && decodeCursor(args.before),
        },
        context,
        info
      )
    }

    if (args.first) {
      const hasNextPage = nodes.length > args.first
      const hasPreviousPage = !!args.after

      nodes = nodes.filter((_, i) => i < args.first!)

      const startCursor =
        nodes.length > 0 ? encodeCursor(getCursorFromNode(nodes[0], 0)) : null
      const endCursor =
        nodes.length > 0
          ? encodeCursor(getCursorFromNode(last(nodes)!, nodes.length - 1))
          : null

      const pageInfo: PageInfo = {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      }

      return {
        edges: nodes.map((node, nodeIndex) => ({
          node,
          cursor: encodeCursor(getCursorFromNode(node, nodeIndex)),
        })),
        nodes,
        pageInfo,
      }
    }

    if (args.last) {
      const hasNextPage = !!args.before
      const hasPreviousPage = nodes.length > args.last

      nodes = nodes.filter((_, i) => i < args.last!)

      const startCursor =
        nodes.length > 0 ? encodeCursor(getCursorFromNode(nodes[0], 0)) : null
      const endCursor =
        nodes.length > 0
          ? encodeCursor(getCursorFromNode(last(nodes)!, nodes.length - 1))
          : null

      const pageInfo: PageInfo = {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      }

      return {
        edges: nodes.map((node, nodeIndex) => ({
          node,
          cursor: encodeCursor(getCursorFromNode(node, nodeIndex)),
        })),
        nodes,
        pageInfo,
      }
    }

    return {
      edges: [],
      nodes: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    }
  }
}
