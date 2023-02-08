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
export let periphery: string[][] = [
  ["0x13DbCeb606e151DfA17770821a193627E14537Fe", "batch"],
];
export let pro: string[][] = [
  ["0x65015ebA44e3fB9e732Bc416C5346f9dc39e3296", "pro"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
