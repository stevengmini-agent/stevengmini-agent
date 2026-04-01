import ChatClient from './ChatClient';

export default function ChatWithAgentPage({
  searchParams,
}: {
  searchParams?: { agent?: string };
}) {
  const agentName = searchParams?.agent || 'Agent';
  return <ChatClient agentName={agentName} />;
}
