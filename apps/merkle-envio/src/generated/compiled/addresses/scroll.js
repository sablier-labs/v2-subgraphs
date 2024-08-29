"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 534352;
exports.chain = "scroll";
exports.startBlock_protocol = 284000;
exports.startBlock_merkle = 1675330;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0x80640ca758615ee83801ec43452feea09a202d33", "LL", "V20"],
    ["0x57e14ab4dad920548899d86b54ad47ea27f00987", "LL2", "V21"],
    ["0xbc5dc6d77612e636da32af0d85ca3179a57330fd", "LL3", "V22"],
];
exports.dynamic = [
    ["0xde6a30d851efd0fc2a9c922f294801cfd5fcb3a1", "LD", "V20"],
    ["0xaaff2d11f9e7cd2a9cdc674931fac0358a165995", "LD2", "V21"],
    ["0xac199bfea92aa4d4c3d8a49fd463ead99c7a6a8f", "LD3", "V22"],
];
exports.tranched = [
    ["0xb0f78ddc01d829d8b567821eb193de8082b57d9d", "LT3", "V22"],
];
exports.factory = [
    ["0xb3ade5463000e6c0d376e7d7570f372ebf98bdaf", "MSF2", "V21"],
    ["0x344afe8ad5dba3d55870dc398e0f53b635b2ed0d", "MSF3", "V22"],
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
