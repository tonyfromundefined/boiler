import { Document, model, Schema } from 'mongoose'

export interface DocumentQueryMap extends Document {
  /**
   * Query Hash
   */
  queryHash: string

  /**
   * Query
   */
  query: string
}

const SchemaQueryMap = new Schema<DocumentQueryMap>({
  queryHash: {
    type: String,
    required: true,
    index: true,
  },
  query: {
    type: String,
    required: true,
  },
})

export const QueryMap = model<DocumentQueryMap, 'QueryMap'>(
  'QueryMap',
  SchemaQueryMap,
  'query_maps'
)
