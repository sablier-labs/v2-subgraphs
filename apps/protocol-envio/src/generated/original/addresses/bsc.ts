export let chainId = 56;
export let chain = "bsc";
export let startBlock_protocol = 29646270;
export let startBlock_merkle = 34438430;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x3fe4333f62a75c2a85c8211c6aefd1b9bfde6e51", "LL", "V20"],
  ["0x14c35e126d75234a90c9fb185bf8ad3edb6a90d2", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xf2f3fef2454dca59eca929d2d8cd2a8669cc6214", "LD", "V20"],
  ["0xf900c5e3aa95b59cc976e6bc9c0998618729a5fa", "LD2", "V21"],
];

export let tranched: string[][] = [];

export let factory: string[][] = [
  ["0x434d73465aac4125d204a6637eb6c579d8d69f48", "MSF2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Protocol] On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer_protocol = linear[0][0];
export let initializer_merkle = factory[0][0];
