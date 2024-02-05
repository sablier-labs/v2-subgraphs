export let chainId = 137;
export let chain = "matic";
export let startBlock = 51245830;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [
  ["0x856b3E81267C128A0F77892be87268f01D66434b", "ManualDynamicContract", "V21"],
  ["0x7E5675AfDf31C253f789343C5359D3929aDea6A2", "ManualDynamicContract", "V21"],
  ["0x91b4555d4691599C8c35318c482eF6B79D2A403d", "ManualDynamicContract", "V21"],
  ["0x862213038436300b8235F157C7D742b6a81fDcB9", "ManualDynamicContract", "V21"],
  ["0x5d742d117ebDF22CEfBd49f3a2Ce2baa017F3b93", "ManualDynamicContract", "V21"],
  ["0x555d447325790060A9569C25F103585c8f437b07", "ManualDynamicContract", "V21"],
];

export const merkleLLV21: string[][] = [];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = factory[0][0];
