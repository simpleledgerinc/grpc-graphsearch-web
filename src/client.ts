import { Buffer } from "buffer";
import * as graphsearchrpc_pb from "../pb/graphsearchrpc_pb";
import * as graphsearchrpc_pb_service from "../pb/graphsearchrpc_pb_service";

interface IGraphSearchParameters {
    hash: string;
    reversedHashOrder?: boolean;
    excludeList?: string[];
}

interface ITrustedValidationParameters {
    hash: string;
    reversedHashOrder?: boolean;
}

export class GraphSearchClient {
    public client: graphsearchrpc_pb_service.GraphSearchServiceClient;

    constructor({ url, options }:
        { url?: string; testnet?: boolean, options?: object } = {}) {
        if (!url) {
            url = "https://gs.fountainhead.cash:443";
        }
        if (!options) {
            options = {
                "grpc.max_receive_message_length": -1, // unlimited
            };
        }
        this.client = new graphsearchrpc_pb_service.GraphSearchServiceClient(url, options);
    }

    public graphSearchFor({ hash, reversedHashOrder = true, excludeList = [] }: IGraphSearchParameters): Promise<graphsearchrpc_pb.GraphSearchReply> {
        const req = new graphsearchrpc_pb.GraphSearchRequest();
        if (reversedHashOrder) {
            req.setTxid(
                Buffer.from(new Uint8Array(
                    hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse()).toString("hex"));
        } else {
            req.setTxid(hash);
        }
        for (const excl of excludeList) {
            if (reversedHashOrder) {
                req.addExcludeTxids(
                    Buffer.from(new Uint8Array(
                        excl.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse()).toString("hex"));
            } else {
                req.addExcludeTxids(excl);
            }
        }
        return new Promise((resolve, reject) => {
            this.client.graphSearch(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public trustedValidationFor({ hash, reversedHashOrder = true }: ITrustedValidationParameters): Promise<graphsearchrpc_pb.TrustedValidationReply> {
        const req = new graphsearchrpc_pb.TrustedValidationRequest();
        if (reversedHashOrder) {
            req.setTxid(Buffer.from(new Uint8Array(
                hash.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).reverse()).toString("hex"));
        } else {
            req.setTxid(hash);
        }
        return new Promise((resolve, reject) => {
            this.client.trustedValidation(req, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getStatus(): Promise<graphsearchrpc_pb.StatusReply> {
        return new Promise((resolve, reject) => {
            this.client.status(new graphsearchrpc_pb.StatusRequest(), (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }
}
