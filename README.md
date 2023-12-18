# Sablier V2 Subgraphs

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

To offer a backwards compatible subgraph (between Sablier Core/ Sablier Periphery **v1.0** and **v1.1**) we'll aggregate
the ABIs of the two versions. This will cause the Lockup Linear and Dynamic ABIs to contain multiple events with the
same name, but different signatures (due to event parameters).

Luckily, because of [this issue](https://github.com/graphprotocol/graph-tooling/pull/247) in `graph-tooling`, event
names will be de-duplicated using a numbering scheme (e.g. a duplicated `Event` will become `Event`, `Event1`, ...).

## Subgraph: Protocol

See the Sablier V2 Subgraphs documentation [here](https://docs.sablier.com/api/subgraphs/overview). Endpoints are
available [here](https://docs.sablier.com/api/subgraphs/endpoints).

## Subgraph: Merkle Streamer

See the Sablier V2 Subgraphs (Merkle Streamer) documentation [here](https://docs.sablier.com/api/subgraphs/overview).

## Subgraph: PRB Proxy

See the PRB Proxy documentation [here](https://github.com/PaulRBerg/prb-proxy).
