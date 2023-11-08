export let chainId = 10;
export let chain = "optimism";
export let startBlock = 106405050;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xb923abdca17aed90eb5ec5e407bd37164f632bfd", "LL"],
];

export let dynamic: string[][] = [
  ["0x6f68516c21e248cddfaf4898e66b2b0adee0e0d6", "LD"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
