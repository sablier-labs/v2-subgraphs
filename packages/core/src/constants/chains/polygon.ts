export let chainId = 137;
export let chain = "matic";
export let startBlock = 44085750;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xd6af8a924cc4aab901f7dcaebd018257925931e7", "linear"],
];

export let dynamic: string[][] = [
  ["0x19b40b1ecb0e729ffed882437a8052739830b311", "dynamic"],
];

/** PRBProxy registry */
export let registry = "0xa87bc4c1bc54e1c1b28d2dd942a094a6b665b8c9";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
