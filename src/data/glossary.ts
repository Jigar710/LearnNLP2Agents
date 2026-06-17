/**
 * glossary.ts — NLP/LLM/Agents glossary (PRD §17 Step 3.2, Bonus 2).
 * 90+ terms; each entry links to related topic slugs from curriculum.ts.
 * The glossary page (/glossary) sorts these alphabetically and filters them.
 */

export interface GlossaryEntry {
  term: string;
  definition: string;
  relatedTopics: string[]; // topic slugs
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Ablation',
    definition:
      'An experiment that removes or alters one component of a system to measure its contribution. Common in ML papers to justify each architectural choice.',
    relatedTopics: ['transformer-architecture'],
  },
  {
    term: 'Adapter',
    definition:
      'A small trainable module inserted between the frozen layers of a pretrained model. Adapters let you fine-tune a large model by updating only a tiny fraction of parameters.',
    relatedTopics: ['fine-tuning-peft'],
  },
  {
    term: 'Agent',
    definition:
      'An LLM-driven system that perceives, reasons, plans, and acts on an environment through tools, often over multiple steps. Unlike a chatbot, an agent can take actions and observe their results before deciding what to do next.',
    relatedTopics: ['ai-agents-overview', 'react-pattern'],
  },
  {
    term: 'Alignment',
    definition:
      'The process of making a model behave according to human intentions and values — helpful, honest, and harmless. Techniques include instruction tuning, RLHF, and DPO.',
    relatedTopics: ['rlhf', 'dpo', 'instruction-tuning-flan'],
  },
  {
    term: 'ALiBi',
    definition:
      'Attention with Linear Biases — a positional method that adds a distance-based penalty to attention scores instead of using positional embeddings. It enables length extrapolation to longer sequences than seen in training.',
    relatedTopics: ['positional-encoding'],
  },
  {
    term: 'Attention',
    definition:
      'A mechanism that lets a model weigh the relevance of different input positions when producing each output. It computes a weighted sum of values, where weights come from query–key similarity.',
    relatedTopics: ['attention-mechanism', 'self-attention'],
  },
  {
    term: 'Autoregressive',
    definition:
      'A generation scheme where each token is predicted conditioned on all previously generated tokens. GPT-style decoder models are autoregressive.',
    relatedTopics: ['gpt-autoregressive-lm', 'transformer-decoder'],
  },
  {
    term: 'AWQ',
    definition:
      'Activation-aware Weight Quantization — a post-training quantization method that protects the small fraction of salient weights driving model quality. It achieves strong INT4 accuracy with low overhead.',
    relatedTopics: ['quantization'],
  },
  {
    term: 'Bag of Words (BoW)',
    definition:
      'A text representation that counts word occurrences while discarding order and grammar. Simple and interpretable, but it loses sequence and semantic information.',
    relatedTopics: ['bag-of-words-tfidf'],
  },
  {
    term: 'Beam Search',
    definition:
      'A decoding strategy that keeps the top-k most probable partial sequences at each step instead of committing greedily. It trades compute for higher-quality, more globally consistent outputs.',
    relatedTopics: ['seq2seq'],
  },
  {
    term: 'BERT',
    definition:
      'Bidirectional Encoder Representations from Transformers — an encoder-only model pretrained with masked language modeling. It produces deep bidirectional context representations for understanding tasks.',
    relatedTopics: ['bert', 'transformer-encoder'],
  },
  {
    term: 'BLEU',
    definition:
      'A precision-based metric for machine translation that compares n-gram overlap between candidate and reference texts. Higher BLEU correlates with closeness to human reference translations.',
    relatedTopics: ['llm-evaluation'],
  },
  {
    term: 'BPE (Byte Pair Encoding)',
    definition:
      'A subword tokenization algorithm that iteratively merges the most frequent adjacent symbol pairs. It balances vocabulary size against the out-of-vocabulary problem and underlies many modern LLM tokenizers.',
    relatedTopics: ['tokenization-bpe'],
  },
  {
    term: 'Bradley-Terry Model',
    definition:
      'A statistical model of pairwise preferences used to convert human comparisons into a scalar reward. It underlies reward-model training in RLHF.',
    relatedTopics: ['rlhf'],
  },
  {
    term: 'CBOW',
    definition:
      'Continuous Bag of Words — a Word2Vec training scheme that predicts a center word from its surrounding context. It is fast and works well for frequent words.',
    relatedTopics: ['word2vec'],
  },
  {
    term: 'Chain-of-Thought (CoT)',
    definition:
      'A prompting technique that elicits explicit intermediate reasoning steps before the final answer. It substantially improves performance on multi-step and arithmetic tasks.',
    relatedTopics: ['prompt-engineering', 'advanced-prompting'],
  },
  {
    term: 'Checkpointer',
    definition:
      'A persistence layer in LangGraph that saves agent state between steps or sessions. It enables resumable, long-running, and human-in-the-loop agents.',
    relatedTopics: ['langgraph', 'agent-memory'],
  },
  {
    term: 'Chinchilla Scaling',
    definition:
      'A compute-optimal scaling result showing models were undertrained — roughly 20 training tokens per parameter is optimal. It reshaped how labs allocate compute between model size and data.',
    relatedTopics: ['scaling-laws'],
  },
  {
    term: 'Chunking',
    definition:
      'Splitting documents into smaller passages for embedding and retrieval in RAG. Chunk size and overlap strongly affect retrieval quality.',
    relatedTopics: ['chunking-embedding', 'intro-to-rag'],
  },
  {
    term: 'Constitutional AI',
    definition:
      "Anthropic's alignment approach where a model critiques and revises its own outputs against a set of written principles (a 'constitution'). It reduces reliance on large amounts of human preference labeling.",
    relatedTopics: ['llm-evolution', 'rlhf'],
  },
  {
    term: 'Context Window',
    definition:
      'The maximum number of tokens a model can attend to at once, covering both prompt and generation. Larger windows enable longer documents and conversations but cost more compute and memory.',
    relatedTopics: ['llm-evolution', 'inference-optimization'],
  },
  {
    term: 'Contextual Embedding',
    definition:
      'A token representation that changes based on surrounding context, unlike static word vectors. Models like BERT produce different vectors for the same word in different sentences.',
    relatedTopics: ['bert', 'transformer-encoder'],
  },
  {
    term: 'Corpus',
    definition:
      'A large, structured collection of text used to train or evaluate NLP models. Examples include Wikipedia, Common Crawl, C4, and The Pile.',
    relatedTopics: ['corpus-tokens-vocabulary'],
  },
  {
    term: 'Cosine Similarity',
    definition:
      'A measure of similarity between two vectors based on the cosine of the angle between them. It is widely used to compare embeddings because it ignores magnitude and focuses on direction.',
    relatedTopics: ['bag-of-words-tfidf', 'vector-databases-retrieval'],
  },
  {
    term: 'Cross-Attention',
    definition:
      'Attention where queries come from one sequence (the decoder) and keys/values from another (the encoder). It lets a decoder condition generation on encoded source content.',
    relatedTopics: ['transformer-decoder'],
  },
  {
    term: 'Cross-Encoder',
    definition:
      'A model that jointly encodes a query and a candidate document to score their relevance. Used as a re-ranker after fast bi-encoder retrieval for higher precision.',
    relatedTopics: ['advanced-rag'],
  },
  {
    term: 'Causal Language Modeling (CLM)',
    definition:
      'A pretraining objective that predicts the next token given only previous tokens. It is the objective behind GPT-style decoder models.',
    relatedTopics: ['pretraining-objectives', 'gpt-autoregressive-lm'],
  },
  {
    term: 'Dependency Parsing',
    definition:
      'Analyzing the grammatical structure of a sentence as directed relations between head and dependent words. It reveals subject, object, and modifier relationships useful for downstream tasks.',
    relatedTopics: ['linguistics-basics'],
  },
  {
    term: 'Distributional Hypothesis',
    definition:
      "The idea that words appearing in similar contexts have similar meanings — 'a word is known by the company it keeps.' It is the foundation of word embeddings.",
    relatedTopics: ['word2vec'],
  },
  {
    term: 'DPO (Direct Preference Optimization)',
    definition:
      'An alignment method that optimizes a model directly on preference pairs without training a separate reward model or using RL. It reformulates the RLHF objective into a simple classification-style loss.',
    relatedTopics: ['dpo', 'rlhf'],
  },
  {
    term: 'Embedding',
    definition:
      'A dense, low-dimensional vector representation of a token, sentence, or document that captures semantic meaning. Similar items map to nearby vectors in the embedding space.',
    relatedTopics: ['word2vec', 'chunking-embedding'],
  },
  {
    term: 'Emergent Ability',
    definition:
      'A capability that appears relatively suddenly as model scale increases, rather than improving smoothly. Examples include multi-step arithmetic and chain-of-thought reasoning.',
    relatedTopics: ['scaling-laws', 'llm-evolution'],
  },
  {
    term: 'Encoder-Decoder',
    definition:
      'An architecture with one stack that encodes input into representations and another that decodes them into output. It suits sequence-to-sequence tasks like translation and summarization.',
    relatedTopics: ['seq2seq', 't5-bart-encoder-decoder'],
  },
  {
    term: 'FAISS',
    definition:
      "Facebook AI Similarity Search — a library for efficient nearest-neighbor search over dense vectors on CPU or GPU. It's a common backbone for prototype and production RAG retrieval.",
    relatedTopics: ['vector-databases-retrieval'],
  },
  {
    term: 'FastText',
    definition:
      'A word-embedding method that represents words as bags of character n-grams. This lets it build vectors for rare and out-of-vocabulary words, helping morphologically rich languages.',
    relatedTopics: ['glove-fasttext'],
  },
  {
    term: 'Few-Shot Prompting',
    definition:
      'Providing a handful of input–output examples in the prompt so the model infers the task. It often outperforms zero-shot when the task format is unusual.',
    relatedTopics: ['prompt-engineering'],
  },
  {
    term: 'Fine-Tuning',
    definition:
      'Continuing training of a pretrained model on task- or domain-specific data. Full fine-tuning updates all weights, while PEFT methods update only a small subset.',
    relatedTopics: ['fine-tuning-peft', 'lora-qlora'],
  },
  {
    term: 'Flash Attention',
    definition:
      'An IO-aware attention algorithm that avoids materializing the full attention matrix in memory by tiling and recomputation. It speeds up training and inference while using less memory.',
    relatedTopics: ['inference-optimization'],
  },
  {
    term: 'Function Calling',
    definition:
      'A capability where an LLM outputs structured arguments (per a JSON schema) to invoke external tools. It is the standard interface for connecting models to APIs, code, and data.',
    relatedTopics: ['tool-use-function-calling'],
  },
  {
    term: 'GGUF',
    definition:
      'A CPU-friendly file format for quantized models used by llama.cpp. Quant levels like Q4_K_M trade off size and quality, enabling LLMs to run on laptops.',
    relatedTopics: ['quantization'],
  },
  {
    term: 'GloVe',
    definition:
      'Global Vectors — word embeddings learned by factorizing a global word co-occurrence matrix. It combines the benefits of count-based and prediction-based methods.',
    relatedTopics: ['glove-fasttext'],
  },
  {
    term: 'GPT',
    definition:
      'Generative Pre-trained Transformer — a decoder-only model trained with causal language modeling. The GPT paradigm unifies understanding and generation in a single autoregressive model.',
    relatedTopics: ['gpt-autoregressive-lm', 'llm-evolution'],
  },
  {
    term: 'GRU',
    definition:
      'Gated Recurrent Unit — a simplified gated RNN with reset and update gates and no separate cell state. It is faster than an LSTM with often comparable quality.',
    relatedTopics: ['rnn-lstm-gru'],
  },
  {
    term: 'Hallucination',
    definition:
      'When a model produces fluent but factually false or unsupported content. RAG and better evaluation aim to detect and reduce hallucinations.',
    relatedTopics: ['intro-to-rag', 'llm-evaluation'],
  },
  {
    term: 'HNSW',
    definition:
      'Hierarchical Navigable Small World — a graph-based approximate nearest-neighbor algorithm. It powers fast, high-recall vector search in most vector databases.',
    relatedTopics: ['vector-databases-retrieval'],
  },
  {
    term: 'HyDE',
    definition:
      'Hypothetical Document Embeddings — a retrieval technique that asks an LLM to draft a hypothetical answer, then embeds it to find real documents. It improves recall when queries and documents differ in style.',
    relatedTopics: ['advanced-rag'],
  },
  {
    term: 'In-Context Learning',
    definition:
      'The ability of a large model to learn a task from examples in the prompt, with no weight updates. It emerged at scale and underpins few-shot prompting.',
    relatedTopics: ['llm-evolution', 'prompt-engineering'],
  },
  {
    term: 'Instruction Tuning',
    definition:
      'Fine-tuning a model on many (instruction, response) pairs so it follows natural-language instructions. Training on diverse tasks improves zero-shot generalization to unseen ones.',
    relatedTopics: ['instruction-tuning-flan'],
  },
  {
    term: 'IOB Tagging',
    definition:
      'A labeling scheme (Inside, Outside, Beginning) for marking the spans of named entities token by token. It turns entity recognition into a token-classification problem.',
    relatedTopics: ['linguistics-basics'],
  },
  {
    term: 'KV Cache',
    definition:
      'A cache of key and value tensors from past tokens so attention need not recompute them each decode step. It speeds up generation but consumes memory that grows with context length.',
    relatedTopics: ['inference-optimization'],
  },
  {
    term: 'KL Divergence Penalty',
    definition:
      'A term that penalizes the fine-tuned policy for drifting too far from a reference model. In RLHF it prevents reward hacking and keeps generations fluent.',
    relatedTopics: ['rlhf', 'dpo'],
  },
  {
    term: 'LangChain',
    definition:
      'A framework for building LLM applications from composable pieces — prompts, models, retrievers, tools, and memory. LCEL lets you pipe these components together declaratively.',
    relatedTopics: ['langchain'],
  },
  {
    term: 'LangGraph',
    definition:
      'A library for building stateful agents as cyclic graphs of nodes and conditional edges. It supports persistence, streaming, and human-in-the-loop control beyond linear chains.',
    relatedTopics: ['langgraph'],
  },
  {
    term: 'Layer Normalization',
    definition:
      'A normalization that standardizes activations across the feature dimension for each token. It stabilizes and speeds up training in Transformers.',
    relatedTopics: ['transformer-encoder'],
  },
  {
    term: 'LCEL',
    definition:
      "LangChain Expression Language — a declarative syntax that composes components with the pipe (|) operator. It yields runnables supporting invoke, stream, and batch out of the box.",
    relatedTopics: ['langchain'],
  },
  {
    term: 'Lemmatization',
    definition:
      'Reducing a word to its dictionary base form (lemma) using vocabulary and morphology. It is more accurate but slower than rule-based stemming.',
    relatedTopics: ['text-preprocessing'],
  },
  {
    term: 'LoRA',
    definition:
      'Low-Rank Adaptation — fine-tuning that learns small low-rank update matrices while freezing the base weights. It cuts trainable parameters dramatically and can be merged back for zero inference overhead.',
    relatedTopics: ['lora-qlora', 'fine-tuning-peft'],
  },
  {
    term: 'LSTM',
    definition:
      'Long Short-Term Memory — a recurrent cell with input, forget, and output gates plus a cell state. Its gating mitigates the vanishing-gradient problem of plain RNNs.',
    relatedTopics: ['rnn-lstm-gru'],
  },
  {
    term: 'Masked Language Modeling (MLM)',
    definition:
      'A pretraining objective that hides some tokens and trains the model to predict them from both sides. It gives BERT its bidirectional understanding.',
    relatedTopics: ['bert', 'pretraining-objectives'],
  },
  {
    term: 'MMLU',
    definition:
      'Massive Multitask Language Understanding — a benchmark of multiple-choice questions across 57 subjects. It is a common gauge of an LLM’s broad knowledge and reasoning.',
    relatedTopics: ['llm-evaluation'],
  },
  {
    term: 'MTEB',
    definition:
      'Massive Text Embedding Benchmark — a leaderboard comparing embedding models across many retrieval and similarity tasks. It helps practitioners choose an embedding model for RAG.',
    relatedTopics: ['chunking-embedding'],
  },
  {
    term: 'Multi-Agent System',
    definition:
      'A system of multiple specialized agents that collaborate, often via a supervisor, pipeline, or debate pattern. Specialization and parallelism can outperform a single monolithic agent.',
    relatedTopics: ['multi-agent-systems'],
  },
  {
    term: 'Multi-Head Attention',
    definition:
      'Running several attention computations in parallel, each in its own learned subspace, then concatenating them. Different heads can capture syntactic, semantic, or positional relations.',
    relatedTopics: ['multi-head-attention'],
  },
  {
    term: 'Named Entity Recognition (NER)',
    definition:
      'Identifying and classifying spans like people, organizations, and locations in text. It is a core information-extraction task usually framed as token classification.',
    relatedTopics: ['linguistics-basics'],
  },
  {
    term: 'Negative Sampling',
    definition:
      'A training trick that approximates the costly softmax by contrasting a true context word against a few random negatives. It makes Word2Vec training efficient at scale.',
    relatedTopics: ['word2vec'],
  },
  {
    term: 'N-gram',
    definition:
      'A contiguous sequence of n tokens used in classical language models and metrics. Bigram and trigram models estimate the probability of a token from the previous one or two.',
    relatedTopics: ['language-modeling-perplexity'],
  },
  {
    term: 'OOV (Out-of-Vocabulary)',
    definition:
      'A word not present in the model’s fixed vocabulary, which classical methods cannot represent. Subword tokenization (BPE, WordPiece) largely solves the OOV problem.',
    relatedTopics: ['corpus-tokens-vocabulary', 'tokenization-bpe'],
  },
  {
    term: 'PagedAttention',
    definition:
      'A KV-cache memory manager (from vLLM) that allocates cache in pages like virtual memory. It reduces fragmentation and boosts serving throughput.',
    relatedTopics: ['inference-optimization'],
  },
  {
    term: 'Pagefind',
    definition:
      'A static, offline-first search library that builds an index from a site’s built HTML. It powers fully client-side search without a backend.',
    relatedTopics: [],
  },
  {
    term: 'Part of Speech (POS)',
    definition:
      'The grammatical category of a word, such as noun, verb, or adjective. POS tags are foundational features for parsing and many downstream tasks.',
    relatedTopics: ['linguistics-basics'],
  },
  {
    term: 'PEFT',
    definition:
      'Parameter-Efficient Fine-Tuning — a family of methods (adapters, prefix tuning, LoRA) that adapt large models by training few parameters. It makes fine-tuning feasible on limited hardware.',
    relatedTopics: ['fine-tuning-peft', 'lora-qlora'],
  },
  {
    term: 'Perplexity',
    definition:
      'An evaluation metric for language models equal to the exponentiated average negative log-likelihood. Lower perplexity means the model is less surprised by the test text.',
    relatedTopics: ['language-modeling-perplexity'],
  },
  {
    term: 'Positional Encoding',
    definition:
      'Information added to token embeddings so a permutation-invariant Transformer knows token order. Variants include sinusoidal, learned, RoPE, and ALiBi.',
    relatedTopics: ['positional-encoding'],
  },
  {
    term: 'PPO',
    definition:
      'Proximal Policy Optimization — a reinforcement-learning algorithm used in RLHF to optimize a policy against a reward model. It constrains each update to stay close to the previous policy for stability.',
    relatedTopics: ['rlhf'],
  },
  {
    term: 'Prompt Engineering',
    definition:
      'Designing inputs — instructions, examples, and format — to elicit the desired model behavior. It is the primary control surface for using LLMs without fine-tuning.',
    relatedTopics: ['prompt-engineering', 'advanced-prompting'],
  },
  {
    term: 'Quantization',
    definition:
      'Reducing the numerical precision of model weights and/or activations (e.g., to INT8 or INT4). It shrinks memory and speeds inference with minimal quality loss when done well.',
    relatedTopics: ['quantization'],
  },
  {
    term: 'Query, Key, Value (QKV)',
    definition:
      'Three learned projections of the input that drive attention: queries are matched against keys to weight values. Self-attention computes all three from the same sequence.',
    relatedTopics: ['self-attention'],
  },
  {
    term: 'QLoRA',
    definition:
      'LoRA fine-tuning applied on top of a 4-bit quantized base model, using NF4, double quantization, and paged optimizers. It enables fine-tuning very large models on a single GPU.',
    relatedTopics: ['lora-qlora'],
  },
  {
    term: 'RAG',
    definition:
      'Retrieval-Augmented Generation — retrieving relevant documents and injecting them into the prompt before generation. It grounds answers in external, up-to-date, or private knowledge.',
    relatedTopics: ['intro-to-rag', 'advanced-rag'],
  },
  {
    term: 'RAGAS',
    definition:
      'A framework for evaluating RAG systems on metrics like context precision/recall, faithfulness, and answer relevancy. It enables systematic, automated RAG assessment.',
    relatedTopics: ['llm-evaluation'],
  },
  {
    term: 'ReAct',
    definition:
      'A pattern that interleaves Reasoning (Thought) with Acting (tool use) and Observation. Reasoning guides which action to take, and observations inform the next reasoning step.',
    relatedTopics: ['react-pattern', 'advanced-prompting'],
  },
  {
    term: 'Re-ranking',
    definition:
      'A second retrieval stage that re-scores candidate documents with a more accurate (often cross-encoder) model. It improves precision over fast first-stage retrieval.',
    relatedTopics: ['advanced-rag'],
  },
  {
    term: 'Reward Model',
    definition:
      'A model trained on human preference comparisons to score the quality of generations. It provides the learning signal for RL fine-tuning in RLHF.',
    relatedTopics: ['rlhf'],
  },
  {
    term: 'Residual Connection',
    definition:
      'A skip connection that adds a sublayer’s input to its output. It improves gradient flow and enables training of very deep Transformers.',
    relatedTopics: ['transformer-encoder'],
  },
  {
    term: 'RLHF',
    definition:
      'Reinforcement Learning from Human Feedback — a three-stage pipeline (SFT, reward modeling, PPO) that aligns models to human preferences. It turned base LLMs into helpful assistants like ChatGPT.',
    relatedTopics: ['rlhf'],
  },
  {
    term: 'RNN',
    definition:
      'Recurrent Neural Network — a model that processes sequences step by step, carrying a hidden state. Plain RNNs struggle with long-range dependencies due to vanishing gradients.',
    relatedTopics: ['rnn-lstm-gru'],
  },
  {
    term: 'RoPE',
    definition:
      'Rotary Position Embedding — a method that encodes position by rotating query and key vectors. It captures relative positions and extrapolates well, used in many modern LLMs.',
    relatedTopics: ['positional-encoding'],
  },
  {
    term: 'ROUGE',
    definition:
      'A recall-oriented set of metrics for summarization based on n-gram and sequence overlap with references. ROUGE-1, ROUGE-2, and ROUGE-L are the most common variants.',
    relatedTopics: ['llm-evaluation'],
  },
  {
    term: 'Self-Attention',
    definition:
      'Attention where every token attends to every other token in the same sequence. It captures long-range dependencies in parallel and is the core of the Transformer.',
    relatedTopics: ['self-attention'],
  },
  {
    term: 'Self-Consistency',
    definition:
      'A technique that samples multiple chain-of-thought paths and takes a majority vote over answers. It improves reliability on reasoning tasks at the cost of extra compute.',
    relatedTopics: ['advanced-prompting'],
  },
  {
    term: 'SentencePiece',
    definition:
      'A language-agnostic tokenizer that treats text as a raw stream and learns subwords (often via the unigram model). It makes no whitespace assumptions, suiting many languages.',
    relatedTopics: ['tokenization-bpe'],
  },
  {
    term: 'Seq2Seq',
    definition:
      'A model family that maps an input sequence to an output sequence of possibly different length. The encoder–decoder design underlies translation, summarization, and dialogue.',
    relatedTopics: ['seq2seq'],
  },
  {
    term: 'SFT (Supervised Fine-Tuning)',
    definition:
      'Fine-tuning a base model on curated (prompt, response) demonstrations. It is the first stage of the RLHF pipeline and the basis of instruction tuning.',
    relatedTopics: ['instruction-tuning-flan', 'rlhf'],
  },
  {
    term: 'Skip-gram',
    definition:
      'A Word2Vec scheme that predicts surrounding context words from a center word. It tends to represent rare words better than CBOW.',
    relatedTopics: ['word2vec'],
  },
  {
    term: 'Softmax',
    definition:
      'A function that turns a vector of scores into a probability distribution that sums to one. It converts attention scores and output logits into normalized weights.',
    relatedTopics: ['self-attention', 'gpt-autoregressive-lm'],
  },
  {
    term: 'Span Corruption',
    definition:
      'A pretraining objective (used by T5) that masks contiguous spans of tokens and trains the model to reconstruct them. It unifies many tasks under a text-to-text format.',
    relatedTopics: ['pretraining-objectives', 't5-bart-encoder-decoder'],
  },
  {
    term: 'Speculative Decoding',
    definition:
      'An inference acceleration where a small draft model proposes tokens that a larger target model verifies in parallel. It reduces latency without changing output quality.',
    relatedTopics: ['inference-optimization'],
  },
  {
    term: 'Stemming',
    definition:
      'Crudely chopping word endings to a common root using fixed rules (e.g., Porter stemmer). It is fast but can produce non-words, unlike lemmatization.',
    relatedTopics: ['text-preprocessing'],
  },
  {
    term: 'Stopwords',
    definition:
      'Very common words (the, is, and) often removed during preprocessing to reduce noise. Removal helps some classical methods but can hurt tasks where these words carry meaning.',
    relatedTopics: ['text-preprocessing'],
  },
  {
    term: 'Supervisor Pattern',
    definition:
      'A multi-agent design where a coordinating agent delegates subtasks to specialist worker agents. It centralizes control and makes complex workflows easier to reason about.',
    relatedTopics: ['multi-agent-systems'],
  },
  {
    term: 'T5',
    definition:
      'Text-to-Text Transfer Transformer — an encoder–decoder model that casts every NLP task as text-to-text. It is pretrained with span corruption and fine-tuned by reformatting tasks as text.',
    relatedTopics: ['t5-bart-encoder-decoder'],
  },
  {
    term: 'Teacher Forcing',
    definition:
      'A training technique that feeds the ground-truth previous token to the decoder instead of its own prediction. It stabilizes and speeds up sequence-model training.',
    relatedTopics: ['seq2seq', 'transformer-decoder'],
  },
  {
    term: 'Temperature',
    definition:
      'A sampling hyperparameter that scales logits to control randomness in generation. Higher temperature yields more diverse output; lower temperature is more deterministic.',
    relatedTopics: ['gpt-autoregressive-lm', 'prompt-engineering'],
  },
  {
    term: 'TF-IDF',
    definition:
      'Term Frequency–Inverse Document Frequency — a weighting that boosts terms frequent in a document but rare across the corpus. It remains strong for keyword search and ranking.',
    relatedTopics: ['bag-of-words-tfidf'],
  },
  {
    term: 'Tokenization',
    definition:
      'Splitting text into units (characters, words, or subwords) that a model consumes. Subword tokenization is the standard for modern LLMs.',
    relatedTopics: ['corpus-tokens-vocabulary', 'tokenization-bpe'],
  },
  {
    term: 'Tool Use',
    definition:
      'Letting an LLM call external functions, APIs, or code to act beyond text generation. It is what transforms a language model into an agent.',
    relatedTopics: ['tool-use-function-calling', 'react-pattern'],
  },
  {
    term: 'Transformer',
    definition:
      'A neural architecture built entirely on attention and feed-forward layers, with no recurrence. Its parallelism and long-range modeling made it the foundation of modern NLP.',
    relatedTopics: ['transformer-architecture'],
  },
  {
    term: 'Tree of Thoughts (ToT)',
    definition:
      'A reasoning method that explores a tree of intermediate thoughts via search (BFS/DFS) rather than a single chain. It helps on problems requiring exploration and backtracking.',
    relatedTopics: ['advanced-prompting'],
  },
  {
    term: 'Vanishing Gradient',
    definition:
      'A training problem where gradients shrink across many steps or layers, stalling learning of long-range dependencies. Gated RNNs and residual connections were designed to mitigate it.',
    relatedTopics: ['rnn-lstm-gru'],
  },
  {
    term: 'Vector Database',
    definition:
      'A datastore optimized for similarity search over high-dimensional embeddings. Options include FAISS, ChromaDB, Qdrant, and Pinecone, often using HNSW indexes.',
    relatedTopics: ['vector-databases-retrieval'],
  },
  {
    term: 'vLLM',
    definition:
      'A high-throughput LLM serving engine built around PagedAttention and continuous batching. It maximizes GPU utilization for production inference.',
    relatedTopics: ['inference-optimization'],
  },
  {
    term: 'Vocabulary',
    definition:
      'The fixed set of tokens a model recognizes, with sizes like 30k (BERT) or 100k (GPT-4). Vocabulary size trades sequence length against the OOV problem.',
    relatedTopics: ['corpus-tokens-vocabulary', 'tokenization-bpe'],
  },
  {
    term: 'Word2Vec',
    definition:
      'A shallow neural method that learns dense word embeddings via CBOW or Skip-gram. Its vectors support semantic similarity and analogies like king − man + woman ≈ queen.',
    relatedTopics: ['word2vec'],
  },
  {
    term: 'WordPiece',
    definition:
      'A subword tokenization used by BERT that merges pieces to maximize training-corpus likelihood. It is similar to BPE but uses a different merge criterion.',
    relatedTopics: ['tokenization-bpe'],
  },
  {
    term: 'Zero-Shot Prompting',
    definition:
      'Asking a model to perform a task from only a description, with no examples. Large instruction-tuned models are often surprisingly capable zero-shot.',
    relatedTopics: ['prompt-engineering'],
  },
  {
    term: 'Zipf’s Law',
    definition:
      'An empirical law stating a word’s frequency is roughly inversely proportional to its rank. It explains the heavy-tailed distribution of language and the OOV challenge.',
    relatedTopics: ['corpus-tokens-vocabulary'],
  },
];
