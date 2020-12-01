import axios from 'axios'
import * as R from 'ramda'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const PORT = 3000

export function getInitialEnvironment() {
  const source = new RecordSource()
  const store = new Store(source)

  const network = Network.create((operation, variables) => {
    return R.pipe(
      () =>
        axios.post(`http://localhost:${PORT}/graphql`, {
          id: operation.id,
          query: operation.text,
          variables,
        }),
      R.andThen(({ data }) => data)
    )()
  })

  return {
    environment: new Environment({
      network,
      store,
    }),
    source,
    store,
  }
}
