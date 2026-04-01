import { CheckCircle, User } from 'lucide-react';
import { decide_strategy } from '../strategy';
import { Personality, StrategyContext } from '../types';

type Props = {
  selectedStrategy: string;
  onSelectStrategy: (strategy: string) => void;
  personality: Personality;
  onPersonalityChange: (personality: Personality) => void;
  context: StrategyContext;
  onContextChange: (context: StrategyContext) => void;
};

export function AgentPersonalityStep({
  selectedStrategy,
  onSelectStrategy,
  personality,
  onPersonalityChange,
  context,
  onContextChange,
}: Props) {
  const sliderItem = (
    label: string,
    value: number,
    onChange: (nextValue: number) => void,
    leftHint: string,
    rightHint: string
  ) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-800">{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>
      <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{leftHint}</span>
        <span>{rightHint}</span>
      </div>
    </div>
  );

  const contextSlider = (label: string, value: number, onChange: (nextValue: number) => void) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-800">{label}</span>
        <span className="text-gray-500">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(value * 100)}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        className="w-full"
      />
    </div>
  );

  const handleDecide = () => {
    const strategy = decide_strategy(personality, context);
    onSelectStrategy(strategy);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <User className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Select Agent Personality</h2>
        <p className="text-gray-600 mt-2">Use sliders to sample strategy instead of direct picking</p>
      </div>

      <div className="space-y-5 border rounded-xl p-5">
        <h3 className="font-semibold text-gray-900">Personality Sliders (0-100)</h3>
        {sliderItem('moral', personality.moral, (moral) => onPersonalityChange({ ...personality, moral }), 'opportunistic', 'honest')}
        {sliderItem('risk', personality.risk, (risk) => onPersonalityChange({ ...personality, risk }), 'cautious', 'risk-taking')}
        {sliderItem('social', personality.social, (social) => onPersonalityChange({ ...personality, social }), 'manipulative', 'cooperative')}
        {sliderItem('time', personality.time, (time) => onPersonalityChange({ ...personality, time }), 'short-term', 'long-term')}
      </div>

      <div className="space-y-4 border rounded-xl p-5">
        <h3 className="font-semibold text-gray-900">Decision Context (0-1)</h3>
        {contextSlider('riskScore', context.riskScore, (riskScore) => onContextChange({ ...context, riskScore }))}
        {contextSlider('valueScore', context.valueScore, (valueScore) => onContextChange({ ...context, valueScore }))}
        {contextSlider('urgency', context.urgency, (urgency) => onContextChange({ ...context, urgency }))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleDecide} className="px-5 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Sample Strategy
        </button>
        {selectedStrategy && (
          <span className="inline-flex items-center gap-2 text-sm px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <CheckCircle className="h-4 w-4" />
            Selected strategy: <strong>{selectedStrategy}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
