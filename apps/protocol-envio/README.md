# Sablier V2 Indexer (Envio) - Protocol

See the Sablier V2 Subgraphs documentation [here](https://docs.sablier.com/api/subgraphs/overview) - the schemas between
The Graph and Envio will be very similar.

Please refer to the [documentation website](https://docs.envio.dev) for a thorough guide on all Envio indexer features.

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

## Differences

- The `Action` entity won't have a `from` value (the Envio event does not expose it).
