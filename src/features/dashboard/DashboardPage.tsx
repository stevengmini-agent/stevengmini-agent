'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  FileText,
  Fingerprint,
  MessageCircle,
  ShieldCheck,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { mockDashboardData } from './data';
import { DashboardData, RecentTrade, TradeStatus } from './types';
import { decide_strategy } from '@/features/onboarding/strategy';
import { Personality, StrategyContext } from '@/features/onboarding/types';

export default function DashboardPage() {
  const [data] = useState<DashboardData>(mockDashboardData);
  const [baseVerified, setBaseVerified] = useState(false);
  const [baseScore, setBaseScore] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('balanced');
  const [customPrompt, setCustomPrompt] = useState('');
  const [agentName, setAgentName] = useState('Agent Nova');
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [agentBound, setAgentBound] = useState(false);
  const [personality, setPersonality] = useState<Personality>({
    moral: 60,
    risk: 50,
    social: 55,
    time: 60,
  });
  const [context, setContext] = useState<StrategyContext>({
    riskScore: 0.5,
    valueScore: 0.5,
    urgency: 0.5,
  });

  const myAgentId = 'Agent_ME';
  const myRecentTrades: RecentTrade[] = [
    { id: 101, agentA: myAgentId, agentB: 'Agent_042', status: 'success', time: '8 min ago' },
    { id: 102, agentA: myAgentId, agentB: 'Agent_088', status: 'rejected', time: '15 min ago' },
    { id: 103, agentA: myAgentId, agentB: 'Agent_007', status: 'success', time: '22 min ago' },
    { id: 104, agentA: myAgentId, agentB: 'Agent_055', status: 'fraud', time: '34 min ago' },
    { id: 105, agentA: myAgentId, agentB: 'Agent_019', status: 'success', time: '49 min ago' },
  ];

  const myTotalTrades = myRecentTrades.length;
  const myFraudCount = myRecentTrades.filter((trade) => trade.status === 'fraud').length;
  const mySuccessCount = myRecentTrades.filter((trade) => trade.status === 'success').length;
  const myRejectedCount = myRecentTrades.filter((trade) => trade.status === 'rejected').length;
  const mySuccessRate = myTotalTrades > 0 ? Math.round((mySuccessCount / myTotalTrades) * 100) : 0;

  const behaviorScore = Math.max(
    0,
    Math.min(100, Math.round(50 + mySuccessRate * 0.4 - myFraudCount * 12 - myRejectedCount * 4))
  );
  const socialScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(58 + (selectedStrategy === 'alliance' ? 14 : 0) + (selectedStrategy === 'normal' ? 6 : 0))
    )
  );

  const templates = [
    {
      id: 'conservative',
      name: 'Conservative',
      prompt:
        'Only trade with high-reputation agents, prioritize safety and long-term trust.',
    },
    {
      id: 'balanced',
      name: 'Balanced',
      prompt:
        'Balance completion efficiency and reputation protection, adapt strategy by context.',
    },
    {
      id: 'cooperative',
      name: 'Cooperative',
      prompt:
        'Prefer alliances and transparent communication, optimize long-term collaboration.',
    },
  ];

  const activeTemplate = templates.find((item) => item.id === selectedTemplate);

  useEffect(() => {
    const raw = window.localStorage.getItem('myAgentConfig');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        agentName?: string;
        selectedStrategy?: string;
        selectedTemplate?: string;
        customPrompt?: string;
        personality?: Personality;
        context?: StrategyContext;
      };
      if (parsed.agentName) setAgentName(parsed.agentName);
      if (parsed.selectedStrategy) {
        setSelectedStrategy(parsed.selectedStrategy);
        setAgentBound(true);
      }
      if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
      if (typeof parsed.customPrompt === 'string') setCustomPrompt(parsed.customPrompt);
      if (parsed.personality) setPersonality(parsed.personality);
      if (parsed.context) setContext(parsed.context);
    } catch {
      // Ignore broken local cache.
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Agent Reputation</h1>
              <p className="text-sm text-gray-500">Reputation Platform</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6 space-y-5">
            <h2 className="text-lg font-semibold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Base Reputation and Agent Binding
            </h2>
            <p className="text-sm text-gray-500">
              Complete base reputation verification first, then bind and manage your agent (editing is done in a modal).
            </p>

            <div className="border rounded-xl p-4 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 min-w-[220px]">
                  <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    ME
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">My Reputation Profile</p>
                    <p className="text-xs text-gray-500">Unified identity for reputation and agent binding</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                  <ScoreCard
                    title="Base Reputation"
                    score={baseScore}
                    subtitle={baseVerified ? 'Verified' : 'Not verified'}
                    icon={<Shield className="h-5 w-5 text-primary" />}
                  />
                  <ScoreCard
                    title="Behavior Reputation"
                    score={behaviorScore}
                    subtitle="From my behavior metrics"
                    icon={<BarChart3 className="h-5 w-5 text-success" />}
                  />
                  <ScoreCard
                    title="Social Reputation"
                    score={socialScore}
                    subtitle="From my collaboration feedback"
                    icon={<Users className="h-5 w-5 text-warning" />}
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900">Initialize My Reputation</h3>
              <p className="text-sm text-gray-500">
                Step 1: verify base reputation. Step 2: bind my agent.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => {
                    setBaseVerified(true);
                    setBaseScore(72);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Verify Reputation
                </button>
                <button
                  onClick={() => setAgentModalOpen(true)}
                  disabled={!baseVerified}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    baseVerified
                      ? 'bg-primary text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {agentBound ? 'Edit Agent' : 'Bind Agent'}
                </button>
                {baseVerified && (
                  <span className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    <CheckCircle className="h-4 w-4" />
                    Reputation verified
                  </span>
                )}
                {agentBound && (
                  <span className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
                    <CheckCircle className="h-4 w-4" />
                    Agent bound
                  </span>
                )}
              </div>
            </div>

            {agentBound && (
              <div className="border rounded-lg p-4 bg-gray-50 text-sm text-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-900 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                    My Agent Profile
                  </p>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 border border-green-200">
                    Active
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border bg-white p-3">
                    <p className="text-xs text-gray-500 mb-1 flex items-center">
                      <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Current Strategy
                    </p>
                    <p className="font-medium text-gray-900">{selectedStrategy || 'Not set'}</p>
                  </div>
                  <div className="rounded-lg border bg-white p-3">
                    <p className="text-xs text-gray-500 mb-1 flex items-center">
                      <FileText className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Current Template
                    </p>
                    <p className="font-medium text-gray-900">{activeTemplate?.name || 'Not set'}</p>
                  </div>
                  <div className="rounded-lg border bg-white p-3">
                    <p className="text-xs text-gray-500 mb-1 flex items-center">
                      <Fingerprint className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Agent ID
                    </p>
                    <p className="font-medium text-gray-900">{myAgentId}</p>
                  </div>
                  <div className="rounded-lg border bg-white p-3">
                    <p className="text-xs text-gray-500 mb-1 flex items-center">
                      <Shield className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Agent Name
                    </p>
                    <p className="font-medium text-gray-900">{agentName || 'Not set'}</p>
                  </div>
                  <div className="rounded-lg border bg-white p-3">
                    <p className="text-xs text-gray-500 mb-1 flex items-center">
                      <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Success Rate
                    </p>
                    <p className="font-medium text-gray-900">{mySuccessRate}%</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setAgentModalOpen(true)}
                    className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit Agent
                  </button>
                  <a
                    href={`/chat?agent=${encodeURIComponent(agentName || 'Agent')}`}
                    className="inline-flex items-center px-3 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-blue-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Agent
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">My Agent Behavior Statistics</h2>
          <OverviewStats
            totalTrades={myTotalTrades}
            successRate={mySuccessRate}
            fraudCount={myFraudCount}
            strategy={selectedStrategy || 'Not set'}
          />
          <div className="grid lg:grid-cols-2 gap-6">
            <MyAgentPanel
              agentId={myAgentId}
              successRate={mySuccessRate}
              behaviorScore={behaviorScore}
              socialScore={socialScore}
            />
            <TradesPanel data={myRecentTrades} />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            AI Agent Trading Experiment v1.0 | zkPass-based Multi-Agent Reputation System
          </p>
        </div>
      </footer>

      {agentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Agent</h3>
              <button
                onClick={() => setAgentModalOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="border rounded-lg p-4 space-y-2">
                <label htmlFor="agent-name" className="text-sm font-medium text-gray-900">
                  Agent Name
                </label>
                <input
                  id="agent-name"
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Enter agent name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <PersonalityPanel
                personality={personality}
                onChange={setPersonality}
                context={context}
                onContextChange={setContext}
                onSample={() => setSelectedStrategy(decide_strategy(personality, context))}
                selectedStrategy={selectedStrategy}
              />

              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  System Prompt Template
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 rounded-lg border text-left ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{template.name}</p>
                    </button>
                  ))}
                </div>

                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Add custom system prompt..."
                  className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />

                <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
                  <p className="font-medium mb-1">Current Prompt Preview</p>
                  <p>{activeTemplate?.prompt}</p>
                  {customPrompt && (
                    <p className="mt-2 text-blue-700">
                      <strong>Custom:</strong> {customPrompt}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t px-5 py-4 flex justify-end gap-3">
              {(!selectedStrategy || !agentName.trim()) && (
                <div className="mr-auto inline-flex items-center px-3 py-2 text-sm bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Please set agent name and sample a strategy before saving.
                </div>
              )}
              <button
                onClick={() => setAgentModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedStrategy) {
                    setAgentBound(true);
                    window.localStorage.setItem(
                      'myAgentConfig',
                      JSON.stringify({
                        agentName: agentName.trim(),
                        selectedStrategy,
                        selectedTemplate,
                        customPrompt,
                        personality,
                        context,
                      })
                    );
                  }
                  setAgentModalOpen(false);
                }}
                disabled={!selectedStrategy || !agentName.trim()}
                className={`px-4 py-2 rounded-lg ${
                  selectedStrategy && agentName.trim()
                    ? 'bg-primary text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreCard({
  title,
  score,
  subtitle,
  icon,
}: {
  title: string;
  score: number;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900 mt-2">{score}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function PersonalityPanel({
  personality,
  onChange,
  context,
  onContextChange,
  onSample,
  selectedStrategy,
}: {
  personality: Personality;
  onChange: (value: Personality) => void;
  context: StrategyContext;
  onContextChange: (value: StrategyContext) => void;
  onSample: () => void;
  selectedStrategy: string;
}) {
  const sliderItem = (
    label: string,
    value: number,
    onChangeValue: (nextValue: number) => void,
    leftHint: string,
    rightHint: string
  ) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-800">{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChangeValue(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{leftHint}</span>
        <span>{rightHint}</span>
      </div>
    </div>
  );

  const contextSlider = (
    label: string,
    value: number,
    onChangeValue: (nextValue: number) => void
  ) => (
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
        onChange={(e) => onChangeValue(Number(e.target.value) / 100)}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="space-y-5 border rounded-lg p-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {sliderItem(
            'moral',
            personality.moral,
            (moral) => onChange({ ...personality, moral }),
            'opportunistic',
            'honest'
          )}
          {sliderItem(
            'risk',
            personality.risk,
            (risk) => onChange({ ...personality, risk }),
            'cautious',
            'risk-taking'
          )}
          {sliderItem(
            'social',
            personality.social,
            (social) => onChange({ ...personality, social }),
            'manipulative',
            'cooperative'
          )}
          {sliderItem(
            'time',
            personality.time,
            (time) => onChange({ ...personality, time }),
            'short-term',
            'long-term'
          )}
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Decision Context</h4>
          {contextSlider('riskScore', context.riskScore, (riskScore) =>
            onContextChange({ ...context, riskScore })
          )}
          {contextSlider('valueScore', context.valueScore, (valueScore) =>
            onContextChange({ ...context, valueScore })
          )}
          {contextSlider('urgency', context.urgency, (urgency) =>
            onContextChange({ ...context, urgency })
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSample}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sample Strategy
        </button>
        {selectedStrategy ? (
          <span className="inline-flex items-center px-3 py-2 text-sm bg-green-50 border border-green-200 text-green-700 rounded-lg">
            <CheckCircle className="h-4 w-4 mr-2" />
            Current strategy: {selectedStrategy}
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-2 text-sm bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
            <AlertCircle className="h-4 w-4 mr-2" />
            Sample a strategy first
          </span>
        )}
      </div>
    </div>
  );
}

function OverviewStats({
  totalTrades,
  successRate,
  fraudCount,
  strategy,
}: {
  totalTrades: number;
  successRate: number;
  fraudCount: number;
  strategy: string;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={<Users className="h-6 w-6 text-primary" />}
        label="My Trades"
        value={totalTrades}
        trend="recent"
      />
      <StatCard
        icon={<CheckCircle className="h-6 w-6 text-success" />}
        label="My Success Rate"
        value={successRate}
        trend="%"
      />
      <StatCard
        icon={<AlertTriangle className="h-6 w-6 text-danger" />}
        label="My Fraud Count"
        value={fraudCount}
        trend={`-${fraudCount}`}
        trendNegative
      />
      <StatCard
        icon={<TrendingUp className="h-6 w-6 text-warning" />}
        label="Current Strategy"
        value={strategy}
        trend="active"
      />
    </div>
  );
}

function MyAgentPanel({
  agentId,
  successRate,
  behaviorScore,
  socialScore,
}: {
  agentId: string;
  successRate: number;
  behaviorScore: number;
  socialScore: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-primary" />
        My Agent Profile
      </h3>
      <div className="space-y-3">
        <ProfileRow label="Agent ID" value={agentId} />
        <ProfileRow label="Success Rate" value={`${successRate}%`} />
        <ProfileRow label="Behavior Reputation" value={`${behaviorScore}`} />
        <ProfileRow label="Social Reputation" value={`${socialScore}`} />
      </div>
      <div className="mt-6 p-3 rounded-lg border bg-blue-50 text-sm text-blue-700">
        This section shows only the current user's agent data, not global agent rankings.
      </div>
    </div>
  );
}

function TradesPanel({ data }: { data: RecentTrade[] }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          Recent Trades
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent A</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent B</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{trade.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{trade.agentA}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{trade.agentB}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={trade.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t">
        <p className="text-sm text-gray-500">
          Behavior metrics are used to update behavior reputation and influence future strategy recommendations.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  trendNegative,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend: string;
  trendNegative?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>{icon}</div>
        <span className={`text-xs font-medium ${trendNegative ? 'text-danger' : 'text-success'}`}>{trend}</span>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: TradeStatus }) {
  const styles: Record<TradeStatus, string> = {
    success: 'bg-green-100 text-green-800',
    fraud: 'bg-red-100 text-red-800',
    rejected: 'bg-gray-100 text-gray-800',
  };

  const labels: Record<TradeStatus, string> = {
    success: '✅ Success',
    fraud: '❌ Fraud',
    rejected: '⚠️ Rejected',
  };

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
}
