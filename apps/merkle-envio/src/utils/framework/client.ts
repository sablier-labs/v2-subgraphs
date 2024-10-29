import { createPublicClient, defineChain, fallback, http } from "viem";
import { custom, library } from "./definitions";
import { fallbacks } from "./rpc";
import { chains } from "../../constants";

const supported = chains
  .map((local) =>
    Object.values(library).find(
      (remote) => remote.id?.toString() === local.id?.toString(),
    ),
  )
  .filter((chain) => chain);

const clients = supported
  .map((chain) => {
    const remote_library = Object.values(library).find((remote) => {
      return chain && remote.id?.toString() === chain?.id?.toString();
    });

    const remote_custom = Object.values(custom).find((remote) => {
      return chain && remote.id?.toString() === chain?.id?.toString();
    });

    const remote = remote_custom || remote_library;

    if (remote !== undefined) {
      const client = createPublicClient({
        batch: {
          multicall: true,
        },
        chain: remote,
        transport: fallback(
          fallbacks
            .find((f) => f.id === chain?.id)
            ?.rpcEndpoints.map((e) => http(e)) || [],
          {
            rank: false,
            retryCount: 5,
          },
        ),
      });

      if (client !== undefined && client?.chain?.id !== undefined) {
        return client;
      }
    }

    return undefined;
  })
  .filter((client) => client);

export function getClient(chainId: number | string | bigint) {
  const client = clients.find(
    (c) => c?.chain?.id.toString() === chainId.toString(),
  );

  if (!client) {
    console.error(clients);
    throw new Error(`Client missing from configuration for chain: ${chainId}`);
  }

  return client;
}
