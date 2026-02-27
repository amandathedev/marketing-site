import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../lib/marketingChat';

interface Props {
  messages: ChatMessage[];
  loading: boolean;
}

export function MessageList({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[var(--brand)] text-white'
                : 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {loading && (
        <div className="flex justify-start">
          <div className="flex items-center gap-1 rounded-lg bg-[var(--bg-elevated)] px-3 py-2.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
