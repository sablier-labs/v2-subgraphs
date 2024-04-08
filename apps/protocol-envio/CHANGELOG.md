# CHANGELOG

## V2.2

- **Create** events do not include a `protocolFee` amount any more (protocol fees have been removed): the fees will be
  tracked only for V2.1 and V2.0, while for next version we'll assign a generic fee of zero

- **Create** events will handle `cliff` time differently: while in prior versions, a non-cliff stream had a
  `range.cliff === range.start`, for V2.2 non-cliff streams will showcase a `range.cliff` equal to zero

- **Lockup Tranched**: a new flavor of Lockup contract has been added

## V2.1

### System

- **Proxy** and proxy stream creation is not needed any more, so proxy tracking will be disabled

### Events

- **Create** events include a `transferable` boolean
- **Cancel** events emit an `asset` address
- **Withdraw** events emit an `asset` address

## V2.0
