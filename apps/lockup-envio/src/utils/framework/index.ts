import {
  getERC20Contract,
  getERC20BytesContract,
  getPRBProxyContract,
  getPRBProxyRegistryContract,
} from "./contracts";
import { getClient } from "./client";

export const framework = {
  getClient,
  getERC20Contract,
  getERC20BytesContract,
  getPRBProxyContract,
  getPRBProxyRegistryContract,
};
