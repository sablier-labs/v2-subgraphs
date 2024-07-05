"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 324;
exports.chain = "zksync-era";
exports.startBlock_protocol = 32472500;
exports.startBlock_merkle = 33148900;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0x2fca69fa0a318efdf4c15ee8f13a873347a8a8d4", "LL2", "V21"],
];
exports.dynamic = [
    ["0xe6c7324bea8474209103e407779eec600c07cf3f", "LD2", "V21"],
];
exports.tranched = [];
exports.factory = [
    ["0x46de683d20c3575a0381ffd66c10ab6836390140", "MSF2", "V21"],
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
