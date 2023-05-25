export let chainId = 5;
export let chain = "goerli";
export let startBlock = 8856900;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xd78d4fe35779342d5fe2e8206d886d57139d6abb", "linear"],
];

export let dynamic: string[][] = [
  ["0x4a57c183333a0a81300259d1795836fa0f4863bb", "dynamic"],
];
/**
 * Pre-register some comptrollers to make sure fees and flash assets are indexed from the start,
 * not at the first queried interaction.
 */
export let comptroller: string[][] = [
  ["0x70de563466beecc3b1c0738360262d899a4cd656", "comptroller-1-1"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
