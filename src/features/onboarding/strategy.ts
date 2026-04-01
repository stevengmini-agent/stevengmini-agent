import { Personality, StrategyContext, StrategyName } from './types';

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

function normalize(weights: Record<StrategyName, number>) {
  const safeWeights = Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, Math.max(0, value)])
  ) as Record<StrategyName, number>;
  const total = Object.values(safeWeights).reduce((sum, value) => sum + value, 0);
  if (total <= 0) {
    return {
      normal: 0.2,
      fraud: 0.2,
      pua: 0.2,
      alliance: 0.2,
      ignore: 0.2,
    } as Record<StrategyName, number>;
  }

  return Object.fromEntries(
    Object.entries(safeWeights).map(([key, value]) => [key, value / total])
  ) as Record<StrategyName, number>;
}

function sampleByProbability(probabilities: Record<StrategyName, number>): StrategyName {
  const random = Math.random();
  let cumulative = 0;
  const entries = Object.entries(probabilities) as Array<[StrategyName, number]>;

  for (const [strategy, probability] of entries) {
    cumulative += probability;
    if (random <= cumulative) return strategy;
  }
  return entries[entries.length - 1][0];
}

export function decide_strategy(personality: Personality, context: StrategyContext): StrategyName {
  const honesty = clamp(personality.moral / 100);
  const opportunism = 1 - honesty;
  const risk_appetite = clamp(personality.risk / 100);
  const cooperation = clamp(personality.social / 100);
  const manipulation = 1 - cooperation;
  const patience = clamp(personality.time / 100);

  const riskScore = clamp(context.riskScore);
  const valueScore = clamp(context.valueScore);
  const urgency = clamp(context.urgency);

  const normal = 0.2 + honesty * 0.35 + cooperation * 0.2 + (1 - urgency) * 0.1 + (1 - risk_appetite) * 0.1;
  const fraud =
    0.05 + opportunism * 0.35 + risk_appetite * 0.25 + valueScore * 0.2 + urgency * 0.1 - honesty * 0.1;
  const pua = 0.05 + manipulation * 0.35 + opportunism * 0.25 + urgency * 0.15 + valueScore * 0.1;
  const alliance = 0.05 + cooperation * 0.4 + patience * 0.3 + honesty * 0.15 + (1 - urgency) * 0.1;
  const ignore =
    0.05 +
    (1 - valueScore) * 0.35 +
    riskScore * (1 - risk_appetite) * 0.35 +
    urgency * (1 - risk_appetite) * 0.15 +
    (1 - cooperation) * 0.05;

  const probabilities = normalize({ normal, fraud, pua, alliance, ignore });
  return sampleByProbability(probabilities);
}
