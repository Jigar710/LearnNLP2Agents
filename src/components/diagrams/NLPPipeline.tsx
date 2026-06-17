import { useState } from 'react';
import '../../styles/diagrams.css';

/**
 * NLPPipeline (PRD §15.1, Topic 01) — 8-stage horizontal NLP pipeline.
 * Click a stage to see what it does plus example input/output. Theme-aware via
 * CSS custom properties; horizontally scrollable on small screens.
 */
interface Stage {
  name: string;
  short: string;
  desc: string;
  input: string;
  output: string;
}

const STAGES: Stage[] = [
  {
    name: 'Raw Text',
    short: 'Raw',
    desc: 'The unprocessed input string, exactly as received from a document, web page, or user.',
    input: '—',
    output: '"Dr. Smith isn\'t home. Call him!"',
  },
  {
    name: 'Sentence Splitting',
    short: 'Sentences',
    desc: 'Segment the text into sentences. Tricky because periods also appear in abbreviations and decimals.',
    input: '"Dr. Smith isn\'t home. Call him!"',
    output: '["Dr. Smith isn\'t home.", "Call him!"]',
  },
  {
    name: 'Tokenization',
    short: 'Tokens',
    desc: 'Break each sentence into tokens (words, punctuation, sub-words). Contractions are often split.',
    input: '"Dr. Smith isn\'t home."',
    output: '["Dr.", "Smith", "is", "n\'t", "home", "."]',
  },
  {
    name: 'Normalization',
    short: 'Normalize',
    desc: 'Lowercase, strip accents, expand contractions, and standardize tokens to reduce sparsity.',
    input: '["Dr.", "Smith", "is", "n\'t", ...]',
    output: '["dr", "smith", "is", "not", "home"]',
  },
  {
    name: 'POS Tagging',
    short: 'POS',
    desc: 'Assign a part-of-speech tag (noun, verb, adjective…) to each token using context.',
    input: '["smith", "is", "not", "home"]',
    output: 'smith/NNP is/VBZ not/RB home/RB',
  },
  {
    name: 'Parsing',
    short: 'Parse',
    desc: 'Build syntactic structure — a dependency or constituency tree showing how words relate.',
    input: 'smith/NNP is/VBZ not/RB home/RB',
    output: 'nsubj(is, smith); neg(home, not)',
  },
  {
    name: 'Feature Extraction',
    short: 'Features',
    desc: 'Turn linguistic structure into numeric vectors (counts, embeddings) a model can consume.',
    input: 'tokens + tags + tree',
    output: '[0.21, -0.04, 0.88, … ] (vector)',
  },
  {
    name: 'Model',
    short: 'Model',
    desc: 'A downstream model uses the features for a task: classification, NER, translation, etc.',
    input: '[0.21, -0.04, 0.88, … ]',
    output: 'label: "negative sentiment"',
  },
];

export default function NLPPipeline() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <div className="nlp-pipe">
      <div className="nlp-pipe-track" role="tablist" aria-label="NLP pipeline stages">
        {STAGES.map((s, i) => (
          <div className="nlp-pipe-step" key={s.name}>
            <button
              role="tab"
              aria-selected={i === active}
              className={`nlp-pipe-chip${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="nlp-pipe-num">{i + 1}</span>
              <span className="nlp-pipe-name">{s.short}</span>
            </button>
            {i < STAGES.length - 1 && (
              <span className="nlp-pipe-arrow" aria-hidden="true">
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <path d="M0 7h18M14 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="nlp-pipe-detail" role="tabpanel">
        <h4 className="nlp-pipe-title">
          <span className="nlp-pipe-badge">Stage {active + 1}</span>
          {stage.name}
        </h4>
        <p className="nlp-pipe-desc">{stage.desc}</p>
        <div className="nlp-pipe-io">
          <div className="nlp-pipe-io-row">
            <span className="nlp-pipe-io-label">in</span>
            <code>{stage.input}</code>
          </div>
          <div className="nlp-pipe-io-row">
            <span className="nlp-pipe-io-label out">out</span>
            <code>{stage.output}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
