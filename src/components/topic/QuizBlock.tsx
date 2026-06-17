import { useState } from 'react';

/**
 * QuizBlock (PRD §11.5 / Step 6.6) — self-check multiple choice.
 * Instant feedback on click (no submit, no scoring): correct → green,
 * wrong → red plus the correct answer, with an explanation. "Try another
 * question" cycles through the set. Purely client-side learning aid.
 */
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
interface Props {
  questions: QuizQuestion[];
}

export default function QuizBlock({ questions }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  if (!questions || questions.length === 0) return null;
  const q = questions[qIndex];
  const revealed = selected !== null;
  const isCorrect = selected === q.correctIndex;

  function choose(i: number) {
    if (selected === null) setSelected(i);
  }
  function next() {
    setSelected(null);
    setQIndex((qIndex + 1) % questions.length);
  }

  return (
    <div className="quiz">
      <div className="quiz-head">
        <span className="quiz-q">{q.question}</span>
        {questions.length > 1 && (
          <span className="quiz-count">
            {qIndex + 1} / {questions.length}
          </span>
        )}
      </div>

      <ul className="quiz-options" role="list">
        {q.options.map((opt, i) => {
          let state = '';
          if (revealed) {
            if (i === q.correctIndex) state = ' is-correct';
            else if (i === selected) state = ' is-wrong';
            else state = ' is-dim';
          }
          return (
            <li key={i}>
              <button
                type="button"
                className={`quiz-option${state}`}
                onClick={() => choose(i)}
                disabled={revealed}
                aria-pressed={selected === i}
              >
                <span className="quiz-marker" aria-hidden="true">
                  {revealed && i === q.correctIndex
                    ? '✓'
                    : revealed && i === selected
                      ? '✕'
                      : String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="quiz-feedback" aria-live="polite">
        {revealed && (
          <div className={`quiz-explain ${isCorrect ? 'ok' : 'no'}`}>
            <strong>{isCorrect ? 'Correct! ' : 'Not quite. '}</strong>
            {!isCorrect && (
              <span className="quiz-answer">
                The answer is <em>{q.options[q.correctIndex]}</em>.{' '}
              </span>
            )}
            {q.explanation}
          </div>
        )}
      </div>

      {revealed && questions.length > 1 && (
        <button type="button" className="quiz-next" onClick={next}>
          Try another question →
        </button>
      )}
    </div>
  );
}
