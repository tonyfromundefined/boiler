/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Version_query = {
    readonly version: string;
    readonly " $refType": "Version_query";
};
export type Version_query$data = Version_query;
export type Version_query$key = {
    readonly " $data"?: Version_query$data;
    readonly " $fragmentRefs": FragmentRefs<"Version_query">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Version_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "version",
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '17fa9628ba574abf1b44c019372dc530';
export default node;
