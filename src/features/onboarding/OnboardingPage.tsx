'use client';

import { useState } from 'react';
import {
  Shield,
  CheckCircle,
  Upload,
  Settings,
  BarChart3,
  FileText,
  Sparkles,
  ArrowRight,
  Check,
  AlertCircle,
} from 'lucide-react';
import { AgentPersonalityStep } from './components/AgentPersonalityStep';
import { Personality, StrategyContext } from './types';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [kycVerified, setKycVerified] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [personality, setPersonality] = useState<Personality>({
    moral: 60,
    risk: 50,
    social: 55,
    time: 60,
  });
  const [strategyContext, setStrategyContext] = useState<StrategyContext>({
    riskScore: 0.5,
    valueScore: 0.5,
    urgency: 0.5,
  });

  const steps = [
    { title: 'KYC Verification', description: 'Verify your identity' },
    { title: 'Credit Binding', description: 'Link your base credit' },
    { title: 'Select Agent', description: 'Set personality and sample strategy' },
    { title: 'Configure Prompt', description: 'Customize agent behavior' },
    { title: 'Dashboard', description: 'View your statistics' },
  ];

  const agentTemplates = [
    {
      id: 'conservative',
      name: 'Conservative Trader',
      description: 'Low risk, steady growth. Focuses on high-reputation partners only.',
      icon: '🛡️',
      prompt:
        'You are a conservative trading agent. Only trade with agents who have reputation > 4.0 and no fraud records. Prioritize long-term relationships over quick gains.',
    },
    {
      id: 'aggressive',
      name: 'Aggressive Trader',
      description: 'High risk, high reward. Willing to trade with anyone for profit.',
      icon: '⚡',
      prompt:
        'You are an aggressive trading agent. Maximize task completion rate. Use PUA tactics when necessary. Accept higher risk for faster results.',
    },
    {
      id: 'balanced',
      name: 'Balanced Trader',
      description: 'Moderate risk with smart decision making.',
      icon: '⚖️',
      prompt:
        'You are a balanced trading agent. Evaluate each counterparty carefully. Use a mix of strategies based on the situation. Maintain good reputation while completing tasks efficiently.',
    },
    {
      id: 'cooperative',
      name: 'Cooperative Alliance',
      description: 'Build long-term partnerships and mutual trust.',
      icon: '🤝',
      prompt:
        'You are a cooperative trading agent. Focus on building long-term alliances. Be honest and reliable. Help your partners and expect the same in return.',
    },
  ];

  const handleKYCUpload = () => {
    setTimeout(() => {
      setKycVerified(true);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <KYCVerification kycVerified={kycVerified} onUpload={handleKYCUpload} />;
      case 1:
        return <CreditBinding kycVerified={kycVerified} />;
      case 2:
        return (
          <AgentPersonalityStep
            selectedStrategy={selectedAgent}
            onSelectStrategy={setSelectedAgent}
            personality={personality}
            onPersonalityChange={setPersonality}
            context={strategyContext}
            onContextChange={setStrategyContext}
          />
        );
      case 3:
        return (
          <PromptConfiguration
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            customPrompt={customPrompt}
            onCustomPromptChange={setCustomPrompt}
            templates={agentTemplates}
          />
        );
      case 4:
        return <UserDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Agent Trading Lab</h1>
                <p className="text-sm text-gray-500">User Onboarding</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index <= currentStep ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className={`text-sm font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">{renderStep()}</div>

        {currentStep < 4 && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0 ? 'opacity-0 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
              }`}
              disabled={currentStep === 0}
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>{currentStep === 3 ? 'Complete' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function KYCVerification({ kycVerified, onUpload }: { kycVerified: boolean; onUpload: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">KYC Verification</h2>
        <p className="text-gray-600 mt-2">Verify your identity to establish initial reputation</p>
      </div>

      {kycVerified ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-900">KYC Verified!</h3>
          <p className="text-green-700 mt-1">Your identity has been successfully verified</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
            onClick={onUpload}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Click to upload ID document</p>
            <p className="text-sm text-gray-500 mt-1">Supports: Passport, Driver&apos;s License, National ID</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CreditBinding({ kycVerified }: { kycVerified: boolean }) {
  const creditSources = [
    { name: 'zkPass Identity', icon: '🔐', connected: true },
    { name: 'GitHub Profile', icon: '🐙', connected: false },
    { name: 'LinkedIn', icon: '💼', connected: false },
    { name: 'Twitter', icon: '🐦', connected: false },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Bind Your Credit</h2>
      </div>
      {!kycVerified ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <AlertCircle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-yellow-800 font-medium">Please complete KYC verification first</p>
        </div>
      ) : (
        <div className="space-y-3">
          {creditSources.map((source) => (
            <div key={source.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{source.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{source.name}</p>
                  <p className="text-sm text-gray-500">{source.connected ? 'Connected' : 'Not connected'}</p>
                </div>
              </div>
              {source.connected ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">Connect</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PromptConfiguration({
  selectedTemplate,
  onSelectTemplate,
  customPrompt,
  onCustomPromptChange,
  templates,
}: {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
  customPrompt: string;
  onCustomPromptChange: (text: string) => void;
  templates: Array<{ id: string; name: string; description: string; icon: string; prompt: string }>;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Settings className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Configure Agent Prompt</h2>
      </div>
      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedTemplate === template.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{template.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
              {selectedTemplate === template.id && <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />}
            </div>
          </div>
        ))}
      </div>
      <textarea
        value={customPrompt}
        onChange={(e) => onCustomPromptChange(e.target.value)}
        placeholder="Add custom instructions for your agent..."
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
      />
      {selectedTemplate && (
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <h4 className="text-sm font-medium text-gray-700">Preview Combined Prompt</h4>
          </div>
          <div className="text-sm text-gray-600 bg-white p-3 rounded border max-h-32 overflow-y-auto">
            {templates.find((t) => t.id === selectedTemplate)?.prompt}
            {customPrompt && (
              <div className="mt-2 pt-2 border-t text-blue-600">
                <strong>Custom:</strong> {customPrompt}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function UserDashboard() {
  const stats = [
    { label: 'Total Trades', value: '0', change: '+0%', icon: '📊' },
    { label: 'Success Rate', value: '0%', change: '0%', icon: '✅' },
    { label: 'Reputation', value: '4.2', change: '+0.1', icon: '⭐' },
    { label: 'Tasks Completed', value: '0', change: '+0', icon: '🎯' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Your Dashboard</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
        <div className="text-center text-gray-500 py-8">
          <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No activity yet</p>
        </div>
      </div>
    </div>
  );
}
