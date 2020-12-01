export type ResolverTypeWrapper<T> = Promise<T> | T

export interface Connection<Node> {
  edges: Array<Edge<Node>>
  nodes: Array<Node>
  pageInfo: PageInfo
}
export interface Edge<Node> {
  cursor: string
  node: Node
}
export interface PageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string | null
  endCursor: string | null
}

export type ConnectionArgs = {
  first?: number | null
  last?: number | null
  after?: string | null
  before?: string | null
}

export type PageConnectionArgs = {
  first: number
  after?: string | null
}
