/**
 * progress.ts — client-side progress tracking (PRD §17 Step 10 / F1).
 * Backed by localStorage; interoperates with the inline scripts in the
 * Sidebar, TopicLayout, curriculum, and home pages via the same keys and the
 * "nlp2agents:progress" custom event.
 */
import { TOTAL_TOPICS } from '../data/curriculum';

const KEY = 'nlp2agents-progress';
const LAST = 'nlp2agents-last';

/** All completed topic slugs (deduped). */
export function getCompletedTopics(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? Array.from(new Set(raw)) : [];
  } catch {
    return [];
  }
}

function write(list: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(new Set(list))));
    // Notify same-tab listeners (other tabs use the native 'storage' event).
    document.dispatchEvent(new CustomEvent('nlp2agents:progress'));
  } catch {
    /* ignore storage errors (private mode, quota) */
  }
}

/** Mark a topic complete (idempotent). */
export function markTopicComplete(slug: string): void {
  const list = getCompletedTopics();
  if (!list.includes(slug)) {
    list.push(slug);
    write(list);
  }
}

/** Remove a topic from the completed set (idempotent). */
export function unmarkTopicComplete(slug: string): void {
  const list = getCompletedTopics().filter((s) => s !== slug);
  write(list);
}

/** Toggle completion; returns the new state. */
export function toggleTopicComplete(slug: string): boolean {
  if (isTopicComplete(slug)) {
    unmarkTopicComplete(slug);
    return false;
  }
  markTopicComplete(slug);
  return true;
}

/** Whether a topic is marked complete. */
export function isTopicComplete(slug: string): boolean {
  return getCompletedTopics().includes(slug);
}

/** Overall progress: completed count, total, and rounded percentage. */
export function getProgress(): { completed: number; total: number; percentage: number } {
  const completed = getCompletedTopics().length;
  const total = TOTAL_TOPICS;
  return {
    completed,
    total,
    percentage: total ? Math.round((completed / total) * 100) : 0,
  };
}

/** Slug of the last visited topic, or null. */
export function getLastVisited(): string | null {
  try {
    return localStorage.getItem(LAST);
  } catch {
    return null;
  }
}

/** Record the last visited topic (for the homepage "Resume Reading" button). */
export function setLastVisited(slug: string): void {
  try {
    localStorage.setItem(LAST, slug);
  } catch {
    /* ignore */
  }
}
