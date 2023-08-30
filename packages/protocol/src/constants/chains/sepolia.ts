export let chainId = 11155111;
export let chain = "sepolia";
export let startBlock = 4067889;

/**
 * 💡💡💡 ------------------------------- 💡💡💡
 *
 * Sepolia doesn't support the Hosted Service
 *
 * 💡💡💡 ------------------------------- 💡💡💡
 */

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db", "LL"],
];

export let dynamic: string[][] = [
  ["0x421e1e7a53ff360f70a2d02037ee394fa474e035", "LD"],
];

/** PRBProxy registry */
export let registry = "0x584009E9eDe26e212182c9745F5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
