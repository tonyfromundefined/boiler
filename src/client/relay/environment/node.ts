import axios from 'axios'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const PORT = 3000

export function getInitialEnvironment() {
  const source = new RecordSource()
  const store = new Store(source)

  const network = Network.create(async (operation, variables) => {
    const { data } = await axios.post(`http://localhost:${PORT}/graphql`, {
      query: operation.text,
      variables,
    })
    return data
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
