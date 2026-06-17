import { useState } from 'react';
import '../../styles/diagrams.css';

/**
 * BertMasking (PRD §15.5, Topic 19) — masked language modeling demo.
 * A sentence with some tokens [MASK]ed; click a mask to reveal BERT's top-5
 * predictions with probabilities (mock data). "Re-mask" picks new masks.
 * Theme-aware via CSS custom properties.
 */
interface Pred {
  tok: string;
  p: number;
}
interface Tok {
  word: string;
  preds?: Pred[]; // present → maskable content word
}

const SENTENCE: Tok[] = [
  { word: 'The' },
  { word: 'cat', preds: [{ tok: 'dog', p: 0.31 }, { tok: 'cat', p: 0.27 }, { tok: 'man', p: 0.09 }, { tok: 'boy', p: 0.06 }, { tok: 'child', p: 0.05 }] },
  { word: 'sat', preds: [{ tok: 'sat', p: 0.42 }, { tok: 'lay', p: 0.18 }, { tok: 'slept', p: 0.11 }, { tok: 'jumped', p: 0.07 }, { tok: 'stood', p: 0.05 }] },
  { word: 'on' },
  { word: 'the' },
  { word: 'soft', preds: [{ tok: 'soft', p: 0.29 }, { tok: 'warm', p: 0.19 }, { tok: 'old', p: 0.12 }, { tok: 'red', p: 0.08 }, { tok: 'big', p: 0.06 }] },
  { word: 'warm', preds: [{ tok: 'warm', p: 0.33 }, { tok: 'soft', p: 0.15 }, { tok: 'cold', p: 0.10 }, { tok: 'cozy', p: 0.08 }, { tok: 'dry', p: 0.05 }] },
  { word: 'mat', preds: [{ tok: 'floor', p: 0.22 }, { tok: 'mat', p: 0.20 }, { tok: 'bed', p: 0.12 }, { tok: 'couch', p: 0.09 }, { tok: 'rug', p: 0.07 }] },
];

const MASKABLE = SENTENCE.map((t, i) => (t.preds ? i : -1)).filter((i) => i >= 0);

function pickMasks(): number[] {
  const pool = [...MASKABLE];
  const out: number[] = [];
  for (let k = 0; k < 2 && pool.length; k++) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out.sort((a, b) => a - b);
}

export default function BertMasking() {
  // Deterministic first render (SSR-safe), randomized on Re-mask.
  const [masked, setMasked] = useState<number[]>([1, 7]);
  const [open, setOpen] = useState<number | null>(null);

  const openTok = open !== null ? SENTENCE[open] : null;

  function remask() {
    setOpen(null);
    setMasked(pickMasks());
  }

  return (
    <div className="bert">
      <div className="bert-sentence">
        {SENTENCE.map((t, i) => {
          const isMasked = masked.includes(i);
          if (!isMasked) return <span key={i} className="bert-word">{t.word}</span>;
          return (
            <button
              key={i}
              className={`bert-mask${open === i ? ' is-open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              [MASK]
            </button>
          );
        })}
        <button className="bert-remask" onClick={remask}>↻ Re-mask</button>
      </div>

      {openTok && openTok.preds && (
        <div className="bert-preds">
          <p className="bert-preds-head">
            BERT predictions for the masked token (true word: <strong>{openTok.word}</strong>)
          </p>
          {openTok.preds.map((pr) => {
            const correct = pr.tok === openTok.word;
            return (
              <div key={pr.tok} className={`bert-pred-row${correct ? ' is-correct' : ''}`}>
                <span className="bert-pred-tok">{pr.tok}</span>
                <span className="bert-pred-bar">
                  <span className="bert-pred-fill" style={{ width: `${pr.p * 100}%` }} />
                </span>
                <span className="bert-pred-p">{(pr.p * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      )}
      <p className="bert-hint">
        15% of tokens are masked during pre-training; BERT predicts them from both-side context. Click a [MASK].
      </p>
    </div>
  );
}
