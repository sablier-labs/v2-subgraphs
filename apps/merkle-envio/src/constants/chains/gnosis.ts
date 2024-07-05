export let chainId = 100;
export let chain = "gnosis";
export let startBlock = 31491790;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [
  ["0x777f66477ff83ababadf39a3f22a8cc3aee43765", "MSF2", "V21"],
  ["0x5f12318fc6cca518a950e2ee16063a6317c2a9ef", "MSF3", "V22"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
