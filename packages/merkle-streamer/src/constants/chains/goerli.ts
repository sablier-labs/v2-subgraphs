export let chainId = 5;
export let chain = "goerli";
export let startBlock = 9819750;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias2], [address2, alias2]]
 */

export let factory: string[][] = [
  ["0xeaaa45A64012F8d002D839DED9f045d44D9E7E85", "MSF"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
