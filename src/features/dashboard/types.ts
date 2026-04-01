export type TradeStatus = 'success' | 'fraud' | 'rejected';

export type TopAgent = {
  rank: number;
  id: string;
  tasks: number;
  successRate: number;
  reputation: number;
};

export type FraudAgent = {
  id: string;
  fraudCount: number;
  reputation: number;
};

export type StrategyDistributionItem = {
  name: string;
  value: number;
  color: string;
};

export type ReputationDistributionItem = {
  range: string;
  count: number;
  color: string;
};

export type RecentTrade = {
  id: number;
  agentA: string;
  agentB: string;
  status: TradeStatus;
  time: string;
};

export type DashboardData = {
  totalAgents: number;
  activeToday: number;
  totalTrades: number;
  fraudDetected: number;
  topAgents: TopAgent[];
  fraudAgents: FraudAgent[];
  strategyDistribution: StrategyDistributionItem[];
  reputationDistribution: ReputationDistributionItem[];
  recentTrades: RecentTrade[];
};

export type DashboardTab = 'overview' | 'rankings' | 'trades';
