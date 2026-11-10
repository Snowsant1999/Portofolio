import { useEffect, useRef, useState } from 'preact/hooks';
import { runPortfolioAction, type PaletteItem } from '../../scripts/actions';

interface Props {
  items: PaletteItem[];
  locale: 'en' | 'id';
}

export default function CommandPalette({ items, locale }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const isId = locale === 'id';
  const normalized = query.trim().toLowerCase();
  const filtered = items.filter((item) => {
    if (!normalized) return true;
    return (
      item.label.toLowerCase().includes(normalized) ||
      item.group.toLowerCase().includes(normalized) ||
      item.keywords.toLowerCase().includes(normalized)
    );
  });

  useEffect(() => {
    const openDialog = () => {
      const dlg = dialogRef.current;
      if (!dlg || dlg.open) return;
      dlg.showModal();
      setTimeout(() => inputRef.current?.focus(), 20);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inInput = target?.closest('input, textarea, select, [contenteditable="true"]');
      if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !inInput)) {
        e.preventDefault();
        openDialog();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('palette:open', openDialog);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('palette:open', openDialog);
    };
  }, []);

  const executeItem = async (item?: PaletteItem) => {
    if (!item) return;
    dialogRef.current?.close();
    const feedback = await runPortfolioAction(item);
    if (feedback) {
      setToast(feedback);
      setTimeout(() => setToast(null), 2400);
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        class="cp-dialog"
        aria-label={isId ? 'Palet perintah dan pencarian' : 'Command palette and search'}
        onClose={() => {
          setQuery('');
          setSelectedIndex(0);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div class="cp-box">
          <div class="cp-header">
            <label for="cp-search-input" class="sr-only">
              {isId ? 'Cari proyek atau perintah' : 'Search projects or commands'}
            </label>
            <input
              ref={inputRef}
              id="cp-search-input"
              role="combobox"
              aria-expanded="true"
              aria-controls="cp-results-list"
              aria-activedescendant={filtered[selectedIndex] ? `cp-opt-${selectedIndex}` : undefined}
              placeholder={
                isId
                  ? 'Ketik nama proyek, bahasa (PHP, Java, Python...), atau perintah...'
                  : 'Type a project name, language (PHP, Java, Python...), or action...'
              }
              value={query}
              onInput={(e) => {
                setQuery(e.currentTarget.value);
                setSelectedIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.max(prev - 1, 0));
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  executeItem(filtered[selectedIndex]);
                }
              }}
            />
            <button
              type="button"
              class="cp-close-btn font-mono-code"
              onClick={() => dialogRef.current?.close()}
            >
              Esc
            </button>
          </div>

          <ul id="cp-results-list" role="listbox" class="cp-list">
            {filtered.length === 0 && (
              <li role="presentation" class="cp-empty">
                {isId
                  ? 'Tidak ada hasil yang cocok. Coba kata kunci "laravel", "java", "cv", atau "terminal".'
                  : 'No matching results. Try "laravel", "java", "cv", or "terminal".'}
              </li>
            )}
            {filtered.map((item, idx) => (
              <li
                key={item.id}
                id={`cp-opt-${idx}`}
                role="option"
                aria-selected={idx === selectedIndex}
                class={`cp-item ${idx === selectedIndex ? 'selected' : ''}`}
                onMouseMove={() => setSelectedIndex(idx)}
                onClick={() => executeItem(item)}
              >
                <span class="cp-group font-mono-code">{item.group}</span>
                <span class="cp-label">{item.label}</span>
              </li>
            ))}
          </ul>

          <div class="cp-footer font-mono-code">
            <span>↑↓ {isId ? 'Navigasi' : 'Navigate'}</span>
            <span>↵ {isId ? 'Pilih' : 'Select'}</span>
            <span>` {isId ? 'Buka Terminal' : 'Open Terminal'}</span>
          </div>
        </div>
      </dialog>

      {toast && (
        <div class="cp-toast font-mono-code" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  );
}

