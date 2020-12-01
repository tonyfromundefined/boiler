declare module 'mongoose' {
  /**
   * Override `model` function for Model.modelName typing
   */
  export function model<T extends Document, N extends string>(
    name: N,
    schema: Schema,
    collection?: string,
    skipInit?: boolean
  ): Model<T> & { modelName: N }
}
