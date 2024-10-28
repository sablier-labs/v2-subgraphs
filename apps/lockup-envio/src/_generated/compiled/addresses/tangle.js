"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_lockup = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.rpcsync = exports.startBlock_merkle = exports.startBlock_lockup = exports.chain = exports.chainId = void 0;
exports.chainId = 5845;
exports.chain = "tangle";
exports.startBlock_lockup = 2515000;
exports.startBlock_merkle = 2516000;
exports.rpcsync = [
    {
        key: "url",
        value: "https://rpc.tangle.tools/",
    },
];
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0xac19f4181e58efb7094e0cb4e1bb18c79f6aadf4", "LL3", "V22"],
];
exports.dynamic = [
    ["0x946654ab30dd6ed10236c89f2c8b2719df653691", "LD3", "V22"],
];
exports.tranched = [
    ["0x63b92f7e2f69877184c955e63b9d8dff55e52e14", "LT3", "V22"],
];
exports.factory = [
    ["0x5e73bb96493c10919204045fcdb639d35ad859f8", "MSF3", "V22"],
];
/** PRBProxy registry */
exports.registry = "";
/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Lockup] On any new chain, please create a Lockup Linear stream to kick-off indexing
 */
exports.initializer_lockup = exports.linear[0][0];
exports.initializer_merkle = exports.factory[0][0];
