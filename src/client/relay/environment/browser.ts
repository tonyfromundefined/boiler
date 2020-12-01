import axios from 'axios'
import * as R from 'ramda'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const source = new RecordSource()
const store = new Store(source)

let environment: Environment | null = null

export function getEnvironment(_source?: any) {
  if (environment) {
    return environment
  }

  const network = Network.create(async (operation, variables) => {
    const { data } = await axios.post('/graphql', {
      query: operation.text,
      variables,
    })
    return data
  })

  if (_source) {
    R.pipe(
      () => _source,
      Object.entries,
      R.map(([dataId, record]) => source.set(dataId, record))
    )()
  }

  return (environment = new Environment({
    network,
    store,
  }))
}
