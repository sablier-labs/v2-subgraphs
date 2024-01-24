export let chainId = 43114;
export let chain = "avalanche";
export let startBlock = Infinity;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [["0x", "MSF2", "V21"]];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];

/**
 *
 *
 *
 * TODO V2
 *
 *
 *
 *
 */
