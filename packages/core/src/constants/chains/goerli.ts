export let chainId = 5;
export let chain = "goerli";
export let startBlock = 9265910;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x689c2ed70ce531231511c799eef43246cc6b9dab", "LL"],
];

export let dynamic: string[][] = [
  ["0xff9d109c6c3fdd326422e5aea41a418163590a80", "LD"],
];

/** PRBProxy registry */
export let registry = "0x33e200b5fb5e0c57d370d5202c26a35d07a46b98";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
