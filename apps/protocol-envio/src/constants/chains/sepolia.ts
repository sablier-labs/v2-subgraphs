export let chainId = 11155111;
export let chain = "sepolia";
export let startBlock = 4067889;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db", "LL", "V20"],
  ["0x7a43f8a888fa15e68c103e18b0439eb1e98e4301", "LL2", "V21"],
  ["0xb6431d14d182da1a1a7078f02907b3336adcf09b", "LL3", "V22"],
];

export let dynamic: string[][] = [
  ["0x421e1e7a53ff360f70a2d02037ee394fa474e035", "LD", "V20"],
  ["0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a", "LD2", "V21"],
  ["0x03781ad6ac55e5625311343dc563b799c0be09a3", "LD3", "V22"],
];

export let tranched: string[][] = [
  ["0xad8e8615585470be71301f8d090a26b4bcf8c8ab", "LT3", "V22"],
];

/** PRBProxy registry */
export let registry = "0x584009E9eDe26e212182c9745F5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
