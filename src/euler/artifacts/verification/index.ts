import ChainlinkInfrequentOracle from './ChainlinkInfrequentOracle';
import ChainlinkOracle from './ChainlinkOracle';
import ChronicleOracle from './ChronicleOracle';
import CrossAdapter from './CrossAdapter';
import CurveEMAOracle from './CurveEMAOracle';
import FixedRateOracle from './FixedRateOracle';
import IdleTranchesOracle from './IdleTranchesOracle';
import LidoFundamentalOracle from './LidoFundamentalOracle';
import LidoOracle from './LidoOracle';
import PendleOracle from './PendleOracle';
import PendleUniversalOracle from './PendleUniversalOracle';
import PythOracle from './PythOracle';
import RateProviderOracle from './RateProviderOracle';
import RedstoneCoreOracle from './RedstoneCoreOracle';
import UniswapV3Oracle from './UniswapV3Oracle';
import VedaAccountantOracle from './VedaAccountantOracle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verificationArtifacts: Record<string, any> = {
  ChainlinkInfrequentOracle,
  ChainlinkOracle,
  ChronicleOracle,
  CrossAdapter,
  CurveEMAOracle,
  FixedRateOracle,
  IdleTranchesOracle,
  LidoFundamentalOracle,
  LidoOracle,
  PendleOracle,
  PendleUniversalOracle,
  PythOracle,
  RateProviderOracle,
  RedstoneCoreOracle,
  UniswapV3Oracle,
  VedaAccountantOracle,
} as const;
