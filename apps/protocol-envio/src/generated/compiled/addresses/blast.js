"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 81457;
exports.chain = "blast-mainnet";
exports.startBlock_protocol = 243800;
exports.startBlock_merkle = 244700;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0xcb099efc90e88690e287259410b9ae63e1658cc6", "LL2", "V21"],
];
exports.dynamic = [
    ["0xdf578c2c70a86945999c65961417057363530a1c", "LD2", "V21"],
];
exports.tranched = [];
exports.factory = [
    ["0x92fc05e49c27884d554d98a5c01ff0894a9dc29a", "MSF2", "V21"],
];
/** PRBProxy registry */
exports.registry = "";
/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Protocol] On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */
exports.initializer_protocol = exports.linear[0][0];
exports.initializer_merkle = exports.factory[0][0];
