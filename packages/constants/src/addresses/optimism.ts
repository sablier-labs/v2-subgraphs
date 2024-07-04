export let chainId = 10;
export let chain = "optimism";
export let startBlock_protocol = 106405050;
export let startBlock_merkle = 113621900;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xb923abdca17aed90eb5ec5e407bd37164f632bfd", "LL", "V20"],
  ["0x4b45090152a5731b5bc71b5baf71e60e05b33867", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0x6f68516c21e248cddfaf4898e66b2b0adee0e0d6", "LD", "V20"],
  ["0xd6920c1094eabc4b71f3dc411a1566f64f4c206e", "LD2", "V21"],
];

export let tranched: string[][] = [];

export let factory: string[][] = [
  ["0x044ec80fbec40f0ee7e7b3856828170971796c19", "MSF2", "V21"],
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
