export let chainId = 1;
export let chain = "mainnet";
export let startBlock = 17615650;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias2], [address2, alias2]]
 */

export let factory: string[][] = [
  ["0x9bdebf4f9adeb99387f46e4020fbf3dda885d2b8", "MSF2"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
