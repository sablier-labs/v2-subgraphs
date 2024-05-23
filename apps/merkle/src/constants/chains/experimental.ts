export let chainId = 11155111;
export let chain = "sepolia";
export let startBlock = 4904890;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [
  ["0xbacc1d151a78eed71d504f701c25e8739dc0262d", "MSF2", "V21"],
  ["0x927be1718e70cceabedaa419b6e790fa99d5b2ae", "MSF3", "V22"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
