export let chainId = 1;
export let chain = "mainnet";
export let startBlock = 17615650;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [
  ["0x1a272b596b10f02931480bc7a3617db4a8d154e3", "MSF2", "V21"],
  ["0xf35ab407cf28012ba57caf5ee2f6d6e4420253bc", "MSF3", "V22"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
