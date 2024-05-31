export let chainId = 421613;
export let chain = "arbitrum-sepolia";
export let startBlock = 2838600;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xa3e36b51b7a456812c92253780f4b15bad56e34c", "LL", "V20"],
  ["0x483bdd560de53dc20f72dc66acdb622c5075de34", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0x7938c18a59fad2ba11426acfbe8d74f0f598a4d2", "LD", "V20"],
  ["0x8c8102b92b1f31cc304a085d490796f4dfdf7af3", "LD2", "V21"],
];

export let tranched: string[][] = [];

/** PRBProxy registry */
export let registry = "0x584009E9eDe26e212182c9745F5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
