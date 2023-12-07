export let chainId = 11155111;
export let chain = "sepolia";
export let startBlock = 4751580;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias2], [address2, alias2]]
 */

export let factory: string[][] = [
  ["0x29a8d9f67608d77d0b4544a70fc2ab80ba5525f5", "MSF2"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
