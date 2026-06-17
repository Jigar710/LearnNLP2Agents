import { useState } from 'react';
import '../../styles/diagrams.css';

/**
 * AttentionHeatmap (PRD §15.3, Topic 12) — self-attention weight matrix for a
 * fixed sentence. Color: low = blue, high = warm. Click a token (left axis) to
 * highlight its attention row; the slider switches between pre-loaded heads.
 */
const TOKENS = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
const N = TOKENS.length;

const HEAD_NAMES = ['Head 1 · local', 'Head 2 · subject', 'Head 3 · previous'];

// Raw attention "logits" per head; rows are normalized to sum to 1 below.
const RAW: number[][][] = [
  // Head 1 — local / self attention
  [
    [6, 2, 1, 0, 0, 0],
    [3, 6, 2, 0, 0, 0],
    [1, 3, 6, 2, 0, 0],
    [0, 1, 3, 6, 2, 0],
    [0, 0, 1, 3, 6, 2],
    [0, 0, 0, 1, 3, 6],
  ],
  // Head 2 — everything attends to the subject "cat" (index 1)
  [
    [2, 5, 1, 0, 1, 0],
    [1, 6, 1, 0, 0, 0],
    [1, 6, 2, 0, 0, 0],
    [0, 5, 1, 2, 0, 0],
    [0, 5, 1, 0, 2, 0],
    [0, 6, 1, 0, 0, 2],
  ],
  // Head 3 — attend to previous token
  [
    [5, 0, 0, 0, 0, 0],
    [6, 1, 0, 0, 0, 0],
    [0, 6, 1, 0, 0, 0],
    [0, 0, 6, 1, 0, 0],
    [0, 0, 0, 6, 1, 0],
    [0, 0, 0, 0, 6, 1],
  ],
];

function softmaxRows(m: number[][]): number[][] {
  return m.map((row) => {
    const exps = row.map((v) => Math.exp(v));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  });
}
const HEADS = RAW.map(softmaxRows);

function valueToColor(v: number): string {
  const blue = [37, 99, 235];
  const orange = [234, 88, 12];
  const c = blue.map((b, i) => Math.round(b + (orange[i] - b) * v));
  const alpha = 0.15 + 0.85 * v;
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

const CELL = 46;
const LABEL = 44;

export default function AttentionHeatmap() {
  const [head, setHead] = useState(0);
  const [row, setRow] = useState<number | null>(null);
  const matrix = HEADS[head];
  const W = LABEL + N * CELL + 8;
  const Hsvg = LABEL + N * CELL + 8;

  return (
    <div className="attn">
      <div className="attn-controls">
        <label className="attn-head-label">
          {HEAD_NAMES[head]}
          <input
            type="range"
            min={0}
            max={HEADS.length - 1}
            value={head}
            onChange={(e) => setHead(Number(e.target.value))}
            aria-label="Attention head"
          />
        </label>
      </div>

      <div className="attn-stage">
        <svg viewBox={`0 0 ${W} ${Hsvg}`} width="100%" role="img" aria-label="Attention weight matrix">
          {/* top axis (keys) */}
          {TOKENS.map((t, j) => (
            <text
              key={`top-${j}`}
              className="attn-axis"
              x={LABEL + j * CELL + CELL / 2}
              y={LABEL - 12}
              textAnchor="middle"
            >
              {t}
            </text>
          ))}
          {/* left axis (queries) — clickable */}
          {TOKENS.map((t, i) => (
            <text
              key={`left-${i}`}
              className={`attn-axis${row === i ? ' is-active' : ''}`}
              x={LABEL - 8}
              y={LABEL + i * CELL + CELL / 2 + 4}
              textAnchor="end"
              style={{ cursor: 'pointer' }}
              onClick={() => setRow(row === i ? null : i)}
            >
              {t}
            </text>
          ))}
          {/* cells */}
          {matrix.map((r, i) =>
            r.map((v, j) => (
              <g key={`c-${i}-${j}`}>
                <rect
                  className="attn-cell"
                  x={LABEL + j * CELL}
                  y={LABEL + i * CELL}
                  width={CELL}
                  height={CELL}
                  fill={valueToColor(v)}
                  opacity={row === null || row === i ? 1 : 0.25}
                  onClick={() => setRow(row === i ? null : i)}
                >
                  <title>{`${TOKENS[i]} → ${TOKENS[j]}: ${v.toFixed(2)}`}</title>
                </rect>
                {(row === i || (row === null && v > 0.25)) && (
                  <text
                    x={LABEL + j * CELL + CELL / 2}
                    y={LABEL + i * CELL + CELL / 2 + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fill={v > 0.5 ? '#fff' : 'var(--text-secondary)'}
                    pointerEvents="none"
                  >
                    {v.toFixed(2)}
                  </text>
                )}
              </g>
            ))
          )}
        </svg>
      </div>

      <p className="attn-hint">
        {row === null
          ? 'Each row is one token attending to all tokens (rows sum to 1). Click a row label to focus it; drag the slider for different heads.'
          : `“${TOKENS[row]}” attends most to “${TOKENS[matrix[row].indexOf(Math.max(...matrix[row]))]}”.`}
      </p>
    </div>
  );
}
