# SLP Graph Search gRPC Interface for web and node.js clients


## Install
`npm i grpc-graphsearch-web`

#### web browser
`<script src='https://unpkg.com/grpc-gs'></script>`


### Build from source (from `./bchrpc.proto`)
1. Install Protocol Compiler from: https://github.com/protocolbuffers/protobuf
2. `npm i`
3. `npm run build`


## Example usage

```ts
let grpc = new GraphSearchClient();
let txid = "598c6572b70680710560d2ab40cabfde3156353ec5da217e18a8519843ff4423";
let res;
(async () => { res = await grpc.graphSearchFor({ hash: txid, reversedHashOrder: true }))();
res.forEach(i => console.log(res.getTxdataList_asU8());
```

## Change Log

No npm packages published yet
