import { useEffect, useRef, useState } from 'preact/hooks';
import { runPortfolioAction, type PaletteItem } from '../../scripts/actions';

interface Props {
  items: PaletteItem[];
  locale: 'en' | 'id';
}

interface LogLine {
  type: 'cmd' | 'out';
  text: string;
}

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function Terminal({ items, locale }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([
    {
      type: 'out',
      text:
        locale === 'id'
          ? 'Snowsant1999 Shell v1.1. Ketik "help" untuk daftar perintah.'
          : 'Snowsant1999 Shell v1.1. Type "help" for available commands.',
    },
  ]);

  useEffect(() => {
    let konamiIdx = 0;

    const openTerminal = () => {
      const dlg = dialogRef.current;
      if (!dlg || dlg.open) return;
      dlg.showModal();
      setTimeout(() => inputRef.current?.focus(), 20);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inInput = target?.closest('input, textarea, select, [contenteditable="true"]');

      if (e.key === '`' && !inInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        openTerminal();
        return;
      }

      const expected = KONAMI_SEQUENCE[konamiIdx];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        konamiIdx++;
        if (konamiIdx === KONAMI_SEQUENCE.length) {
          konamiIdx = 0;
          openTerminal();
        }
      } else {
        konamiIdx = 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('terminal:open', openTerminal);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('terminal:open', openTerminal);
    };
  }, []);

  const handleCommand = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const lower = cmd.toLowerCase();
    const nextLogs: LogLine[] = [...logs, { type: 'cmd', text: `snowsant@portfolio:~$ ${cmd}` }];

    if (lower === 'help') {
      nextLogs.push({
        type: 'out',
        text: 'Commands: help, whoami, projects, open <name>, stack, theme, wonderland, contact, clear, exit',
      });
    } else if (lower === 'wonderland' || lower === 'alice' || lower === 'rabbit') {
      const wlItem = items.find((i) => i.actionType === 'wonderland');
      const msg = wlItem ? await runPortfolioAction(wlItem) : 'Wonderland toggled.';
      nextLogs.push({
        type: 'out',
        text: msg ?? 'Alice in Wonderland mode toggled.',
      });
    } else if (lower === 'whoami') {
      nextLogs.push({
        type: 'out',
        text: 'Snowsant1999 · Software Developer (Web Laravel/PHP, Java Desktop, Python AI, Cloud JS, Solidity).',
      });
    } else if (lower === 'projects') {
      const projList = items
        .filter((i) => i.group === 'Project')
        .map((i, idx) => `0${idx + 1}. ${i.label}`)
        .join(' | ');
      nextLogs.push({ type: 'out', text: projList });
    } else if (lower === 'stack') {
      nextLogs.push({
        type: 'out',
        text: 'Stack: PHP (Laravel 11), Java (Desktop POS), Python (Gemini AI), JavaScript (Cloud), Solidity (EVM).',
      });
    } else if (lower === 'theme') {
      const themeItem = items.find((i) => i.actionType === 'theme');
      if (themeItem) await runPortfolioAction(themeItem);
      nextLogs.push({ type: 'out', text: 'Color theme toggled.' });
    } else if (lower === 'contact') {
      const copyItem = items.find((i) => i.actionType === 'copy-email');
      const msg = copyItem ? await runPortfolioAction(copyItem) : 'Email copied.';
      nextLogs.push({ type: 'out', text: msg ?? 'Navigated to contact.' });
    } else if (lower.startsWith('open ')) {
      const query = lower.replace('open ', '').trim();
      const match = items.find(
        (i) => i.label.toLowerCase().includes(query) || i.keywords.toLowerCase().includes(query)
      );
      if (match) {
        nextLogs.push({ type: 'out', text: `Opening ${match.label}...` });
        setLogs(nextLogs);
        setInput('');
        dialogRef.current?.close();
        await runPortfolioAction(match);
        return;
      } else {
        nextLogs.push({
          type: 'out',
          text: `No project matching "${query}". Try: open alice, open pos, open keluhan`,
        });
      }
    } else if (lower === 'clear') {
      setLogs([]);
      setInput('');
      return;
    } else if (lower === 'exit') {
      dialogRef.current?.close();
      setInput('');
      return;
    } else {
      nextLogs.push({
        type: 'out',
        text: `Unknown command: "${cmd}". Type "help" for available commands.`,
      });
    }

    setLogs(nextLogs);
    setInput('');
  };

  return (
    <dialog
      ref={dialogRef}
      class="term-dialog"
      aria-label="Snowsant1999 interactive terminal"
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div class="term-window font-mono-code">
        <div class="term-bar">
          <span>snowsant1999@portfolio:~ (Easter Egg Shell)</span>
          <button
            type="button"
            class="term-close"
            onClick={() => dialogRef.current?.close()}
          >
            Esc / Close
          </button>
        </div>

        <div class="term-output" role="log" aria-live="polite">
          {logs.map((line, i) => (
            <div key={i} class={line.type === 'cmd' ? 'term-cmd' : 'term-out'}>
              {line.text}
            </div>
          ))}
        </div>

        <form
          class="term-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
        >
          <label for="term-cmd-input" class="term-prompt">
            snowsant@portfolio:~$
          </label>
          <input
            ref={inputRef}
            id="term-cmd-input"
            type="text"
            value={input}
            placeholder="help"
            autocomplete="off"
            onInput={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
    </dialog>
  );
}

