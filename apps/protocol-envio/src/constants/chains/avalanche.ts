export let chainId = 43114;
export let chain = "avalanche";
export let startBlock = 32164210;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x610346e9088afa70d6b03e96a800b3267e75ca19", "LL", "V20"],
  ["0xb24b65e015620455bb41deaad4e1902f1be9805f", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0x665d1c8337f1035cfbe13dd94bb669110b975f5f", "LD", "V21"],
  ["0x0310da0d8ff141166ed47548f00c96464880781f", "LD2", "V21"],
];

export let tranched: string[][] = [];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
