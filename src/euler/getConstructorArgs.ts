import { chainIdToPendleOracle } from '../pendle';

import { Adapter } from './types';

export function getConstructorArgs(adapter: Adapter): readonly unknown[] {
  if (adapter.name === 'SwaapSafeguardOracle' || adapter.name === 'UniswapV3Oracle') {
    throw new Error('Adapter class is not supported');
  }

  if (
    adapter.name === 'ChainlinkOracle' ||
    adapter.name === 'ChainlinkInfrequentOracle' ||
    adapter.name === 'ChronicleOracle' ||
    adapter.name === 'StorkChainlinkOracle'
  ) {
    return [adapter.base, adapter.quote, adapter.feed, adapter.maxStaleness];
  }

  if (adapter.name === 'PythOracle') {
    return [
      adapter.pyth,
      adapter.base,
      adapter.quote,
      adapter.feedId,
      adapter.maxStaleness,
      adapter.maxConfWidth,
    ];
  }

  if (adapter.name === 'CrossAdapter') {
    return [
      adapter.base,
      adapter.cross,
      adapter.quote,
      adapter.oracleBaseCross,
      adapter.oracleCrossQuote,
    ];
  }

  if (adapter.name === 'FixedRateOracle') {
    return [adapter.base, adapter.quote, adapter.rate];
  }

  if (adapter.name === 'RateProviderOracle') {
    return [adapter.base, adapter.quote, adapter.rateProvider];
  }

  if (adapter.name === 'PendleOracle') {
    return [
      chainIdToPendleOracle[adapter.chainId],
      adapter.pendleMarket,
      adapter.base,
      adapter.quote,
      adapter.twapWindow,
    ];
  }

  if (adapter.name === 'RedstoneCoreOracle') {
    return [
      adapter.base,
      adapter.quote,
      adapter.feedId,
      adapter.feedDecimals,
      adapter.maxStaleness,
    ];
  }

  if (adapter.name === 'IdleTranchesOracle') {
    return [adapter.cdo, adapter.tranche];
  }

  return [];
}
