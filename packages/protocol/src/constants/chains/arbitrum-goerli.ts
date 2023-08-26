export let chainId = 421613;
export let chain = "arbitrum-goerli";
export let startBlock = 30536495;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x323B629635b6cFfe2453Aa2869c5957AfF55F445", "LL"],
];

export let dynamic: string[][] = [
  ["0xdc0a619fF975de6a08c7615ea383533fd265f2e3", "LD"],
];

/** PRBProxy registry */
export let registry = "0x584009E9eDe26e212182c9745F5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
