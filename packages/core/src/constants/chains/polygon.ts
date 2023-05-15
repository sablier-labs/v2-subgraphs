export let chainId = 5;
export let chain = "goerli";
export let startBlock = 8415100;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x93369c09b52449b4f888292b09cc8e9ceb7643df", "linear"],
];

export let dynamic: string[][] = [
  ["0xD65332c5D63e93Ef6a9F4c0b5cda894E5809F9f6", "dynamic"],
];
/**
 * Pre-register some comptrollers to make sure fees and flash assets are indexed from the start,
 * not at the first queried interaction.
 */
export let comptroller: string[][] = [
  ["0x186C36EC33a15402a1c0826B3E57A553de62193B", "comptroller-1-1"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
