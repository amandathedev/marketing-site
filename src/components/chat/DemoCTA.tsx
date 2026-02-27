import { ArrowRight } from 'lucide-react';

interface Props {
  onDemoClick: () => void;
  disabled?: boolean;
}

export function DemoCTA({ onDemoClick, disabled }: Props) {
  return (
    <div className="px-4 pb-3 pt-1">
      <button
        onClick={onDemoClick}
        disabled={disabled}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-60"
      >
        Connect with Andrew
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
