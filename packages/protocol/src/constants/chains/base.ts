export let chainId = 8453;
export let chain = "base";
export let startBlock = 1750270;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x6b9a46c8377f21517e65fa3899b3a9fab19d17f5", "LL"],
];

export let dynamic: string[][] = [
  ["0x645b00960dc352e699f89a81fc845c0c645231cf", "LD"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
