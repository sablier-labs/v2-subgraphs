export let chainId = 56;
export let chain = "bsc";
export let startBlock = 29646270;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x3FE4333f62A75c2a85C8211c6AeFd1b9Bfde6e51", "LL"],
];

export let dynamic: string[][] = [
  ["0xF2f3feF2454DcA59ECA929D2D8cD2a8669Cc6214", "LD"],
];

/** PRBProxy registry */
export let registry = "0xD42a2bB59775694c9Df4c7822BfFAb150e6c699D";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
