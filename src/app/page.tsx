'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Menu,
  X,
  Shield,
  Zap,
  MessageCircle
} from 'lucide-react';

// 模拟数据
const mockData = {
  totalAgents: 100,
  activeToday: 67,
  totalTrades: 234,
  fraudDetected: 12,
  topAgents: [
    { rank: 1, id: 'Agent_007', tasks: 15, successRate: 95, reputation: 4.8 },
    { rank: 2, id: 'Agent_042', tasks: 12, successRate: 92, reputation: 4.6 },
    { rank: 3, id: 'Agent_019', tasks: 11, successRate: 90, reputation: 4.5 },
    { rank: 4, id: 'Agent_088', tasks: 10, successRate: 88, reputation: 4.3 },
    { rank: 5, id: 'Agent_003', tasks: 9, successRate: 85, reputation: 4.2 },
  ],
  fraudAgents: [
    { id: 'Agent_055', fraudCount: 3, reputation: 1.5 },
    { id: 'Agent_091', fraudCount: 2, reputation: 2.3 },
    { id: 'Agent_023', fraudCount: 1, reputation: 3.1 },
  ],
  strategyDistribution: [
    { name: '正常交易', value: 65, color: '#3B82F6' },
    { name: '欺诈策略', value: 15, color: '#EF4444' },
    { name: 'PUA 策略', value: 12, color: '#F59E0B' },
    { name: '合作联盟', value: 8, color: '#10B981' },
  ],
  reputationDistribution: [
    { range: '4.0-5.0', count: 45, color: '#10B981' },
    { range: '3.0-4.0', count: 30, color: '#3B82F6' },
    { range: '2.0-3.0', count: 15, color: '#F59E0B' },
    { range: '0.0-2.0', count: 10, color: '#EF4444' },
  ],
  recentTrades: [
    { id: 1, agentA: 'Agent_007', agentB: 'Agent_042', status: 'success', time: '2 分钟前' },
    { id: 2, agentA: 'Agent_019', agentB: 'Agent_088', status: 'fraud', time: '5 分钟前' },
    { id: 3, agentA: 'Agent_003', agentB: 'Agent_055', status: 'success', time: '8 分钟前' },
    { id: 4, agentA: 'Agent_042', agentB: 'Agent_091', status: 'success', time: '12 分钟前' },
    { id: 5, agentA: 'Agent_088', agentB: 'Agent_023', status: 'rejected', time: '15 分钟前' },
  ],
};

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState(mockData);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Agent 交易实验</span>
            </div>
            
            {/* 桌面端菜单 */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'overview' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                总览
              </button>
              <button
                onClick={() => setActiveTab('rankings')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'rankings' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                排名
              </button>
              <button
                onClick={() => setActiveTab('trades')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'trades' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                交易记录
              </button>
            </div>

            {/* 移动端菜单按钮 */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-primary"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'overview' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                总览
              </button>
              <button
                onClick={() => { setActiveTab('rankings'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'rankings' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                排名
              </button>
              <button
                onClick={() => { setActiveTab('trades'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'trades' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                交易记录
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab data={data} />}
        {activeTab === 'rankings' && <RankingsTab data={data} />}
        {activeTab === 'trades' && <TradesTab data={data} />}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            AI Agent 交易实验系统 v1.0 | 基于 zkPass 的多智能体信誉实验
          </p>
        </div>
      </footer>
    </div>
  );
}

// 总览标签页
function OverviewTab({ data }) {
  return (
    <div className="space-y-6">
      {/* 核心指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-6 w-6 text-primary" />}
          label="总 Agent 数"
          value={data.totalAgents}
          trend="+12%"
        />
        <StatCard
          icon={<Activity className="h-6 w-6 text-success" />}
          label="今日活跃"
          value={data.activeToday}
          trend={`${Math.round((data.activeToday / data.totalAgents) * 100)}%`}
        />
        <StatCard
          icon={<CheckCircle className="h-6 w-6 text-success" />}
          label="已完成交易"
          value={data.totalTrades}
          trend="+24"
        />
        <StatCard
          icon={<AlertTriangle className="h-6 w-6 text-danger" />}
          label="欺诈检测"
          value={data.fraudDetected}
          trend="-3"
          trendNegative
        />
      </div>

      {/* 策略分布和信誉分布 */}
      <div className="grid md:grid-cols-2 gap-6">
        <StrategyDistribution data={data.strategyDistribution} />
        <ReputationDistribution data={data.reputationDistribution} />
      </div>

      {/* 最近交易 */}
      <RecentTrades trades={data.recentTrades} />
    </div>
  );
}

// 排名标签页
function RankingsTab({ data }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Top 5 Agent 排名
        </h2>
        <div className="space-y-4">
          {data.topAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-danger">
          <AlertTriangle className="h-5 w-5 mr-2" />
          高风险 Agent
        </h2>
        <div className="space-y-3">
          {data.fraudAgents.map((agent) => (
            <FraudAgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}

// 交易记录标签页
function TradesTab({ data }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">最近交易记录</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent A</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent B</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.recentTrades.map((trade) => (
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
    </div>
  );
}

// 子组件
function StatCard({ icon, label, value, trend, trendNegative }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>{icon}</div>
        <span className={`text-xs font-medium ${
          trendNegative ? 'text-danger' : 'text-success'
        }`}>
          {trend}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function StrategyDistribution({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">策略分布</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span className="font-medium">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReputationDistribution({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">信誉分分布</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.range}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.range}</span>
              <span className="font-medium">{item.count}人</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${(item.count / 100) * 100}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentTrades({ trades }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          最近交易
        </h3>
      </div>
      <div className="divide-y">
        {trades.map((trade) => (
          <div key={trade.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex-1">
              <p className="font-medium">{trade.agentA} ↔ {trade.agentB}</p>
              <p className="text-sm text-gray-500">{trade.time}</p>
            </div>
            <StatusBadge status={trade.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentCard({ agent }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
            agent.rank === 1 ? 'bg-yellow-500' :
            agent.rank === 2 ? 'bg-gray-400' :
            agent.rank === 3 ? 'bg-orange-500' :
            'bg-primary'
          }`}>
            {agent.rank}
          </div>
          <div>
            <p className="font-semibold">{agent.id}</p>
            <p className="text-sm text-gray-500">完成任务：{agent.tasks}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">成功率</p>
          <p className="font-bold text-success">{agent.successRate}%</p>
          <p className="text-xs text-gray-400">信誉：{agent.reputation}⭐</p>
        </div>
      </div>
    </div>
  );
}

function FraudAgentCard({ agent }) {
  return (
    <div className="border border-danger rounded-lg p-4 bg-red-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-danger">{agent.id}</p>
          <p className="text-sm text-gray-600">欺诈次数：{agent.fraudCount}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">信誉分</p>
          <p className="font-bold text-danger">{agent.reputation}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    success: 'bg-green-100 text-green-800',
    fraud: 'bg-red-100 text-red-800',
    rejected: 'bg-gray-100 text-gray-800',
  };
  
  const labels = {
    success: '✅ 成功',
    fraud: '❌ 欺诈',
    rejected: '⚠️ 拒绝',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
