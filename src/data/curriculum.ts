/**
 * curriculum.ts — Single source of truth for phases, the 48 topics, and
 * ordering/navigation helpers (PRD §17 Step 3.1).
 *
 * Topic flags:
 *   hasCode            — topic ships at least one runnable Python example
 *   hasMath            — topic has a KaTeX "The Mathematics" section
 *   hasInteractiveDemo — topic embeds a React diagram (src/components/diagrams)
 */

export interface Topic {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  phase: number;
  readingTime: number; // estimated minutes (refined from word count at build time, F6)
  prerequisites: string[]; // slugs of prerequisite topics
  hasCode: boolean;
  hasMath: boolean;
  hasInteractiveDemo: boolean;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string; // main accent (hex)
  colorLight: string;
  colorDark: string;
  cssVar: string; // e.g. "var(--phase-1)"
  topicCount: number;
  skills: string[]; // "What you'll learn" bullets (PRD §8.3 / Step 8.3)
}

/* ============================================================
   PHASES
   ============================================================ */
export const PHASES: Phase[] = [
  {
    id: 1,
    title: 'NLP Foundations',
    subtitle: 'From raw text to sequence models',
    description:
      'The classical NLP stack: linguistics, corpora and tokenization, vector representations, word embeddings, language modeling, and the recurrent sequence models that came before attention.',
    color: '#0D9488',
    colorLight: '#CCFBF1',
    colorDark: '#042F2E',
    cssVar: 'var(--phase-1)',
    topicCount: 10,
    skills: [
      'Understand the full NLP pipeline and why language is hard for machines',
      'Tokenize text and build vocabularies from a corpus',
      'Represent text with Bag-of-Words and TF-IDF',
      'Train and reason about word embeddings (Word2Vec, GloVe, FastText)',
      'Build n-gram language models and measure perplexity',
      'Implement RNNs, LSTMs, GRUs, and Seq2Seq architectures',
    ],
  },
  {
    id: 2,
    title: 'Attention & Transformers',
    subtitle: 'The architecture that changed everything',
    description:
      'Attention mechanisms and the Transformer: from Bahdanau/Luong attention through scaled dot-product self-attention, multi-head attention, positional encoding, the encoder/decoder stacks, modern subword tokenization, and the BERT/GPT paradigms.',
    color: '#7C3AED',
    colorLight: '#EDE9FE',
    colorDark: '#2E1065',
    cssVar: 'var(--phase-2)',
    topicCount: 10,
    skills: [
      'Explain why attention solved the Seq2Seq bottleneck',
      'Derive scaled dot-product and multi-head self-attention',
      'Add position information with sinusoidal & learned encodings',
      'Build Transformer encoder and decoder layers from scratch',
      'Tokenize with BPE, WordPiece, and SentencePiece',
      'Contrast BERT (encoder) vs GPT (decoder) pre-training',
    ],
  },
  {
    id: 3,
    title: 'LLMs — Training to Alignment',
    subtitle: 'Scaling, fine-tuning, and aligning large models',
    description:
      'How large language models are built and shaped: the GPT/Claude evolution, encoder-decoder LLMs, pre-training objectives, scaling laws, instruction tuning, RLHF and DPO alignment, parameter-efficient fine-tuning (LoRA/QLoRA), and quantization.',
    color: '#2563EB',
    colorLight: '#DBEAFE',
    colorDark: '#1E3A8A',
    cssVar: 'var(--phase-3)',
    topicCount: 10,
    skills: [
      'Trace the scaling story from GPT-2 to GPT-4 and Claude',
      'Compare pre-training objectives (CLM, MLM, span corruption)',
      'Apply scaling laws and Chinchilla-optimal training',
      'Instruction-tune and align models with RLHF and DPO',
      'Fine-tune efficiently with LoRA and QLoRA',
      'Quantize models (INT8/INT4/GGUF) for consumer hardware',
    ],
  },
  {
    id: 4,
    title: 'Applied LLM Engineering',
    subtitle: 'Prompting, RAG, evaluation, and serving',
    description:
      'Putting LLMs to work: prompt engineering and advanced reasoning, Retrieval-Augmented Generation end to end (chunking, embeddings, vector databases, advanced retrieval), rigorous evaluation, and inference optimization for production.',
    color: '#D97706',
    colorLight: '#FEF3C7',
    colorDark: '#78350F',
    cssVar: 'var(--phase-4)',
    topicCount: 8,
    skills: [
      'Design zero-shot, few-shot, and chain-of-thought prompts',
      'Apply self-consistency, Tree-of-Thoughts, and ReAct',
      'Build RAG pipelines with chunking and embeddings',
      'Choose and query vector databases and retrieval methods',
      'Improve recall/precision with re-ranking, HyDE, and query expansion',
      'Evaluate LLM/RAG systems and optimize inference (KV cache, vLLM)',
    ],
  },
  {
    id: 5,
    title: 'Agents & Agentic AI',
    subtitle: 'Autonomous, tool-using, multi-step systems',
    description:
      'From a single tool-using LLM to production agentic systems: agent architectures, the ReAct pattern, function calling, LangChain and LangGraph, agent memory, multi-agent orchestration, planning, evaluation/observability, and deployment best practices.',
    color: '#EA580C',
    colorLight: '#FFEDD5',
    colorDark: '#7C2D12',
    cssVar: 'var(--phase-5)',
    topicCount: 10,
    skills: [
      'Distinguish agents from chatbots and map agent anatomy',
      'Implement the ReAct reason-act-observe loop',
      'Connect LLMs to tools via function calling',
      'Build stateful agents with LangChain and LangGraph',
      'Give agents memory and orchestrate multi-agent teams',
      'Evaluate, observe, and deploy production-grade agents',
    ],
  },
];

