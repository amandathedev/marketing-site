import { MessageCircle, X } from 'lucide-react';

interface Props {
  open: boolean;
  nudgeVisible: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function ChatLauncher({ open, nudgeVisible, onOpen, onClose }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Nudge bubble — appears before user opens chat */}
      {nudgeVisible && !open && (
        <button
          onClick={onOpen}
          className="max-w-[220px] rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] shadow-lg transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
        >
          Not sure if this fits your yard?
        </button>
      )}

      {/* Launcher button */}
      <button
        onClick={open ? onClose : onOpen}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-lg transition-colors hover:bg-[var(--brand-hover)] focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
