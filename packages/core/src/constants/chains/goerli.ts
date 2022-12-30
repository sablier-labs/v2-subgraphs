export let chainId = 5;
export let chain = "goerli";
export let startBlock = 8122650;

export let linear = ["0xb0Ed8e11339F1d655a3029a1e3d7e448326556c6"];
export let periphery = [""];
export let pro = ["0x3F1EB5f4426a6e1563F30532dDd16cc73C804529"];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0];