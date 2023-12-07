export let chainId = 11155111;
export let chain = "sepolia";
export let startBlock = 4067889;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db", "LL"],
  ["0x0eda15d606733f6cde9db67263e546bfcdde9264", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0x421e1e7a53ff360f70a2d02037ee394fa474e035", "LD"],
  ["0xcb099efc90e88690e287259410b9ae63e1658cc6", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009E9eDe26e212182c9745F5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
