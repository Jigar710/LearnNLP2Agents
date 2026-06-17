import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * SearchModal (PRD §11.13 / F3) — navbar search trigger + Cmd/Ctrl+K modal
 * backed by Pagefind. The Pagefind bundle only exists after `pagefind --site
 * dist` runs at build (Step 11), so we load it lazily and degrade gracefully
 * in dev.
 */
interface PagefindResultData {
  url: string;
  meta: { title?: string };
  excerpt: string;
}
interface PagefindResult {
  data: () => Promise<PagefindResultData>;
}
interface Pagefind {
  search: (q: string) => Promise<{ results: PagefindResult[] }>;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'unavailable'>('idle');
  const pagefindRef = useRef<Pagefind | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadPagefind = useCallback(async () => {
    if (pagefindRef.current || status === 'loading') return;
    setStatus('loading');
    try {
      const mod = (await import(/* @vite-ignore */ `${BASE}/pagefind/pagefind.js`)) as Pagefind;
      pagefindRef.current = mod;
      setStatus('ready');
    } catch {
      setStatus('unavailable');
    }
  }, [status]);

  // Open/close on Cmd/Ctrl+K and Esc
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      void loadPagefind();
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery('');
      setResults([]);
      setActive(0);
    }
  }, [open, loadPagefind]);

  // Run the search (debounced)
  useEffect(() => {
    if (!open) return;
    const handle = setTimeout(async () => {
      const pf = pagefindRef.current;
      if (!pf || !query.trim()) {
        setResults([]);
        return;
      }
      try {
        const search = await pf.search(query);
        const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
        setResults(data);
        setActive(0);
      } catch {
        setResults([]);
      }
    }, 140);
    return () => clearTimeout(handle);
  }, [query, open]);

  function onResultsKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      window.location.href = results[active].url;
    }
  }

  return (
    <>
      <button type="button" className="search-trigger" onClick={() => setOpen(true)} aria-label="Search topics">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="search-trigger-text">Search topics…</span>
        <kbd className="search-kbd">⌘K</kbd>
      </button>

      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)} role="presentation">
          <div className="search-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Search">
            <div className="search-input-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search the curriculum…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onResultsKey}
                aria-label="Search query"
              />
              <button type="button" className="search-esc" onClick={() => setOpen(false)} aria-label="Close search">Esc</button>
            </div>

            <div className="search-results">
              {status === 'unavailable' && (
                <p className="search-hint">Search index is built at deploy time — run <code>npm run build &amp;&amp; npx pagefind --site dist</code> to enable it locally.</p>
              )}
              {status === 'loading' && <p className="search-hint">Loading search…</p>}
              {status === 'ready' && query.trim() && results.length === 0 && (
                <p className="search-hint">No results for “{query}”.</p>
              )}
              {results.map((r, i) => (
                <a
                  key={r.url}
                  href={r.url}
                  className={`search-result${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="search-result-title">{r.meta.title || r.url}</span>
                  <span className="search-result-excerpt" dangerouslySetInnerHTML={{ __html: r.excerpt }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
