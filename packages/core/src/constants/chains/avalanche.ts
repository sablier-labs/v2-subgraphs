export let chainId = 43114;
export let chain = "avalanche";
export let startBlock = 32164210;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x610346E9088AFA70D6B03e96A800B3267E75cA19", "LL"],
];

export let dynamic: string[][] = [
  ["0x665d1C8337F1035cfBe13DD94bB669110b975f5F", "LD"],
];

/** PRBProxy registry */
export let registry = "0xD42a2bB59775694c9Df4c7822BfFAb150e6c699D";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
