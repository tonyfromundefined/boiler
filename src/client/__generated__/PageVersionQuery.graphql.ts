/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PageVersionQueryVariables = {};
export type PageVersionQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Version_query">;
};
export type PageVersionQuery = {
    readonly response: PageVersionQueryResponse;
    readonly variables: PageVersionQueryVariables;
};



/*
query PageVersionQuery {
  ...Version_query
}

fragment Version_query on Query {
  version
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PageVersionQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Version_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PageVersionQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "version",
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a5f8a78b20545f95dbe601b57e69f116",
    "id": null,
    "metadata": {},
    "name": "PageVersionQuery",
    "operationKind": "query",
    "text": "query PageVersionQuery {\n  ...Version_query\n}\n\nfragment Version_query on Query {\n  version\n}\n"
  }
};
(node as any).hash = '1fe3ba4ef23b9cb180e1798c57d995e3';
export default node;
