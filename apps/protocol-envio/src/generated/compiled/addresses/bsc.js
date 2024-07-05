"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 56;
exports.chain = "bsc";
exports.startBlock_protocol = 29646270;
exports.startBlock_merkle = 34438430;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0x3fe4333f62a75c2a85c8211c6aefd1b9bfde6e51", "LL", "V20"],
    ["0x14c35e126d75234a90c9fb185bf8ad3edb6a90d2", "LL2", "V21"],
];
exports.dynamic = [
    ["0xf2f3fef2454dca59eca929d2d8cd2a8669cc6214", "LD", "V20"],
    ["0xf900c5e3aa95b59cc976e6bc9c0998618729a5fa", "LD2", "V21"],
];
exports.tranched = [];
exports.factory = [
    ["0x434d73465aac4125d204a6637eb6c579d8d69f48", "MSF2", "V21"],
];
/** PRBProxy registry */
exports.registry = "0x584009e9ede26e212182c9745f5c000191296a78";
/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Protocol] On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */
exports.initializer_protocol = exports.linear[0][0];
exports.initializer_merkle = exports.factory[0][0];
