"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_flow = exports.initializer_merkle = exports.initializer_lockup = exports.registry = exports.factory = exports.tranched = exports.flow = exports.dynamic = exports.linear = exports.hypersync = exports.startBlock_flow = exports.startBlock_merkle = exports.startBlock_lockup = exports.chain = exports.chainId = void 0;
exports.chainId = 34443;
exports.chain = "mode-mainnet";
exports.startBlock_lockup = 11343000;
exports.startBlock_merkle = 11343000;
exports.startBlock_flow = 16616000;
exports.hypersync = "https://mode.hypersync.xyz";
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0xd8c65bd7cb6924ef895b2edca03407c652f5a2c5", "LL3", "V22"],
];
exports.dynamic = [
    ["0x704552099f5ad679294d337638b9a57fd4726f52", "LD3", "V22"],
];
exports.flow = [
    ["0x75970dde488431fc4961494569def3269f20d6b3", "FL", "V10"],
];
exports.tranched = [
    ["0xbbfa51a10be68714fa33281646b986dae9f52021", "LT3", "V22"],
];
exports.factory = [
    ["0x0fd01dd30f96a15de6afad5627d45ef94752460a", "MSF3", "V22"],
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
exports.initializer_flow = exports.flow[0][0];