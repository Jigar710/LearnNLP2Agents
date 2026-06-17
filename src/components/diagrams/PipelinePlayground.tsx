import { useMemo, useState } from 'react';
import '../../styles/diagrams.css';

/**
 * PipelinePlayground (Topic 01) — run the first NLP pipeline stages on *your
 * own* text, live in the browser. Most courses only describe the pipeline; here
 * the learner types a sentence and watches it become sentences, then tokens,
 * then normalized tokens. The transforms are real (if intentionally simplified)
 * and run entirely client-side — no server, no model — so the cost of every
 * stage is visible and honest about its limits.
 */
const CONTRACTIONS: Record<string, string> = {
  "isn't": 'is not',
  "didn't": 'did not',
  "don't": 'do not',
  "can't": 'cannot',
  "won't": 'will not',
  "i'm": 'i am',
  "it's": 'it is',
  "he's": 'he is',
  "she's": 'she is',
  "they're": 'they are',
  "we're": 'we are',
  "you're": 'you are',
  "n't": 'not',
};

// Naive sentence splitter that protects common abbreviations and decimals.
function splitSentences(text: string): string[] {
  const protectedText = text
    .replace(/\b(Dr|Mr|Mrs|Ms|Prof|Sr|Jr|St|vs|etc|Inc|U\.S\.A|U\.S)\./g, '$1<DOT>')
    .replace(/(\d)\.(\d)/g, '$1<DOT>$2');
  return protectedText
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/<DOT>/g, '.').trim())
    .filter(Boolean);
}

// Tokenizer: words (incl. internal apostrophes) and standalone punctuation.
function tokenize(sentence: string): string[] {
  const matches = sentence.match(/[A-Za-z]+(?:['’][A-Za-z]+)?|\d+(?:\.\d+)?|[^\sA-Za-z\d]/g);
  return matches ?? [];
}

function normalize(tokens: string[]): string[] {
  const out: string[] = [];
  for (const raw of tokens) {
    if (/^[^A-Za-z\d]$/.test(raw)) continue; // drop punctuation
    let t = raw.toLowerCase().replace(/[’]/g, "'");
    if (CONTRACTIONS[t]) {
      out.push(...CONTRACTIONS[t].split(' '));
    } else {
      out.push(t);
    }
  }
  return out;
}

const EXAMPLES = [
  "Dr. Smith isn't home. Call him at 3.14 today!",
  'I saw the man with the telescope.',
  'New York City never sleeps — it’s electric.',
];

export default function PipelinePlayground() {
  const [text, setText] = useState(EXAMPLES[0]);

  const { sentences, tokens, normalized } = useMemo(() => {
    const sents = splitSentences(text);
    const toks = sents.flatMap(tokenize);
    const norm = normalize(toks);
    return { sentences: sents, tokens: toks, normalized: norm };
  }, [text]);

  return (
    <div className="plg">
      <label className="plg-label" htmlFor="plg-input">
        Type any sentence &mdash; watch it flow through the pipeline:
      </label>
      <textarea
        id="plg-input"
        className="plg-input"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />

      <div className="plg-examples">
        <span className="plg-examples-label">Try:</span>
        {EXAMPLES.map((ex) => (
          <button key={ex} className="plg-example" onClick={() => setText(ex)}>
            {ex.length > 28 ? ex.slice(0, 26) + '…' : ex}
          </button>
        ))}
      </div>

      <ol className="plg-stages">
        <li className="plg-stage">
          <div className="plg-stage-head">
            <span className="plg-stage-num">1</span>
            <span className="plg-stage-name">Sentence splitting</span>
            <span className="plg-stage-count">{sentences.length} sentence{sentences.length === 1 ? '' : 's'}</span>
          </div>
          <div className="plg-chips">
            {sentences.map((s, i) => (
              <span className="plg-chip plg-chip-sent" key={i}>{s}</span>
            ))}
          </div>
        </li>

        <li className="plg-stage">
          <div className="plg-stage-head">
            <span className="plg-stage-num">2</span>
            <span className="plg-stage-name">Tokenization</span>
            <span className="plg-stage-count">{tokens.length} tokens</span>
          </div>
          <div className="plg-chips">
            {tokens.map((t, i) => (
              <span className={`plg-chip${/^[^A-Za-z\d]$/.test(t) ? ' plg-chip-punct' : ''}`} key={i}>{t}</span>
            ))}
          </div>
        </li>

        <li className="plg-stage">
          <div className="plg-stage-head">
            <span className="plg-stage-num">3</span>
            <span className="plg-stage-name">Normalization</span>
            <span className="plg-stage-count">{normalized.length} terms</span>
          </div>
          <div className="plg-chips">
            {normalized.map((t, i) => (
              <span className="plg-chip plg-chip-norm" key={i}>{t}</span>
            ))}
          </div>
        </li>
      </ol>

      <p className="plg-note">
        This runs <strong>entirely in your browser</strong> with a few dozen
        lines of plain code &mdash; no model, no server. It is deliberately
        simplified: notice how the splitter must special-case &ldquo;Dr.&rdquo;
        and &ldquo;3.14&rdquo;, and how &ldquo;isn&rsquo;t&rdquo; expands to
        &ldquo;is not&rdquo;. Every shortcut here is a real engineering decision
        that production systems must get right.
      </p>
    </div>
  );
}
