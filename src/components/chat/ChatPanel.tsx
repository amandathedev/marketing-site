import { X } from 'lucide-react';
import type { ChatMessage, UiHints } from '../../lib/marketingChat';
import { MessageList } from './MessageList';
import { SuggestionChips } from './SuggestionChips';
import { DemoCTA } from './DemoCTA';
import { Composer } from './Composer';

interface Props {
  messages: ChatMessage[];
  loading: boolean;
  uiHints: UiHints;
  onSend: (text: string) => void;
  onClose: () => void;
  onChipClick: (chip: string) => void;
  onDemoClick: () => void;
}

export function ChatPanel({
  messages,
  loading,
  uiHints,
  onSend,
  onClose,
  onChipClick,
  onDemoClick,
}: Props) {
  return (
    <div
      className="fixed bottom-[4.5rem] right-6 z-50 flex w-[min(460px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-2xl shadow-black/50"
      style={{ height: 'min(540px, calc(100dvh - 6rem))' }}
    >
      {/* Orange accent line */}
      <div className="h-0.5 w-full bg-[var(--brand)]" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Cattlytx</p>
          <p className="text-xs text-[var(--text-muted)]">Ask anything about the platform</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-md p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <MessageList messages={messages} loading={loading} />

      {/* Suggestion chips — above input, low-emphasis, never block typing */}
      {uiHints.show_suggestion_chips && uiHints.chips.length > 0 && (
        <SuggestionChips
          chips={uiHints.chips}
          onChipClick={onChipClick}
          disabled={loading}
        />
      )}

      {/* Demo CTA — only at conversion moments */}
      {uiHints.show_demo_cta && (
        <DemoCTA onDemoClick={onDemoClick} disabled={loading} />
      )}

      {/* Composer */}
      <Composer onSend={onSend} disabled={loading} />
    </div>
  );
}
