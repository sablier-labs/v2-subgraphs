export let chainId = 534352;
export let chain = "scroll";
export let startBlock = 284000;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x80640ca758615ee83801ec43452feea09a202d33", "LL", "V20"],
  ["0x67b6300bfcf3d83a18b04f6e9f05076ce4026787", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xde6a30d851efd0fc2a9c922f294801cfd5fcb3a1", "LD", "V20"],
  ["0xe1e51e810968a54aab91f215d2f2819ef29b4aaa", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
