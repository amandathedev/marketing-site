import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function Composer({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex items-end gap-2 border-t border-[var(--border)] px-3 py-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        disabled={disabled}
        placeholder="Type a message…"
        rows={1}
        className="flex-1 resize-none rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)] focus:outline-none disabled:opacity-60"
        style={{ maxHeight: '120px' }}
      />
      <button
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)] text-white transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-40"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}
