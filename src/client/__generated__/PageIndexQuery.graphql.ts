/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PageIndexQueryVariables = {};
export type PageIndexQueryResponse = {
    readonly ping: boolean;
};
export type PageIndexQuery = {
    readonly response: PageIndexQueryResponse;
    readonly variables: PageIndexQueryVariables;
};



/*
query PageIndexQuery {
  ping
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ping",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PageIndexQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PageIndexQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "539dd68853d3ffd453df1fc6b1401fd2",
    "id": null,
    "metadata": {},
    "name": "PageIndexQuery",
    "operationKind": "query",
    "text": "query PageIndexQuery {\n  ping\n}\n"
  }
};
})();
(node as any).hash = '48526b8c0aef78afa0366c50eea4f7f9';
export default node;
