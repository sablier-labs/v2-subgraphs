export let chainId = 137;
export let chain = "matic";
export let startBlock = 44637120;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x67422c3e36a908d5c3237e9cffeb40bde7060f6e", "LL", "V20"],
  ["0x5f0e1dea4a635976ef51ec2a2ed41490d1eba003", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0x7313addb53f96a4f710d3b91645c62b434190725", "LD", "V20"],
  ["0xb194c7278c627d52e440316b74c5f24fc70c1565", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
