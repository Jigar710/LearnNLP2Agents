import { useEffect, useRef, useState } from 'react';
import '../../styles/diagrams.css';

/**
 * AgentLoop (PRD §15.8, Topic 40) — animated ReAct loop.
 * Thought → Action → Observation cycling for an example task; cards expand at
 * each step. Action steps highlight the tool call. Play / Step / Reset.
 * Theme-aware.
 */
type StepType = 'thought' | 'action' | 'observation' | 'answer';
interface Step {
  type: StepType;
  text: string;
  tool?: string;
}

const TASK = "What is the capital of France's largest city?";

const STEPS: Step[] = [
  { type: 'thought', text: "First I need to find France's largest city." },
  { type: 'action', text: 'Search("largest city in France")', tool: 'web_search' },
  { type: 'observation', text: 'Paris is the largest city in France, population ~2.1M.' },
  { type: 'thought', text: 'The largest city is Paris. Paris is itself the capital of France, so the answer is Paris.' },
  { type: 'action', text: 'Search("capital of France")', tool: 'web_search' },
  { type: 'observation', text: 'The capital of France is Paris.' },
  { type: 'answer', text: 'Paris.' },
];

const LABEL: Record<StepType, string> = {
  thought: 'Thought',
  action: 'Action',
  observation: 'Observation',
  answer: 'Answer',
};

export default function AgentLoop() {
  const [shown, setShown] = useState(1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setShown((s) => {
        if (s >= STEPS.length) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1100);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  function step() {
    setPlaying(false);
    setShown((s) => Math.min(s + 1, STEPS.length));
  }
  function reset() {
    setPlaying(false);
    setShown(1);
  }

  return (
    <div className="agent">
      <div className="agent-task">
        <span className="agent-task-label">Task</span>
        {TASK}
      </div>

      <div className="agent-controls">
        <button className="agent-btn" onClick={() => setPlaying((p) => !p)}>{playing ? '⏸ Pause' : '▶ Play'}</button>
        <button className="agent-btn" onClick={step} disabled={shown >= STEPS.length}>Step →</button>
        <button className="agent-btn" onClick={reset}>↻ Reset</button>
      </div>

      <ol className="agent-steps">
        {STEPS.slice(0, shown).map((s, i) => (
          <li key={i} className={`agent-step agent-${s.type}${i === shown - 1 ? ' is-latest' : ''}`}>
            <span className="agent-step-label">{LABEL[s.type]}</span>
            <span className="agent-step-text">
              {s.text}
              {s.tool && <span className="agent-tool">🔧 {s.tool}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
