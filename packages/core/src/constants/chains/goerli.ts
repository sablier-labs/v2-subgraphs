export let chainId = 5;
export let chain = "goerli";
export let startBlock = 9283515;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x6E3678c005815Ab34986D8d66A353Cd3699103DE", "LL"],
];

export let dynamic: string[][] = [
  ["0x4BE70EDe968e9dBA12DB42b9869Bec66bEDC17d7", "LD"],
];

/** PRBProxy registry */
export let registry = "0xD42a2bB59775694c9Df4c7822BfFAb150e6c699D";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
