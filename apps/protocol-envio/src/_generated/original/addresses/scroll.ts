export let chainId = 534352;
export let chain = "scroll";
export let startBlock_protocol = 284000;
export let startBlock_merkle = 1675330;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x80640ca758615ee83801ec43452feea09a202d33", "LL", "V20"],
  ["0x57e14ab4dad920548899d86b54ad47ea27f00987", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xde6a30d851efd0fc2a9c922f294801cfd5fcb3a1", "LD", "V20"],
  ["0xaaff2d11f9e7cd2a9cdc674931fac0358a165995", "LD2", "V21"],
];

export let tranched: string[][] = [];

export let factory: string[][] = [
  ["0xb3ade5463000e6c0d376e7d7570f372ebf98bdaf", "MSF2", "V21"],
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
