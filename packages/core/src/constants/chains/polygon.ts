export let chainId = 137;
export let chain = "matic";
export let startBlock = 44637120;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x67422C3E36A908D5C3237e9cFfEB40bDE7060f6E", "LL"],
];

export let dynamic: string[][] = [
  ["0x7313AdDb53f96a4f710D3b91645c62B434190725", "LD"],
];

/** PRBProxy registry */
export let registry = "0xD42a2bB59775694c9Df4c7822BfFAb150e6c699D";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
