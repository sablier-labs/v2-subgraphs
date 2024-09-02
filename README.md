![Sablier Branding](/assets/banner-subgraphs.png)

# Sablier V2 Subgraphs and Indexers

Sablier relies on specific dependencies to source data or manage off-chain flows. All of these are either public or
fully open-source, so feel free to roam around and suggest improvements or optimizations where needed.

As an alternative to reading data from the contracts or listening to onchain events, we use a set of subgraphs and
indexers. These act as a middleware between the chain and our interfaces and allow for caching, formatting and querying
data.

For every The Graph subgraph you will find a dedicated Envio indexer that mirrors its functionality and can be used as a
fallback or as a completely alternative query engine.

## The Graph Subgraphs

Read more about The Graph [here](https://thegraph.com/docs/en/).

Sablier supports multiple chains for which we've deployed subgraphs at either the Hosted Network level or within the
Decentralized Network (see Ethereum, Arbitrum or Polygon's endpoints).

### Subgraph: Protocol

The **Protocol** subgraph watches over the core functionality of Sablier V2. It handles events such as `Create Stream`,
`Withdraw` or `Transfer`.

[Documentation](https://docs.sablier.com/api/subgraphs/protocol/entities) and
[Endpoints](https://docs.sablier.com/api/subgraphs/endpoints).

### Subgraph: Merkle (Airstreams)

The **Merkle** subgraph watches over the Merkle Lockup functionality from Sablier V2's periphery contracts. It handles
events such as `Create Campaign`, `Claim` or `Clawback`. In the client interfaces it is used to track activity for
Airstreams.

[Documentation](https://docs.sablier.com/api/subgraphs/merkle/entities) and
[Endpoints](https://docs.sablier.com/api/subgraphs/endpoints).

---

## Envio Indexers

Read more about Envio [here](https://docs.envio.dev).

> [!IMPORTANT]
>
> When new addresses are added to an Envio indexer (through the shared package) run `pnpm run setup` or `pnpm run dev`
> to make sure the necessary files get generated.

### Indexer: Protocol-Envio

The **Protocol-Envio** indexer watches over the core functionality of Sablier V2. It handles events such as
`Create Stream`, `Withdraw` or `Transfer`.

[Documentation](https://docs.sablier.com/api/indexers/protocol/entities) and
[Endpoints](https://docs.sablier.com/api/indexers/endpoints).

### Indexer: Merkle-Envio (Airstreams)

The **Merkle-Envio** subgraph watches over the Merkle Lockup functionality from Sablier V2's periphery contracts. It
handles events such as `Create Campaign`, `Claim` or `Clawback`. In the client interfaces it is used to track activity
for Airstreams.

[Documentation](https://docs.sablier.com/api/indexers/merkle/entities) and
[Endpoints](https://docs.sablier.com/api/indexers/endpoints).

> [!TIP]
>
> To track new addresses see the [`constants`](./packages/constants) folder. Pick the chain, append a new contract and
> run the codegen steps to make sure everything runs smoothly. To add a new chain, create a dedicated configuration and
> make sure to (1) add it in the envio [bundles](./packages/constants/src/bundles/) (2) add a deployment script for
> subgraphs.

<sub>Version Trigger: [4]</sub>
