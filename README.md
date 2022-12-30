# Sablier V2 Subgraphs

### Setup

1. [Authenticate](https://thegraph.com/docs/en/deploying/hosted-service/) with the hosted service credentials (Sablier's
   profile)

   ```
   graph init --product hosted-service
   ```

2. Generate configuration

   Make sure to run `yarn setup:goerli` or `yarn setup:<chain_name>` to generate imports before `codegen` and
   `deploy:<chain_name>`.
