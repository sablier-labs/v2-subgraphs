export let chainId = 1;
export let chain = "mainnet";
export let startBlock = 17615650;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [
  ["0x1a272b596b10f02931480bc7a3617db4a8d154e3", "MSF2", "V21"],
];

export const merkleLLV21: string[][] = [
  ["0xB90Fc2f98d7Fe5fB5d191713e1c9110cd0Fa20B8", "ManualDynamicContract", "V21"],
  ["0xD59aC49FC38CDe9ad724B7D3B47223C653880B70", "ManualDynamicContract", "V21"],
  ["0x629B3A1F241E02C6995beEd1ae994ff68C977EbC", "ManualDynamicContract", "V21"],
  ["0x7365E43F1cCbff9c4A12754CD7FF93CD8Ec25c91", "ManualDynamicContract", "V21"],
  ["0xa723A33Bc5C9Ef03Bff5f8bC582d20F903cf680C", "ManualDynamicContract", "V21"],
  ["0x70e3E243909E9BC9027Ff160c6eC5Ab5ee4B951E", "ManualDynamicContract", "V21"],
  ["0x0377858B2DfE397E405fC68870f2DBAfc57241d1", "ManualDynamicContract", "V21"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
