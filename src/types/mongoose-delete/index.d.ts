import { SoftDeleteInterface } from 'mongoose-delete'

declare module 'mongoose' {
  export interface Document extends Omit<SoftDeleteInterface, 'deleteAt'> {
    delete(
      deleteBy?: string | mongoose.Types.ObjectId | Callback<this>,
      fn?: Callback<this>
    ): Promise<this>
    restore(fn?: Callback<this>): Promise<this>
    deletedAt?: Date
  }
}
