import { Document, model, Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseTimestamp from 'mongoose-timestamp'

export interface DocumentArticle extends Document {}

const SchemaArticle = new Schema({})

SchemaArticle.plugin(mongooseTimestamp)
SchemaArticle.plugin(mongooseDelete, { deletedAt: true })

export const Application = model<DocumentArticle, 'Article'>(
  'Article',
  SchemaArticle,
  'articles'
)
