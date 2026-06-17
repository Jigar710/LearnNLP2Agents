import { useEffect, useRef, useState } from 'react';
import '../../styles/diagrams.css';

/**
 * RagPipeline (PRD §15.7, Topic 33) — animated RAG flow.
 * Query → Embed → DB Search → Retrieve → Prompt Builder → LLM → Answer.
 * Play/Pause advances the active stage; click a stage to inspect what happens
 * plus the example data flowing through. Theme-aware.
 */
interface Stage {
  name: string;
  desc: string;
  data: string;
}

const STAGES: Stage[] = [
  { name: 'Query', desc: 'The user question enters the pipeline.', data: '"What is RAG?"' },
  { name: 'Embed', desc: 'The query is encoded into a dense vector by an embedding model.', data: '[0.12, -0.08, 0.41, …]' },
  { name: 'DB Search', desc: 'Approximate nearest-neighbor search over the vector store finds similar chunks.', data: 'top-k by cosine similarity' },
  { name: 'Retrieve', desc: 'The most relevant document chunks are pulled back.', data: '["RAG = retrieval + generation…", "Lewis et al. 2020…"]' },
  { name: 'Prompt Builder', desc: 'Retrieved context is injected into the prompt template alongside the question.', data: 'Context: {chunks}\\nQ: What is RAG?' },
  { name: 'LLM', desc: 'The LLM reads the grounded prompt and writes an answer.', data: 'generate(prompt)' },
  { name: 'Answer', desc: 'A grounded, citable response is returned to the user.', data: '"RAG retrieves documents and conditions generation on them."' },
];

export default function RagPipeline() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % STAGES.length);
    }, 1100);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  function pick(i: number) {
    setPlaying(false);
    setActive(i);
  }

  const stage = STAGES[active];

  return (
    <div className="rag">
      <div className="rag-controls">
        <button className="rag-play" onClick={() => setPlaying((p) => !p)}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <span className="rag-step-label">Stage {active + 1} / {STAGES.length}</span>
      </div>

      <div className="rag-flow">
        {STAGES.map((s, i) => (
          <div className="rag-node-wrap" key={s.name}>
            <button
              className={`rag-node${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
              onClick={() => pick(i)}
            >
              {s.name}
            </button>
            {i < STAGES.length - 1 && (
              <span className={`rag-arrow${i < active ? ' is-done' : ''}`} aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>

      <div className="rag-detail">
        <h4 className="rag-detail-title">{stage.name}</h4>
        <p className="rag-detail-desc">{stage.desc}</p>
        <code className="rag-detail-data">{stage.data}</code>
      </div>
    </div>
  );
}
