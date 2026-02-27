interface Props {
  chips: string[];
  onChipClick: (chip: string) => void;
  disabled?: boolean;
}

export function SuggestionChips({ chips, onChipClick, disabled }: Props) {
  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5 px-4 pb-2 pt-1">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onChipClick(chip)}
          disabled={disabled}
          className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)] disabled:opacity-40"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
