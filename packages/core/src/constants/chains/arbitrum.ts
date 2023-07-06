export let chainId = 42161;
export let chain = "arbitrum-one";
export let startBlock = 107509950;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x197D655F3be03903fD25e7828c3534504bfe525e", "LL"],
];

export let dynamic: string[][] = [
  ["0xA9EfBEf1A35fF80041F567391bdc9813b2D50197", "LD"],
];

/** PRBProxy registry */
export let registry = "0xD42a2bB59775694c9Df4c7822BfFAb150e6c699D";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
