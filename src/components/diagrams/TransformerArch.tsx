import { useState } from 'react';
import '../../styles/diagrams.css';

/**
 * TransformerArch (PRD §15.4, Topic 17) — interactive full Transformer.
 * Click any block to expand its description + formula in the side panel; the
 * toggle highlights the encoder path, decoder path, or cross-attention.
 * Theme-aware via CSS custom properties; stacks on small screens.
 */
type Group = 'encoder' | 'decoder' | 'cross';
interface Block {
  id: string;
  label: string;
  col: 'enc' | 'dec';
  group: Group;
  desc: string;
  formula: string;
}

const ENC: Omit<Block, 'col'>[] = [
  { id: 'emb', label: 'Input Embedding', group: 'encoder', desc: 'Maps each input token id to a learned d_model-dimensional vector.', formula: 'token id → R^{d_model}' },
  { id: 'pos', label: '+ Positional Encoding', group: 'encoder', desc: 'Adds order information since self-attention is permutation-invariant.', formula: 'PE(pos,2i)=sin(pos/10000^{2i/d})' },
  { id: 'mha', label: 'Multi-Head Self-Attention', group: 'encoder', desc: 'Each token attends to every token in the sequence (bidirectional).', formula: 'softmax(QKᵀ/√d_k)·V' },
  { id: 'an1', label: 'Add & Norm', group: 'encoder', desc: 'Residual connection + layer normalization for stable gradients.', formula: 'LayerNorm(x + Sublayer(x))' },
  { id: 'ff', label: 'Feed-Forward', group: 'encoder', desc: 'Position-wise MLP, expand to d_ff then project back (≈4× width).', formula: 'max(0, xW₁+b₁)W₂+b₂' },
  { id: 'an2', label: 'Add & Norm', group: 'encoder', desc: 'Second residual + layer norm closing the encoder layer (×N).', formula: 'LayerNorm(x + FFN(x))' },
];

const DEC: Omit<Block, 'col'>[] = [
  { id: 'demb', label: 'Output Embedding', group: 'decoder', desc: 'Embeds the (shifted-right) target tokens during training/generation.', formula: 'token id → R^{d_model}' },
  { id: 'dpos', label: '+ Positional Encoding', group: 'decoder', desc: 'Same positional signal added to the decoder inputs.', formula: 'PE(pos,2i+1)=cos(pos/10000^{2i/d})' },
  { id: 'mmha', label: 'Masked Self-Attention', group: 'decoder', desc: 'Causal mask blocks attention to future positions so generation stays autoregressive.', formula: 'scores[i<j] = −∞ before softmax' },
  { id: 'dan1', label: 'Add & Norm', group: 'decoder', desc: 'Residual + layer norm after masked attention.', formula: 'LayerNorm(x + MaskedAttn(x))' },
  { id: 'cross', label: 'Cross-Attention', group: 'cross', desc: 'Decoder attends to the encoder output: queries come from the decoder, keys & values from the encoder.', formula: 'Q=decoder · K,V=encoder' },
  { id: 'dan2', label: 'Add & Norm', group: 'decoder', desc: 'Residual + layer norm after cross-attention.', formula: 'LayerNorm(x + CrossAttn(x))' },
  { id: 'dff', label: 'Feed-Forward', group: 'decoder', desc: 'Position-wise MLP, identical form to the encoder FFN.', formula: 'max(0, xW₁+b₁)W₂+b₂' },
  { id: 'dan3', label: 'Add & Norm', group: 'decoder', desc: 'Final residual + layer norm closing the decoder layer (×N).', formula: 'LayerNorm(x + FFN(x))' },
  { id: 'lin', label: 'Linear', group: 'decoder', desc: 'Projects the decoder output to vocabulary-sized logits.', formula: 'logits = xW + b' },
  { id: 'soft', label: 'Softmax', group: 'decoder', desc: 'Converts logits to a probability distribution over the next token.', formula: 'p = softmax(logits)' },
];

