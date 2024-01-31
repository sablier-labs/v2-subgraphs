# Sablier V2 Subgraphs

## The Graph Subgraphs

### Setup

1. [Authenticate](https://thegraph.com/docs/en/deploying/hosted-service/) with the hosted service credentials (Sablier's
   profile)

   ```
   graph auth --product hosted-service <ACCESS_TOKEN>
   ```

2. Generate configuration

   Make sure to run `yarn setup:goerli` or `yarn setup:<chain_name>` to generate imports before `codegen` and
   `deploy:<chain_name>`.

### Caveats

To offer a backwards compatible subgraph (between Sablier Core/ Sablier Periphery **v2.0** and **v2.1**) we'll aggregate
the ABIs of the two versions. This will cause the Lockup Linear and Dynamic ABIs to contain multiple events with the
same name, but different signatures (due to event parameters).

Luckily, because of [this issue](https://github.com/graphprotocol/graph-tooling/pull/247) in `graph-tooling`, event
names will be de-duplicated using a numbering scheme (e.g. a duplicated `Event` will become `Event`, `Event1`, ...).

### Subgraph: Protocol

See the Sablier V2 Subgraphs documentation [here](https://docs.sablier.com/api/subgraphs/overview). Endpoints are
available [here](https://docs.sablier.com/api/subgraphs/endpoints).

### Subgraph: Merkle Streamer

See the Sablier V2 Subgraphs (Merkle Streamer) documentation [here](https://docs.sablier.com/api/subgraphs/overview).

---

## Envio Indexers

### Setup

1. Follow the steps listed in the official Envio [documentation](https://docs.envio.dev/docs/installation).

## Architecture

We architected this indexer around a set of pre-configured contracts.

### The Config

While for The Graph's subgraphs we track flavor-first (see the [subgraph.yaml](./../protocol/subgraph.template.yaml)
configuration for `SablierV2LockupLinear` and `SablierV2LockupDynamic`), for Envio's indexers we'll have a version-first
approach.

Therefore, `LockupLinear` and `LockupDynamic` will be bundled under the same `Lockup<Version>` contract tracker
([config.yaml](./config.template.mustache)). Different versions of the protocol will be tracked separately, which is why
we have `Lockup_V20` (v2.0) and `Lockup_V21` (v2.1) in our configuration. Later on, inside the handler logic, we'll
separate contracts by flavor.

### The System

Similar to The Graph, we start by pre-configuring a set of contracts. While Envio's indexer doesn't have the same
[requirement](https://discord.com/channels/438038660412342282/438070183794573313/1153155902933831811) of pre-configuring
contracts to listen to, we'll keep this feature to ensure we can query against those entities, even if they'll be empty
at start.

We'll ensure contracts have been [initialized](./src/helpers/watcher.ts) by making a call against the initializer at the
start of each method. It should only come into play within the [create](./src/mappings/handle-stream-create.ts)
handlers.

## Differences with ENVIO

Due to the cross-chain indexing aspect, entities in Envio will need to have a chainId suffix attached to them to ensure
they're unique across the board. At the same time, there are some minor features missing, which will cause some
differences listed below.

- For Envio indexers, some entities will have different identifiers (from what The Graph's subgraph have):
  1.  `protocol-envio`: the `Action`, `Asset`, `Batch`, `Batcher`, `Contract` have a `-chainId` appended to the ID
  2.  `merkle-envio`: the `Action`, `Asset` and `Factory` have a `-chainId` appended to the ID
- The `Action` entity won't have a proper `from` value (the Envio event does not expose it, so we temporarily bind it to
  the admin).
- The `Withdraw` action won't have an `addressA` because `event.transaction.from` is not provided
- The `arbitrum-sepolia` network isn't supported
- Experimental setups will have to be reconsidered (probably through separate indexers, with single network configs)

---

## Changelog 01/2024 (Informal)

To keep entities consistent, the following changes have been applies to The Graph subgraphs:

- `protocol`: The `Watcher` entity id is now the chainId
- `merkle`: The `Activity` entity id the campaign id (includes chainId) for its own id structure
- `merkle`: The `Factory` entity received a chainId parameter
- `merkle`: The `Watcher` entity id is now the chainId
- `merkle`: The `Campaign` and `Factory` entities now contain a version parameter.
