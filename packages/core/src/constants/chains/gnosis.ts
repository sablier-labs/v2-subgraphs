export let chainId = 100;
export let chain = "gnosis";
export let startBlock = 28766600;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x685E92c9cA2bB23f1B596d0a7D749c0603e88585", "LL"],
];

export let dynamic: string[][] = [
  ["0xeb148E4ec13aaA65328c0BA089a278138E9E53F9", "LD"],
];

/** PRBProxy registry */
export let registry = "0xD42a2bB59775694c9Df4c7822BfFAb150e6c699D";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