const BW = 150;
const BH = 30;
const GAP = 8;
const TOP = 28;
const ENC_X = 14;
const DEC_X = 196;
const SVG_W = DEC_X + BW + 14;

function stack(list: Omit<Block, 'col'>[], col: 'enc' | 'dec'): (Block & { x: number; y: number })[] {
  const x = col === 'enc' ? ENC_X : DEC_X;
  return list.map((b, i) => ({ ...b, col, x, y: TOP + i * (BH + GAP) }));
}

const ENC_BLOCKS = stack(ENC, 'enc');
const DEC_BLOCKS = stack(DEC, 'dec');
const ALL = [...ENC_BLOCKS, ...DEC_BLOCKS];
const SVG_H = TOP + DEC.length * (BH + GAP) + 20;

const TOGGLES: { key: 'all' | Group; label: string }[] = [
  { key: 'all', label: 'Full model' },
  { key: 'encoder', label: 'Encoder' },
  { key: 'decoder', label: 'Decoder' },
  { key: 'cross', label: 'Cross-attention' },
];

export default function TransformerArch() {
  const [selected, setSelected] = useState<string | null>(null);
  const [path, setPath] = useState<'all' | Group>('all');

  const sel = ALL.find((b) => b.id === selected) ?? null;
  const crossBlock = DEC_BLOCKS.find((b) => b.id === 'cross')!;
  const encOut = ENC_BLOCKS[ENC_BLOCKS.length - 1];

  const isDim = (b: Block) => path !== 'all' && b.group !== path;

  return (
    <div className="tarch">
      <div className="tarch-controls">
        {TOGGLES.map((t) => (
          <button
            key={t.key}
            className={`tarch-toggle${path === t.key ? ' is-active' : ''}`}
            onClick={() => setPath(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tarch-layout">
        <div className="tarch-stage">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" role="img" aria-label="Transformer architecture">
            <text className="tarch-col-label" x={ENC_X + BW / 2} y={16} textAnchor="middle">Encoder ×N</text>
            <text className="tarch-col-label" x={DEC_X + BW / 2} y={16} textAnchor="middle">Decoder ×N</text>

            {/* cross-attention arrow: encoder output → cross block */}
            <line
              x1={encOut.x + BW}
              y1={encOut.y + BH / 2}
              x2={crossBlock.x}
              y2={crossBlock.y + BH / 2}
              stroke={path === 'all' || path === 'cross' ? '#7C3AED' : 'var(--border-color)'}
              strokeWidth={1.6}
              strokeDasharray="4 3"
              markerEnd="url(#tarch-arrow)"
            />
            <defs>
              <marker id="tarch-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0 0l6 3-6 3z" fill={path === 'all' || path === 'cross' ? '#7C3AED' : 'var(--border-color)'} />
              </marker>
            </defs>

            {ALL.map((b) => {
              const active = b.id === selected;
              const dim = isDim(b);
              return (
                <g
                  key={b.id}
                  className={`tarch-block${dim ? ' tarch-dim' : ''}`}
                  onClick={() => setSelected(b.id)}
                >
                  <rect
                    className="tarch-block-rect"
                    x={b.x}
                    y={b.y}
                    width={BW}
                    height={BH}
                    rx={6}
                    fill={active ? 'color-mix(in srgb, #7C3AED 22%, var(--bg-secondary))' : 'var(--bg-secondary)'}
                    stroke={active ? '#7C3AED' : 'var(--border-color)'}
                    strokeWidth={active ? 2 : 1}
                  />
                  <text className="tarch-block-label" x={b.x + BW / 2} y={b.y + BH / 2 + 4} textAnchor="middle">
                    {b.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="tarch-info">
          {sel ? (
            <>
              <h4>{sel.label}</h4>
              <p>{sel.desc}</p>
              <p className="tarch-formula"><code>{sel.formula}</code></p>
            </>
          ) : (
            <p className="tarch-info-hint">Click any block to see what it does and its formula. Use the toggles to trace the encoder, decoder, or cross-attention path.</p>
          )}
        </div>
      </div>
    </div>
  );
}
