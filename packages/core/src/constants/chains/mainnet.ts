export let chainId = 1;
export let chain = "mainnet";
export let startBlock = 17613130;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xB10daee1FCF62243aE27776D7a92D39dC8740f95", "LL"],
];

export let dynamic: string[][] = [
  ["0x39EFdC3dbB57B2388CcC4bb40aC4CB1226Bc9E44", "LD"],
];

/** PRBProxy registry */
export let registry = "0xD42a2bB59775694c9Df4c7822BfFAb150e6c699D";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
