export type Personality = {
  moral: number;
  risk: number;
  social: number;
  time: number;
};

export type StrategyContext = {
  riskScore: number;
  valueScore: number;
  urgency: number;
};

export type StrategyName = 'normal' | 'fraud' | 'pua' | 'alliance' | 'ignore';
