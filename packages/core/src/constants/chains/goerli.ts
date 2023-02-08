export let chainId = 5;
export let chain = "goerli";
export let startBlock = 8415100;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x0784fB3ff8F3d0386c1FFa3a0984A0c600D8F2Ab", "linear"],
];

export let pro: string[][] = [
  ["0x65015ebA44e3fB9e732Bc416C5346f9dc39e3296", "pro"],
];
/** Pre-register some comptrollers to make sure fees and flash assets are watched from the start, not at first indexed interaction */
export let comptroller: string[][] = [
  ["0x9b2f503946e9bf36a995e647604c6e4f64075c66", "comptroller-1-1"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
