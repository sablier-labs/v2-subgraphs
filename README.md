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

### Subgraph: Protocol

See the Sablier V2 Subgraphs documentation [here](https://docs.sablier.com/api/subgraphs/overview).

### Subgraph: PRB Proxy

See the PRB Proxy documentation [here](https://github.com/PaulRBerg/prb-proxy).
