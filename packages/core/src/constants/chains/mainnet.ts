export let chainId = 5;
export let chain = "goerli";
export let startBlock = 8122650;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xb0Ed8e11339F1d655a3029a1e3d7e448326556c6", "linear"],
];
export let periphery: string[][] = [];
export let pro: string[][] = [
  ["0x3F1EB5f4426a6e1563F30532dDd16cc73C804529", "pro"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
