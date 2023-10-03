export let chainId = 5;
export let chain = "goerli";
export let startBlock = 9739245;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias2], [address2, alias2]]
 */

export let factory: string[][] = [
  ["0x680fa6db3896ffed19448f71592bd0b6b7aaf762", "MSF"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = factory[0][0];