/* ============================================================
   TOPICS (48)
   ============================================================ */
export const TOPICS: Topic[] = [
  // ---------- Phase 1: NLP Foundations ----------
  {
    id: 1,
    slug: 'intro-to-nlp',
    title: 'Introduction to NLP & Pipeline',
    subtitle: "What NLP is, why it's hard, and how the full pipeline works",
    phase: 1,
    readingTime: 10,
    prerequisites: [],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: true,
  },
  {
    id: 2,
    slug: 'linguistics-basics',
    title: 'Linguistics Basics — POS, NER & Parsing',
    subtitle: 'The linguistic building blocks every NLP engineer should know',
    phase: 1,
    readingTime: 12,
    prerequisites: ['intro-to-nlp'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 3,
    slug: 'corpus-tokens-vocabulary',
    title: 'Corpus, Tokens & Vocabulary',
    subtitle: 'How text becomes structure — the foundation of every NLP system',
    phase: 1,
    readingTime: 13,
    prerequisites: ['intro-to-nlp'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 4,
    slug: 'text-preprocessing',
    title: 'Text Preprocessing Techniques',
    subtitle: 'Cleaning and normalizing text before any model sees it',
    phase: 1,
    readingTime: 12,
    prerequisites: ['corpus-tokens-vocabulary'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 5,
    slug: 'bag-of-words-tfidf',
    title: 'Bag of Words & TF-IDF Representation',
    subtitle: 'Turning words into numbers — classic vector representations',
    phase: 1,
    readingTime: 13,
    prerequisites: ['corpus-tokens-vocabulary', 'text-preprocessing'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 6,
    slug: 'word2vec',
    title: 'Word Embeddings — Word2Vec (CBOW & Skip-gram)',
    subtitle: 'Words as dense vectors — capturing meaning in space',
    phase: 1,
    readingTime: 16,
    prerequisites: ['bag-of-words-tfidf'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: true,
  },
  {
    id: 7,
    slug: 'glove-fasttext',
    title: 'Word Embeddings — GloVe & FastText',
    subtitle: 'Global co-occurrence and subword embeddings — two powerful alternatives',
    phase: 1,
    readingTime: 14,
    prerequisites: ['word2vec'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 8,
    slug: 'language-modeling-perplexity',
    title: 'Language Modeling & Perplexity',
    subtitle: 'Teaching a machine the probability of language',
    phase: 1,
    readingTime: 15,
    prerequisites: ['corpus-tokens-vocabulary'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 9,
    slug: 'rnn-lstm-gru',
    title: 'Sequence Models — RNN, LSTM & GRU',
    subtitle: 'Processing text sequentially — the era before attention',
    phase: 1,
    readingTime: 18,
    prerequisites: ['language-modeling-perplexity'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 10,
    slug: 'seq2seq',
    title: 'Seq2Seq Architecture',
    subtitle: 'The architecture behind translation, summarization, and chatbots',
    phase: 1,
    readingTime: 16,
    prerequisites: ['rnn-lstm-gru'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },

  // ---------- Phase 2: Attention & Transformers ----------
  {
    id: 11,
    slug: 'attention-mechanism',
    title: 'Attention Mechanism — Bahdanau & Luong',
    subtitle: 'Letting the decoder look at the entire source sequence',
    phase: 2,
    readingTime: 15,
    prerequisites: ['seq2seq'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 12,
    slug: 'self-attention',
    title: 'Scaled Dot-Product Self-Attention',
    subtitle: 'Every token attending to every other token simultaneously',
    phase: 2,
    readingTime: 16,
    prerequisites: ['attention-mechanism'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: true,
  },
  {
    id: 13,
    slug: 'multi-head-attention',
    title: 'Multi-Head Attention',
    subtitle: 'Running attention in parallel across multiple subspaces',
    phase: 2,
    readingTime: 13,
    prerequisites: ['self-attention'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 14,
    slug: 'positional-encoding',
    title: 'Positional Encoding',
    subtitle: 'Giving the Transformer a sense of position',
    phase: 2,
    readingTime: 13,
    prerequisites: ['self-attention'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 15,
    slug: 'transformer-encoder',
    title: 'Transformer Encoder',
    subtitle: 'The BERT side — encoding bidirectional context',
    phase: 2,
    readingTime: 14,
    prerequisites: ['multi-head-attention', 'positional-encoding'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 16,
    slug: 'transformer-decoder',
    title: 'Transformer Decoder',
    subtitle: 'The GPT side — generating text autoregressively',
    phase: 2,
    readingTime: 14,
    prerequisites: ['transformer-encoder'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 17,
    slug: 'transformer-architecture',
    title: 'Full Transformer — "Attention is All You Need"',
    subtitle: 'The complete architecture that changed everything',
    phase: 2,
    readingTime: 20,
    prerequisites: ['transformer-encoder', 'transformer-decoder'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: true,
  },
  {
    id: 18,
    slug: 'tokenization-bpe',
    title: 'Tokenization — BPE, WordPiece & SentencePiece',
    subtitle: 'The unsung hero — how text becomes tokens for modern LLMs',
    phase: 2,
    readingTime: 16,
    prerequisites: ['corpus-tokens-vocabulary'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 19,
    slug: 'bert',
    title: 'BERT — Bidirectional Pre-training',
    subtitle: 'Pre-training on masked language modeling to learn deep context',
    phase: 2,
    readingTime: 17,
    prerequisites: ['transformer-encoder'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: true,
  },
  {
    id: 20,
    slug: 'gpt-autoregressive-lm',
    title: 'GPT — Autoregressive Language Modeling',
    subtitle: 'Predict the next token — the paradigm that powers all LLMs',
    phase: 2,
    readingTime: 16,
    prerequisites: ['transformer-decoder'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: true,
  },

  // ---------- Phase 3: LLMs — Training to Alignment ----------
  {
    id: 21,
    slug: 'llm-evolution',
    title: 'LLM Evolution — GPT-2, GPT-3, GPT-4 & Claude',
    subtitle: 'From 117M to 1 trillion parameters — the scaling revolution',
    phase: 3,
    readingTime: 15,
    prerequisites: ['gpt-autoregressive-lm'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 22,
    slug: 't5-bart-encoder-decoder',
    title: 'T5, BART & Encoder-Decoder LLMs',
    subtitle: 'When you need both understanding AND generation',
    phase: 3,
    readingTime: 13,
    prerequisites: ['transformer-architecture'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 23,
    slug: 'pretraining-objectives',
    title: 'Pre-training Objectives — MLM, CLM & Span Corruption',
    subtitle: 'The self-supervised tasks that teach LLMs everything they know',
    phase: 3,
    readingTime: 14,
    prerequisites: ['bert', 'gpt-autoregressive-lm'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 24,
    slug: 'scaling-laws',
    title: 'Scaling Laws & Emergent Abilities',
    subtitle: 'The math behind "bigger is better" — and when things suddenly work',
    phase: 3,
    readingTime: 14,
    prerequisites: ['llm-evolution'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 25,
    slug: 'instruction-tuning-flan',
    title: 'Instruction Tuning & FLAN',
    subtitle: 'Teaching LLMs to follow instructions through supervised fine-tuning',
    phase: 3,
    readingTime: 13,
    prerequisites: ['gpt-autoregressive-lm'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 26,
    slug: 'rlhf',
    title: 'RLHF — Reward Modeling & PPO',
    subtitle: 'Aligning LLMs to human preferences with reinforcement learning',
    phase: 3,
    readingTime: 17,
    prerequisites: ['instruction-tuning-flan'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 27,
    slug: 'dpo',
    title: 'DPO — Direct Preference Optimization',
    subtitle: 'Alignment without reinforcement learning — simpler and more stable',
    phase: 3,
    readingTime: 15,
    prerequisites: ['rlhf'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 28,
    slug: 'fine-tuning-peft',
    title: 'Fine-tuning — Full vs Parameter-Efficient (PEFT)',
    subtitle: 'Adapting large models without retraining all their weights',
    phase: 3,
    readingTime: 14,
    prerequisites: ['gpt-autoregressive-lm'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 29,
    slug: 'lora-qlora',
    title: 'LoRA & QLoRA',
    subtitle: 'Fine-tuning massive models on a single consumer GPU',
    phase: 3,
    readingTime: 16,
    prerequisites: ['fine-tuning-peft'],
    hasCode: true,
    hasMath: true,
    hasInteractiveDemo: false,
  },
  {
    id: 30,
    slug: 'quantization',
    title: 'Quantization — INT8, INT4, GGUF & AWQ',
    subtitle: 'Shrinking LLMs to run on consumer hardware without losing quality',
    phase: 3,
    readingTime: 15,
    prerequisites: ['lora-qlora'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },

  // ---------- Phase 4: Applied LLM Engineering ----------
  {
    id: 31,
    slug: 'prompt-engineering',
    title: 'Prompt Engineering — Zero-shot, Few-shot & CoT',
    subtitle: 'Talking to LLMs effectively — the skill every AI engineer needs',
    phase: 4,
    readingTime: 14,
    prerequisites: ['llm-evolution'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 32,
    slug: 'advanced-prompting',
    title: 'Advanced Prompting — Self-Consistency, ToT & ReAct',
    subtitle: 'Going beyond simple prompting to multi-step reasoning',
    phase: 4,
    readingTime: 15,
    prerequisites: ['prompt-engineering'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 33,
    slug: 'intro-to-rag',
    title: 'Introduction to RAG',
    subtitle: 'Giving LLMs access to your own knowledge base at inference time',
    phase: 4,
    readingTime: 14,
    prerequisites: ['prompt-engineering'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: true,
  },
  {
    id: 34,
    slug: 'chunking-embedding',
    title: 'Chunking & Embedding Strategies',
    subtitle: 'How you split and represent documents determines everything in RAG',
    phase: 4,
    readingTime: 15,
    prerequisites: ['intro-to-rag'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 35,
    slug: 'vector-databases-retrieval',
    title: 'Vector Databases & Retrieval Methods',
    subtitle: 'Storing and searching millions of embeddings efficiently',
    phase: 4,
    readingTime: 16,
    prerequisites: ['chunking-embedding'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 36,
    slug: 'advanced-rag',
    title: 'Advanced RAG — Re-ranking, HyDE & Query Expansion',
    subtitle: "Fixing naive RAG's failures with smarter retrieval strategies",
    phase: 4,
    readingTime: 16,
    prerequisites: ['vector-databases-retrieval'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 37,
    slug: 'llm-evaluation',
    title: 'LLM Evaluation — RAGAS, BLEU & Benchmarks',
    subtitle: 'How do you know if your LLM or RAG system is actually good?',
    phase: 4,
    readingTime: 15,
    prerequisites: ['intro-to-rag'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 38,
    slug: 'inference-optimization',
    title: 'Inference Optimization — KV Cache, Flash Attention & vLLM',
    subtitle: 'Making LLMs fast enough for real production use',
    phase: 4,
    readingTime: 16,
    prerequisites: ['transformer-architecture'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },

  // ---------- Phase 5: Agents & Agentic AI ----------
  {
    id: 39,
    slug: 'ai-agents-overview',
    title: 'What Are AI Agents? Types & Architecture',
    subtitle: 'Beyond chatbots — LLMs that plan, act, and complete long tasks',
    phase: 5,
    readingTime: 13,
    prerequisites: ['prompt-engineering'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 40,
    slug: 'react-pattern',
    title: 'ReAct Pattern — Reasoning + Acting',
    subtitle: 'The foundational pattern for all tool-using LLM agents',
    phase: 5,
    readingTime: 15,
    prerequisites: ['ai-agents-overview', 'advanced-prompting'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: true,
  },
  {
    id: 41,
    slug: 'tool-use-function-calling',
    title: 'Tool Use & Function Calling',
    subtitle: 'Connecting LLMs to the real world through structured tool interfaces',
    phase: 5,
    readingTime: 15,
    prerequisites: ['react-pattern'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 42,
    slug: 'langchain',
    title: 'LangChain Framework Deep Dive',
    subtitle: 'The Swiss Army knife of LLM application development',
    phase: 5,
    readingTime: 17,
    prerequisites: ['tool-use-function-calling'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 43,
    slug: 'langgraph',
    title: 'LangGraph — Stateful Multi-step Agents',
    subtitle: 'Cyclic, stateful graph execution for complex agent workflows',
    phase: 5,
    readingTime: 16,
    prerequisites: ['langchain'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 44,
    slug: 'agent-memory',
    title: 'Agent Memory — Buffer, Summary, Entity & Vector',
    subtitle: 'Giving agents the ability to remember across turns and sessions',
    phase: 5,
    readingTime: 15,
    prerequisites: ['langgraph'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 45,
    slug: 'multi-agent-systems',
    title: 'Multi-Agent Systems & Orchestration',
    subtitle: 'Networks of specialized agents collaborating to solve complex problems',
    phase: 5,
    readingTime: 16,
    prerequisites: ['langgraph'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 46,
    slug: 'planning-task-decomposition',
    title: 'Planning & Task Decomposition',
    subtitle: 'Breaking big goals into executable sub-tasks for agents',
    phase: 5,
    readingTime: 15,
    prerequisites: ['langgraph'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 47,
    slug: 'agent-evaluation-observability',
    title: 'Agent Evaluation & Observability',
    subtitle: 'Measuring and debugging what your agent actually does',
    phase: 5,
    readingTime: 15,
    prerequisites: ['multi-agent-systems'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
  {
    id: 48,
    slug: 'production-agents',
    title: 'Production Agentic Systems & Best Practices',
    subtitle: 'Everything you need to deploy reliable, safe agents at scale',
    phase: 5,
    readingTime: 18,
    prerequisites: ['agent-evaluation-observability'],
    hasCode: true,
    hasMath: false,
    hasInteractiveDemo: false,
  },
];

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/** Look up a single topic by its kebab-case slug. */
export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** All topics belonging to a phase, in id order. */
export function getTopicsByPhase(phase: number): Topic[] {
  return TOPICS.filter((t) => t.phase === phase).sort((a, b) => a.id - b.id);
}

/** Previous/next topic in global curriculum order (null at the boundaries). */
export function getPrevNextTopics(slug: string): {
  prev: Topic | null;
  next: Topic | null;
} {
  const index = TOPICS.findIndex((t) => t.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? TOPICS[index - 1] : null,
    next: index < TOPICS.length - 1 ? TOPICS[index + 1] : null,
  };
}

/** Main accent hex for a phase (falls back to phase 1). */
export function getPhaseColor(phase: number): string {
  const p = PHASES.find((ph) => ph.id === phase);
  return p ? p.color : PHASES[0].color;
}

/** Full phase record by id. */
export function getPhase(phase: number): Phase | undefined {
  return PHASES.find((p) => p.id === phase);
}

/** `var(--phase-N)` CSS variable string for a phase. */
export function getPhaseCssVar(phase: number): string {
  return `var(--phase-${phase})`;
}

/** Total number of topics across all phases. */
export const TOTAL_TOPICS = TOPICS.length;
