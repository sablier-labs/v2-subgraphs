# CHANGELOG

## V2.2

- **Merkle Streamer** has been renamed to **Merkle Lockup**: events will now include this name change e.g.
  `CreateMerkleLockupLL`

- **Create** events now include a `name` string parameter for campaigns

- **Create** events have changed their signature to include a `baseParams` tuple

- **Lockup Tranched**: a new flavor of Lockup contract has been added, together with the `CreateMerkleLockupLT` event

## V2.1

> [!IMPORTANT]  
> The Merkle Lockup periphery was implemented only after V2.1, so there's no support for V2.0 with it.
