export let chainId = 5;
export let chain = "goerli";
export let startBlock = 9283515;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x6e3678c005815ab34986d8d66a353cd3699103de", "LL", "V20"],
  ["0x5b82362ad180fb39d7501264530e4701d4ad0143", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0x4be70ede968e9dba12db42b9869bec66bedc17d7", "LD", "V20"],
  ["0xe0faf09b8c28f7a1e21a685a1beb5f60a2e5e76c", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
