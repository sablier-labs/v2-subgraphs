export let chainId = 100;
export let chain = "gnosis";
export let startBlock = 28766600;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x685e92c9ca2bb23f1b596d0a7d749c0603e88585", "LL", "V20"],
  ["0xce49854a647a1723e8fb7cc3d190cab29a44ab48", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xeb148e4ec13aaa65328c0ba089a278138e9e53f9", "LD", "V20"],
  ["0x1df83c7682080b0f0c26a20c6c9cb8623e0df24e", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
