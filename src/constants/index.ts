/**
 * The current stage of the server is running on
 */
export const STAGE = process.env.STAGE as 'development' | 'alpha' | 'production'

/**
 * MongoDB endpoint
 */
export const MONGO_ENDPOINT = process.env.MONGO_ENDPOINT as string
