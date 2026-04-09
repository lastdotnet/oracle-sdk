import { Address, Hex } from 'viem';

export type ChainlinkOracle = {
  address: Address;
  chainId: number;
  name: 'ChainlinkOracle';
  base: Address;
  quote: Address;
  feed: Address;
  maxStaleness: bigint;
};

export type ChainlinkInfrequentOracle = {
  address: Address;
  chainId: number;
  name: 'ChainlinkInfrequentOracle';
  base: Address;
  quote: Address;
  feed: Address;
  maxStaleness: bigint;
};

export type ChronicleOracle = {
  address: Address;
  chainId: number;
  name: 'ChronicleOracle';
  base: Address;
  quote: Address;
  feed: Address;
  maxStaleness: bigint;
};

export type StorkChainlinkOracle = {
  address: Address;
  chainId: number;
  name: 'StorkChainlinkOracle';
  base: Address;
  quote: Address;
  feed: Address;
  maxStaleness: bigint;
};

export type CurveEMAOracle = {
  address: Address;
  chainId: number;
  name: 'CurveEMAOracle';
  base: Address;
  quote: Address;
  pool: Address;
  priceOracleIndex: bigint;
};

export type LidoOracle = {
  address: Address;
  chainId: number;
  name: 'LidoOracle';
  WSTETH: Address;
  STETH: Address;
};

export type LidoFundamentalOracle = {
  address: Address;
  chainId: number;
  name: 'LidoFundamentalOracle';
  WSTETH: Address;
  STETH: Address;
  WETH: Address;
};

export type PythOracle = {
  address: Address;
  chainId: number;
  name: 'PythOracle';
  base: Address;
  quote: Address;
  pyth: Address;
  feedId: Hex;
  maxStaleness: bigint;
  maxConfWidth: bigint;
};

export type RedstoneCoreOracle = {
  address: Address;
  chainId: number;
  name: 'RedstoneCoreOracle';
  base: Address;
  quote: Address;
  feedId: Hex;
  maxStaleness: bigint;
  feedDecimals: number;
};

export type CrossAdapter = {
  address: Address;
  chainId: number;
  name: 'CrossAdapter';
  base: Address;
  quote: Address;
  cross: Address;
  oracleBaseCross: Address;
  oracleCrossQuote: Address;
};

export type FixedRateOracle = {
  address: Address;
  chainId: number;
  name: 'FixedRateOracle';
  base: Address;
  quote: Address;
  rate: bigint;
};

export type RateProviderOracle = {
  address: Address;
  chainId: number;
  name: 'RateProviderOracle';
  base: Address;
  quote: Address;
  rateProvider: Address;
};

export type VedaAccountantOracle = {
  address: Address;
  chainId: number;
  name: 'VedaAccountantOracle';
  base: Address;
  quote: Address;
  accountant: Address;
};

export type PendleOracle = {
  address: Address;
  chainId: number;
  name: 'PendleOracle';
  base: Address;
  quote: Address;
  pendleMarket: Address;
  twapWindow: number;
};

export type PendleUniversalOracle = {
  address: Address;
  chainId: number;
  name: 'PendleUniversalOracle';
  base: Address;
  quote: Address;
  pendleMarket: Address;
  twapWindow: number;
};

export type SwaapSafeguardOracle = {
  address: Address;
  chainId: number;
  name: 'SwaapSafeguardOracle';
  safeguardPool: Address;
  quote: Address;
  poolId: Hex;
};

export type UniswapV3Oracle = {
  address: Address;
  chainId: number;
  name: 'UniswapV3Oracle';
  tokenA: Address;
  tokenB: Address;
  pool: Address;
  fee: number;
  twapWindow: number;
};

export type IdleTranchesOracle = {
  address: Address;
  chainId: number;
  name: 'IdleTranchesOracle';
  cdo: Address;
  tranche: Address;
  underlying: Address;
};

export type Adapter =
  | ChainlinkOracle
  | ChainlinkInfrequentOracle
  | ChronicleOracle
  | StorkChainlinkOracle
  | CurveEMAOracle
  | LidoOracle
  | LidoFundamentalOracle
  | PythOracle
  | RedstoneCoreOracle
  | CrossAdapter
  | FixedRateOracle
  | RateProviderOracle
  | VedaAccountantOracle
  | PendleOracle
  | PendleUniversalOracle
  | SwaapSafeguardOracle
  | IdleTranchesOracle
  | UniswapV3Oracle;

export type Asset = {
  chainId: number;
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
};

export type RegistryEntry = {
  addedAt: bigint;
  revokedAt: bigint;
};
