import { DashboardData } from './types';

export const mockDashboardData: DashboardData = {
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
    { name: 'Normal Trading', value: 65, color: '#3B82F6' },
    { name: 'Fraud Strategy', value: 15, color: '#EF4444' },
    { name: 'PUA Strategy', value: 12, color: '#F59E0B' },
    { name: 'Cooperation Alliance', value: 8, color: '#10B981' },
  ],
  reputationDistribution: [
    { range: '4.0-5.0', count: 45, color: '#10B981' },
    { range: '3.0-4.0', count: 30, color: '#3B82F6' },
    { range: '2.0-3.0', count: 15, color: '#F59E0B' },
    { range: '0.0-2.0', count: 10, color: '#EF4444' },
  ],
  recentTrades: [
    { id: 1, agentA: 'Agent_007', agentB: 'Agent_042', status: 'success', time: '2 min ago' },
    { id: 2, agentA: 'Agent_019', agentB: 'Agent_088', status: 'fraud', time: '5 min ago' },
    { id: 3, agentA: 'Agent_003', agentB: 'Agent_055', status: 'success', time: '8 min ago' },
    { id: 4, agentA: 'Agent_042', agentB: 'Agent_091', status: 'success', time: '12 min ago' },
    { id: 5, agentA: 'Agent_088', agentB: 'Agent_023', status: 'rejected', time: '15 min ago' },
  ],
};
