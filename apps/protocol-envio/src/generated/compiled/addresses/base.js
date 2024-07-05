"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 8453;
exports.chain = "base";
exports.startBlock_protocol = 1750270;
exports.startBlock_merkle = 8026890;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0x6b9a46c8377f21517e65fa3899b3a9fab19d17f5", "LL", "V20"],
    ["0xfcf737582d167c7d20a336532eb8bcca8cf8e350", "LL2", "V21"],
];
exports.dynamic = [
    ["0x645b00960dc352e699f89a81fc845c0c645231cf", "LD", "V20"],
    ["0x461e13056a3a3265cef4c593f01b2e960755de91", "LD2", "V21"],
];
exports.tranched = [];
exports.factory = [
    ["0x5545c8e7c3e1f74adc98e518f2e8d23a002c4412", "MSF2", "V21"],
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
