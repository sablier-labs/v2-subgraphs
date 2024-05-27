# CHANGELOG

## V2.2

- **Create** events do not include a `protocolFee` amount any more (protocol fees have been removed): the event will be
  transformed to its V2.0 shape with a generic zero fee added to the amounts tuple

- **Create** events contain a renamed parameters: from `range` to `timestamps`. The conversion isn't tedious (see event
  gateway) as the parameters remains on the 8th position (gets casted automatically from the parameter array)

- **Create Lockup Linear** events will handle `cliff` time differently: while in prior versions, a non-cliff stream had
  a `range.cliff === range.start`, for V2.2 non-cliff streams will showcase a `timestamps.cliff` equal to zero

- **Lockup Tranched**: a new flavor of Lockup contract has been added

## V2.1

### System

- **Proxy** and proxy stream creation is not needed any more, so proxy tracking will be disabled

### Events

- **Create** events include a `transferable` boolean: the event will be transformed to its V2.0 shape and the flag will
  be handled separately
- **Cancel** events emit an `asset` address: the event will be transformed to its V2.0 shape
- **Withdraw** events emit an `asset` address: the event will be transformed to its V2.0 shape

## V2.0
