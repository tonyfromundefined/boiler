declare module 'mongoose-timestamp'

declare module 'mongoose' {
  export interface Document {
    createdAt: Date
    updatedAt: Date
  }
}
