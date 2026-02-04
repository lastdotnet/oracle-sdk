import { parseAbi } from 'viem';

export default {
  abi: parseAbi([
    'constructor(address _base, address _quote, address _accountant)',
    'function accountant() view returns (address)',
    'function base() view returns (address)',
    'function getQuote(uint256 inAmount, address base, address quote) view returns (uint256)',
    'function getQuotes(uint256 inAmount, address base, address quote) view returns (uint256, uint256)',
    'function name() view returns (string)',
    'function quote() view returns (address)',
    'error PriceOracle_InvalidAnswer()',
    'error PriceOracle_NotSupported(address base, address quote)',
    'error PriceOracle_Overflow()',
  ]),
  methodIdentifiers: {
    'accountant()': '4fb3ccc5',
    'base()': '5001f3b5',
    'getQuote(uint256,address,address)': 'ae68676c',
    'getQuotes(uint256,address,address)': '0579e61f',
    'name()': '06fdde03',
    'quote()': '999b93af',
  },
} as const;
