export let chainId = 100;
export let chain = "gnosis";
export let startBlock = 28766600;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x685e92c9ca2bb23f1b596d0a7d749c0603e88585", "LL"],
];

export let dynamic: string[][] = [
  ["0xeb148e4ec13aaa65328c0ba089a278138e9e53f9", "LD"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
