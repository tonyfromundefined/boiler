import { omitBy } from 'lodash'

/**
 * Creates an object with all null values removed.
 * @param obj The object to compact
 */
export function compactMap<T extends {}>(
  obj: T
): {
  [key in keyof T]: NonNullable<T[key]>
} {
  return omitBy(obj, (value) => value === null || value === undefined) as any
}
