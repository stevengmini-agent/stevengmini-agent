'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bot, Send, User } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'agent';
  content: string;
};

export default function ChatClient({ agentName }: { agentName: string }) {
  const [input, setInput] = useState('');
  const [customPromptDraft, setCustomPromptDraft] = useState('');
  const [agentContext, setAgentContext] = useState<{
    selectedStrategy?: string;
    selectedTemplate?: string;
    customPrompt?: string;
  }>({});
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'agent',
      content: `Hello, I am ${agentName}. I can help with strategy, risk, and reputation decisions.`,
    },
  ]);

  useEffect(() => {
    const raw = window.localStorage.getItem('myAgentConfig');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        selectedStrategy?: string;
        selectedTemplate?: string;
        customPrompt?: string;
      };
      setAgentContext(parsed);
      if (typeof parsed.customPrompt === 'string') setCustomPromptDraft(parsed.customPrompt);
    } catch {
      // Ignore broken local cache.
    }
  }, []);

  const saveCustomPrompt = () => {
    let existing: Record<string, unknown> = {};
    try {
      const raw = window.localStorage.getItem('myAgentConfig');
      if (raw) existing = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      /* ignore */
    }
    const trimmed = customPromptDraft.trim();
    const next: Record<string, unknown> = { ...existing };
    if (trimmed) next.customPrompt = trimmed;
    else delete next.customPrompt;
    window.localStorage.setItem('myAgentConfig', JSON.stringify(next));
    setAgentContext((prev) => {
      const merged = { ...prev };
      if (trimmed) merged.customPrompt = trimmed;
      else delete merged.customPrompt;
      return merged;
    });
  };

  const systemContext = useMemo(() => {
    const parts = [
      `Agent: ${agentName}`,
      `Strategy: ${agentContext.selectedStrategy || 'Not set'}`,
      `Template: ${agentContext.selectedTemplate || 'Not set'}`,
    ];
    if (agentContext.customPrompt) {
      parts.push(`Custom Prompt: ${agentContext.customPrompt}`);
    }
    return parts.join(' | ');
  }, [agentContext, agentName]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: text },
      {
        role: 'agent',
        content: `Received: "${text}". Based on current context (${systemContext}), I suggest balancing risk with long-term reputation impact.`,
      },
    ]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Chat with {agentName}</h1>
          <p className="text-sm text-gray-500">Direct conversation channel with your bound agent</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-xl shadow border p-4 space-y-2">
          <p className="text-sm font-medium text-gray-900">Custom system prompt</p>
          <p className="text-xs text-gray-500">
            Optional. Appended to your template when the agent reasons in this chat. Saved to this browser only.
          </p>
          <textarea
            value={customPromptDraft}
            onChange={(e) => setCustomPromptDraft(e.target.value)}
            placeholder="e.g. Always cite risk limits before recommending a trade..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={saveCustomPrompt}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Save custom prompt
          </button>
        </div>

        <div className="bg-white rounded-xl shadow border p-4 space-y-3 min-h-[60vh]">
          <div className="rounded-lg border bg-blue-50 px-3 py-2 text-xs text-blue-700">
            <strong>Agent Context:</strong> {systemContext}
          </div>
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex items-start gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'agent' && (
                <span className="mt-1">
                  <Bot className="h-4 w-4 text-primary" />
                </span>
              )}
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  message.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 border'
                }`}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <span className="mt-1">
                  <User className="h-4 w-4 text-gray-500" />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 bg-white rounded-xl shadow border p-3 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
