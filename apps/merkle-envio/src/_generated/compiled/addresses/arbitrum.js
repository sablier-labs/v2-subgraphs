"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 42161;
exports.chain = "arbitrum-one";
exports.startBlock_protocol = 107509950;
exports.startBlock_merkle = 161026550;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0x197d655f3be03903fd25e7828c3534504bfe525e", "LL", "V20"],
    ["0xfdd9d122b451f549f48c4942c6fa6646d849e8c1", "LL2", "V21"],
    ["0x05a323a4c936fed6d02134c5f0877215cd186b51", "LL3", "V22"],
];
exports.dynamic = [
    ["0xa9efbef1a35ff80041f567391bdc9813b2d50197", "LD", "V20"],
    ["0xf390ce6f54e4dc7c5a5f7f8689062b7591f7111d", "LD2", "V21"],
    ["0x53f5eeb133b99c6e59108f35bcc7a116da50c5ce", "LD3", "V22"],
];
exports.tranched = [
    ["0x0da2c7aa93e7cd43e6b8d043aab5b85cfddf3818", "LT3", "V22"],
];
exports.factory = [
    ["0x237400ef5a41886a75b0e036228221df075b3b80", "MSF2", "V21"],
    ["0xc9a5a0bc2d8e217bdbdfe7486e9e72c5c3308f01", "MSF3", "V22"],
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
