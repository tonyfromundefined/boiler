import { Document, model, Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseTimestamp from 'mongoose-timestamp'

export interface DocumentArticle extends Document {
  /**
   * Content
   */
  content: string
}

const SchemaArticle = new Schema({
  content: {
    type: String,
    required: true,
    default: () => '',
  },
})

SchemaArticle.plugin(mongooseTimestamp)
SchemaArticle.plugin(mongooseDelete, { deletedAt: true })

export const Article = model<DocumentArticle, 'Article'>(
  'Article',
  SchemaArticle,
  'articles'
)
