import { useState } from 'react';
import '../../styles/diagrams.css';

/**
 * AmbiguityDemo (Topic 01) — the Winograd schema, made tactile.
 * Flip a single adjective and watch what the pronoun "it" refers to flip with
 * it, even though every other word — and the entire grammatical structure —
 * stays identical. Drives home why ambiguity, not vocabulary, is NLP's core
 * problem: a machine sees the same string both times; a human does not.
 */
type Variant = 'big' | 'small';

const DATA: Record<Variant, { refers: 'trophy' | 'suitcase'; why: string }> = {
  big: {
    refers: 'trophy',
    why: 'A trophy that is too big won’t fit. So "it" = the trophy.',
  },
  small: {
    refers: 'suitcase',
    why: 'A suitcase that is too small can’t hold the trophy. So "it" = the suitcase.',
  },
};

export default function AmbiguityDemo() {
  const [variant, setVariant] = useState<Variant>('big');
  const { refers, why } = DATA[variant];

  return (
    <div className="amb">
      <p className="amb-sentence">
        The{' '}
        <mark className={`amb-word${refers === 'trophy' ? ' is-ref' : ''}`}>trophy</mark>{' '}
        didn&rsquo;t fit in the{' '}
        <mark className={`amb-word${refers === 'suitcase' ? ' is-ref' : ''}`}>suitcase</mark>{' '}
        because <span className="amb-it">it</span> was too{' '}
        <span className="amb-slot">{variant}</span>.
      </p>

      <div className="amb-controls" role="group" aria-label="Choose the final word">
        <span className="amb-controls-label">Change one word:</span>
        {(['big', 'small'] as Variant[]).map((v) => (
          <button
            key={v}
            className={`amb-btn${v === variant ? ' is-active' : ''}`}
            aria-pressed={v === variant}
            onClick={() => setVariant(v)}
          >
            too {v}
          </button>
        ))}
      </div>

      <div className="amb-readout">
        <div className="amb-readout-row">
          <span className="amb-readout-label">&ldquo;it&rdquo; refers to</span>
          <strong className="amb-readout-val">the {refers}</strong>
        </div>
        <p className="amb-why">{why}</p>
      </div>

      <p className="amb-punch">
        One word changed and the meaning of <em>it</em> flipped to the opposite
        noun &mdash; yet the grammar is identical. Resolving this needs knowledge
        about the world (big things don&rsquo;t fit; small containers can&rsquo;t
        hold), not more dictionary entries. That is why NLP is hard.
      </p>
    </div>
  );
}
