import { useMemo, useState } from 'react';
import { scaleLinear } from 'd3';
import '../../styles/diagrams.css';

/**
 * Word2VecSpace (PRD §15.2, Topic 06) — 2D embedding scatter (D3 scales + SVG).
 * ~48 words in 4 categories, colored by category. Hover shows a label; click a
 * word draws lines to its 5 nearest neighbors; the search box highlights a word.
 * Theme-aware via CSS custom properties; responsive viewBox.
 */
interface Word {
  word: string;
  cat: keyof typeof CATS;
  x: number;
  y: number;
}

const CATS = {
  animals: { label: 'Animals', color: '#0D9488', center: [-6, 4.5] },
  countries: { label: 'Countries', color: '#2563EB', center: [6, 5] },
  professions: { label: 'Professions', color: '#7C3AED', center: [-5.5, -5] },
  food: { label: 'Food', color: '#EA580C', center: [5.5, -5] },
} as const;

const WORDS_BY_CAT: Record<keyof typeof CATS, string[]> = {
  animals: ['dog', 'cat', 'horse', 'lion', 'tiger', 'wolf', 'bear', 'rabbit', 'mouse', 'elephant', 'fox', 'deer'],
  countries: ['france', 'germany', 'spain', 'italy', 'japan', 'china', 'india', 'brazil', 'canada', 'egypt', 'kenya', 'norway'],
  professions: ['doctor', 'engineer', 'teacher', 'lawyer', 'nurse', 'pilot', 'chef', 'artist', 'farmer', 'writer', 'judge', 'scientist'],
  food: ['pizza', 'bread', 'apple', 'rice', 'cheese', 'mango', 'pasta', 'soup', 'banana', 'curry', 'salad', 'sushi'],
};

// Deterministic cluster layout: each word offset from its category center.
const WORDS: Word[] = Object.entries(WORDS_BY_CAT).flatMap(([cat, list]) =>
  list.map((word, i) => {
    const [cx, cy] = CATS[cat as keyof typeof CATS].center;
    const angle = i * 2.39996; // golden angle → even spread
    const radius = 1.1 + (i % 4) * 0.8;
    return {
      word,
      cat: cat as keyof typeof CATS,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  })
);

function nearest(target: Word, k: number): Word[] {
  return WORDS.filter((w) => w.word !== target.word)
    .map((w) => ({ w, d: (w.x - target.x) ** 2 + (w.y - target.y) ** 2 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((o) => o.w);
}

const W = 560;
const H = 380;
const PAD = 28;

export default function Word2VecSpace() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const sx = useMemo(() => scaleLinear().domain([-10, 10]).range([PAD, W - PAD]), []);
  const sy = useMemo(() => scaleLinear().domain([-10, 10]).range([H - PAD, PAD]), []);

  const selectedWord = WORDS.find((w) => w.word === selected) ?? null;
  const neighbors = useMemo(
    () => (selectedWord ? nearest(selectedWord, 5) : []),
    [selectedWord]
  );
  const neighborSet = new Set(neighbors.map((n) => n.word));

  function toggleCat(cat: string) {
    setHidden((h) => {
      const n = new Set(h);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });
  }

  function onSearch(v: string) {
    setQuery(v);
    const match = WORDS.find((w) => w.word === v.trim().toLowerCase());
    if (match) setSelected(match.word);
  }

  return (
    <div className="w2v">
      <div className="w2v-controls">
        <input
          className="w2v-search"
          type="text"
          placeholder="Search a word (e.g. dog)…"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search a word"
          list="w2v-words"
        />
        <datalist id="w2v-words">
          {WORDS.map((w) => (
            <option key={w.word} value={w.word} />
          ))}
        </datalist>
        <div className="w2v-legend">
          {Object.entries(CATS).map(([key, c]) => (
            <span
              key={key}
              className="w2v-legend-item"
              style={{ opacity: hidden.has(key) ? 0.4 : 1 }}
              onClick={() => toggleCat(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleCat(key)}
            >
              <span className="w2v-legend-dot" style={{ background: c.color }} />
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <svg className="w2v-stage" viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Word embedding space">
        {/* neighbor lines */}
        {selectedWord &&
          neighbors.map((n) => (
            <line
              key={`l-${n.word}`}
              x1={sx(selectedWord.x)}
              y1={sy(selectedWord.y)}
              x2={sx(n.x)}
              y2={sy(n.y)}
              stroke={CATS[selectedWord.cat].color}
              strokeWidth={1.2}
              strokeOpacity={0.5}
            />
          ))}

        {WORDS.filter((w) => !hidden.has(w.cat)).map((w) => {
          const isSel = w.word === selected;
          const isNbr = neighborSet.has(w.word);
          const isHov = w.word === hover;
          const showLabel = isSel || isNbr || isHov;
          const r = isSel ? 8 : isNbr ? 6 : 4.5;
          return (
            <g key={w.word}>
              <circle
                className="w2v-dot"
                cx={sx(w.x)}
                cy={sy(w.y)}
                r={r}
                fill={CATS[w.cat].color}
                fillOpacity={isSel || isNbr || isHov ? 1 : 0.7}
                stroke={isSel ? 'var(--text-primary)' : 'none'}
                strokeWidth={2}
                onClick={() => setSelected(w.word)}
                onMouseEnter={() => setHover(w.word)}
                onMouseLeave={() => setHover(null)}
              />
              {showLabel && (
                <text
                  className={`w2v-label${isSel ? ' is-active' : ''}`}
                  x={sx(w.x) + r + 3}
                  y={sy(w.y) + 4}
                >
                  {w.word}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p className="w2v-hint">
        {selectedWord
          ? `“${selectedWord.word}” → nearest: ${neighbors.map((n) => n.word).join(', ')}`
          : 'Click any point to see its 5 nearest neighbors. Words in the same category cluster together.'}
      </p>
    </div>
  );
}
