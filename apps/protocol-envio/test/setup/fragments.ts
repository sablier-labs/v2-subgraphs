import { gql } from "graphql-request";

export const ContractFragment_Envio = gql/* GraphQL */ `
  fragment ContractFragment on Contract {
    id
    address
    category
    version
  }
`;

export const ActionFragment_Envio = gql/* GraphQL */ `
  fragment ActionFragment on Action {
    id
    chainId
    subgraphId
    stream {
      id
    }
    category
    hash
    block
    timestamp
    from
    addressA
    addressB
    amountA
    amountB
    contract {
      ...ContractFragment
    }
  }
`;

export const BatchFragment_Envio = gql/* GraphQL */ `
  fragment BatchFragment on Batch {
    id
    label
    size
  }
`;

export const SegmentFragment_Envio = gql/* GraphQL */ `
  fragment SegmentFragment on Segment {
    id
    position
    amount
    exponent
    milestone
    endTime
    startTime
    startAmount
    endAmount
  }
`;

export const AssetFragment_Envio = gql/* GraphQL */ `
  fragment AssetFragment on Asset {
    id
    address
    chainId
    decimals
    name
    symbol
  }
`;

export const StreamFragment_Envio = gql/* GraphQL */ `
  fragment StreamFragment on Stream {
    id
    tokenId
    subgraphId
    chainId
    alias
    category
    funder
    sender
    recipient
    hash
    timestamp
    depositAmount
    startTime
    endTime
    cliff
    cliffTime
    cliffAmount
    cancelable
    renounceTime
    canceled
    canceledTime
    withdrawnAmount
    intactAmount
    position
    proxied
    proxender
    transferable
    version
    asset {
      ...AssetFragment
    }
    batch {
      ...BatchFragment
    }
    contract {
      ...ContractFragment
    }
    segments {
      ...SegmentFragment
    }
  }
`;

export const ContractFragment_TheGraph = gql/* GraphQL */ `
  fragment ContractFragment on Contract {
    id
    address
    category
    version
  }
`;

export const ActionFragment_TheGraph = gql/* GraphQL */ `
  fragment ActionFragment on Action {
    id
    chainId
    subgraphId
    stream {
      id
    }
    category
    hash
    block
    timestamp
    from
    addressA
    addressB
    amountA
    amountB
    contract {
      ...ContractFragment
    }
  }
`;

export const BatchFragment_TheGraph = gql/* GraphQL */ `
  fragment BatchFragment on Batch {
    id
    label
    size
  }
`;

export const SegmentFragment_TheGraph = gql/* GraphQL */ `
  fragment SegmentFragment on Segment {
    id
    position
    amount
    exponent
    milestone
    endTime
    startTime
    startAmount
    endAmount
  }
`;

export const AssetFragment_TheGraph = gql/* GraphQL */ `
  fragment AssetFragment on Asset {
    id
    address
    chainId
    decimals
    name
    symbol
  }
`;

export const StreamFragment_TheGraph = gql/* GraphQL */ `
  fragment StreamFragment on Stream {
    id
    tokenId
    subgraphId
    chainId
    alias
    category
    funder
    sender
    recipient
    hash
    timestamp
    depositAmount
    startTime
    endTime
    cliff
    cliffTime
    cliffAmount
    cancelable
    renounceTime
    canceled
    canceledTime
    withdrawnAmount
    intactAmount
    position
    proxied
    proxender
    transferable
    version
    asset {
      ...AssetFragment
    }
    batch {
      ...BatchFragment
    }
    contract {
      ...ContractFragment
    }
    segments {
      ...SegmentFragment
    }
  }
`;
