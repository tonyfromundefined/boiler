/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PageIndexQueryVariables = {};
export type PageIndexQueryResponse = {
    readonly version: string;
    readonly " $fragmentRefs": FragmentRefs<"Version_query">;
};
export type PageIndexQuery = {
    readonly response: PageIndexQueryResponse;
    readonly variables: PageIndexQueryVariables;
};



/*
query PageIndexQuery {
  version
  ...Version_query
}

fragment Version_query on Query {
  version
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "version",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PageIndexQuery",
    "selections": [
      (v0/*: any*/),
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
    "name": "PageIndexQuery",
    "selections": [
      (v0/*: any*/)
    ]
  },
  "params": {
    "cacheID": "715b0f65b2a121b630c3262c163ac05d",
    "id": null,
    "metadata": {},
    "name": "PageIndexQuery",
    "operationKind": "query",
    "text": "query PageIndexQuery {\n  version\n  ...Version_query\n}\n\nfragment Version_query on Query {\n  version\n}\n"
  }
};
})();
(node as any).hash = '683e61ca82d9fd049b2d1bd223bd4125';
export default node;
