import { assert } from "chai";
import { GraphSearchClient, grpc, NodeHttpTransport } from "../src/index";
grpc.setDefaultTransport(NodeHttpTransport());

describe("GrpcGraphSearchClient", () => {
    it("gets status", async () => {
        const client = new GraphSearchClient();
        const res = await client.getStatus();
        const block = res.getBlockHeight();
        assert.isNumber(block);
    });

    it("gets txns", async () => {
        const client = new GraphSearchClient();
        const hash = "05ea5cb69fb18055371efe4a17e35b0f2cec3ac375c90a1f269d56522f658287";
        const res = await client.graphSearchFor({hash, reversedHashOrder: true});
        const txns = res.getTxdataList_asU8();
        console.log("test");
    });
});
