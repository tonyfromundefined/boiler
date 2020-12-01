declare module 'mongoose-timestamp'

declare module 'mongoose' {
  export interface Document {
    createdAt: globalThis.Date
    updatedAt: globalThis.Date
  }
}
