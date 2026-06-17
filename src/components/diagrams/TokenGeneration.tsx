import { useEffect, useRef, useState } from 'react';
import '../../styles/diagrams.css';

/**
 * TokenGeneration (PRD §15.6, Topic 20) — autoregressive generation.
 * Click Generate: tokens appear one at a time (animated pulse). For the most
 * recent token, a bar chart shows the (mock) probability distribution it was
 * sampled from. Preset prompts: factual, poem, code. Theme-aware.
 */
interface Cand {
  tok: string;
  p: number;
}
interface GenTok {
  tok: string;
  dist: Cand[];
}
interface Preset {
  name: string;
  prompt: string[];
  gen: GenTok[];
}

const PRESETS: Preset[] = [
  {
    name: 'Factual',
    prompt: ['The', 'capital', 'of', 'France', 'is'],
    gen: [
      { tok: 'Paris', dist: [{ tok: 'Paris', p: 0.92 }, { tok: 'a', p: 0.03 }, { tok: 'the', p: 0.02 }, { tok: 'located', p: 0.01 }] },
      { tok: '.', dist: [{ tok: '.', p: 0.74 }, { tok: ',', p: 0.16 }, { tok: 'and', p: 0.06 }, { tok: 'which', p: 0.02 }] },
    ],
  },
  {
    name: 'Poem',
    prompt: ['Roses', 'are', 'red,'],
    gen: [
      { tok: 'violets', dist: [{ tok: 'violets', p: 0.61 }, { tok: 'the', p: 0.14 }, { tok: 'and', p: 0.10 }, { tok: 'skies', p: 0.07 }] },
      { tok: 'are', dist: [{ tok: 'are', p: 0.83 }, { tok: 'so', p: 0.07 }, { tok: 'bloom', p: 0.05 }, { tok: 'too', p: 0.03 }] },
      { tok: 'blue', dist: [{ tok: 'blue', p: 0.88 }, { tok: 'bright', p: 0.05 }, { tok: 'sweet', p: 0.04 }, { tok: 'pale', p: 0.02 }] },
    ],
  },
  {
    name: 'Code',
    prompt: ['def', 'add(a,', 'b):'],
    gen: [
      { tok: 'return', dist: [{ tok: 'return', p: 0.79 }, { tok: 'result', p: 0.09 }, { tok: 'sum', p: 0.07 }, { tok: 'print', p: 0.03 }] },
      { tok: 'a', dist: [{ tok: 'a', p: 0.71 }, { tok: 'sum', p: 0.13 }, { tok: '(', p: 0.09 }, { tok: 'int', p: 0.04 }] },
      { tok: '+', dist: [{ tok: '+', p: 0.86 }, { tok: '-', p: 0.05 }, { tok: '*', p: 0.05 }, { tok: ',', p: 0.02 }] },
      { tok: 'b', dist: [{ tok: 'b', p: 0.94 }, { tok: 'a', p: 0.03 }, { tok: 'c', p: 0.02 }, { tok: '1', p: 0.01 }] },
    ],
  },
];

export default function TokenGeneration() {
  const [pi, setPi] = useState(0);
  const [count, setCount] = useState(0); // how many gen tokens revealed
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const preset = PRESETS[pi];

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setCount((c) => {
        if (c >= preset.gen.length) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, 750);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, preset.gen.length]);

  function start() {
    setCount(0);
    setPlaying(true);
  }
  function selectPreset(i: number) {
    setPlaying(false);
    setPi(i);
    setCount(0);
  }

  const current = count > 0 ? preset.gen[count - 1] : null;

  return (
    <div className="tg">
      <div className="tg-controls">
        {PRESETS.map((p, i) => (
          <button key={p.name} className={`tg-preset${pi === i ? ' is-active' : ''}`} onClick={() => selectPreset(i)}>
            {p.name}
          </button>
        ))}
        <button className="tg-generate" onClick={start} disabled={playing}>
          {playing ? 'Generating…' : '▶ Generate'}
        </button>
      </div>

      <div className="tg-stream">
        {preset.prompt.map((t, i) => (
          <span key={`p-${i}`} className="tg-tok tg-tok-prompt">{t}</span>
        ))}
        {preset.gen.slice(0, count).map((g, i) => (
          <span key={`g-${i}`} className={`tg-tok tg-tok-gen${i === count - 1 ? ' tg-pulse' : ''}`}>{g.tok}</span>
        ))}
        {count < preset.gen.length && <span className="tg-cursor" aria-hidden="true" />}
      </div>

      <div className="tg-dist">
        {current ? (
          <>
            <p className="tg-dist-head">Next-token probabilities (step {count})</p>
            {current.dist.map((c) => (
              <div key={c.tok} className={`tg-dist-row${c.tok === current.tok ? ' is-picked' : ''}`}>
                <span className="tg-dist-tok">{c.tok}</span>
                <span className="tg-dist-bar"><span className="tg-dist-fill" style={{ width: `${c.p * 100}%` }} /></span>
                <span className="tg-dist-p">{(c.p * 100).toFixed(0)}%</span>
              </div>
            ))}
          </>
        ) : (
          <p className="tg-dist-hint">Press Generate. Each token is sampled from a probability distribution over the vocabulary, then fed back in.</p>
        )}
      </div>
    </div>
  );
}
