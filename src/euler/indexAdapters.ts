import { Address, parseAbi, PublicClient } from 'viem';

import { getChainId } from '../utils/getChainId';

import { Adapter } from './types';

const abi = parseAbi([
  'function name() view returns (string)',
  'function base() view returns (address)',
  'function quote() view returns (address)',
  'function cross() view returns (address)',
  'function pyth() view returns (address)',
  'function WSTETH() view returns (address)',
  'function STETH() view returns (address)',
  'function feed() view returns (address)',
  'function feedId() view returns (bytes32)',
  'function oracleBaseCross() view returns (address)',
  'function oracleCrossQuote() view returns (address)',
  'function maxStaleness() view returns (uint256)',
  'function maxConfWidth() view returns (uint256)',
  'function feedDecimals() view returns (uint8)',
  'function getDataServiceId() view returns (string)',
  'function uniqueSignersThreshold() view returns (uint8)',
  'function WETH() view returns (address)',
  'function rate() view returns (uint256)',
  'function rateProvider() view returns (address)',
  'function twapWindow() view returns (uint256)',
  'function pendleMarket() view returns (address)',
  'function oracle() view returns (address)',
  'function poolId() view returns (bytes32)',
  'function safeguardPool() view returns (address)',
  'function vault() view returns (address)',
  'function cdo() view returns (address)',
  'function tranche() view returns (address)',
  'function underlying() view returns (address)',
  'function pool() view returns (address)',
  'function priceOracleIndex() view returns (uint256)',
  'function accountant() view returns (address)',
]);

const adapterClassToFunctionNames: Record<string, string[]> = {
  ChainlinkOracle: ['base', 'quote', 'feed', 'maxStaleness'],
  ChainlinkInfrequentOracle: ['base', 'quote', 'feed', 'maxStaleness'],
  ChronicleOracle: ['base', 'quote', 'feed', 'maxStaleness'],
  StorkChainlinkOracle: ['base', 'quote', 'feed', 'maxStaleness'],
  FixedRateOracle: ['base', 'quote', 'rate'],
  IdleTranchesOracle: ['tranche', 'underlying'],
  LidoOracle: ['WSTETH', 'STETH'],
  LidoFundamentalOracle: ['WSTETH', 'STETH', 'WETH'],
  PendleOracle: ['base', 'quote', 'pendleMarket', 'twapWindow'],
  PendleUniversalOracle: ['base', 'quote', 'pendleMarket', 'twapWindow'],
  PythOracle: ['base', 'quote', 'pyth', 'feedId', 'maxStaleness', 'maxConfWidth'],
  RateProviderOracle: ['base', 'quote', 'rateProvider'],
  VedaAccountantOracle: ['base', 'quote', 'accountant'],
  RedstoneCoreOracle: ['base', 'quote', 'feedId', 'feedDecimals', 'maxStaleness'],
  UniswapV3Oracle: ['tokenA', 'tokenB', 'fee', 'twapWindow', 'pool'],
  CurveEMAOracle: ['base', 'quote', 'pool', 'priceOracleIndex'],
  CrossAdapter: ['base', 'cross', 'quote', 'oracleBaseCross', 'oracleCrossQuote'],
};

type Params = {
  adapterAddresses: Address[];
  publicClient: PublicClient;
};

export async function indexAdapters({
  adapterAddresses,
  publicClient,
}: Params): Promise<(Adapter | null)[]> {
  const chainId = getChainId(publicClient);

  const nameCallsResults = await publicClient.multicall({
    contracts: adapterAddresses.map((address) => ({
      address,
      abi,
      functionName: 'name',
    })),
  });

  const paramCalls = nameCallsResults.flatMap((result, i) => {
    if (result.status !== 'success') return [];
    const name = result.result as string;
    const address = adapterAddresses[i];

    const functionNames = adapterClassToFunctionNames[name];

    if (!functionNames) return [];

    const adapterAbi = abi.filter(({ name }) => functionNames.includes(name));

    return functionNames.map((functionName) => ({
      address,
      abi: adapterAbi,
      functionName,
    }));
  });

  const paramCallsResults = await publicClient.multicall({
    contracts: paramCalls,
  });

  const adapters: (Adapter | null)[] = [];
  let paramCallIndex = 0;

  for (let i = 0; i < nameCallsResults.length; i++) {
    const nameResult = nameCallsResults[i];
    if (nameResult.status !== 'success') {
      adapters.push(null);
      continue;
    }

    const name = nameResult.result as string;
    const address = adapterAddresses[i];
    const functionNames = adapterClassToFunctionNames[name];

    if (!functionNames) {
      adapters.push(null);
      continue;
    }

    const params: Record<string, unknown> = {};

    for (const functionName of functionNames) {
      const result = paramCallsResults[paramCallIndex++];
      if (result.status === 'success') {
        params[functionName] = result.result;
      }
    }

    adapters.push({
      name,
      address,
      chainId,
      ...params,
    } as Adapter);
  }

  return adapters;
}
