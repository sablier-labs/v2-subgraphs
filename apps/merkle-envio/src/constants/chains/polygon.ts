export let chainId = 137;
export let chain = "matic";
export let startBlock = 51245830;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [
  ["0xf4906225e783fb8977410bdbfb960cabed6c2ef4", "MSF2", "V21"],
  ["0xc28872e0c1f3633eed467907123727ac0155029d", "MSF3", "V22"],
];
/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
