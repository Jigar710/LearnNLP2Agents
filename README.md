<div align="center">

# 🧠 Learn NLP → Agents

### From raw text to autonomous agents — master the complete stack.

A free, open-source curriculum that takes you from **NLP fundamentals** all the way to **production Agentic AI** — 48 in-depth topics across 5 phases, with runnable Python, KaTeX-rendered math, interactive diagrams, and offline full-text search.

[**🚀 Live site →**](https://jigar710.github.io/LearnNLP2Agents)

[![Astro](https://img.shields.io/badge/Astro-6-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Deploy](https://img.shields.io/badge/GitHub%20Pages-deployed-222?logo=githubpages&logoColor=white)](https://jigar710.github.io/LearnNLP2Agents)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

</div>

---

## ✨ Features

- 📚 **48 topics**, ~2,500+ words each, with runnable Python examples
- 🎨 **8 interactive diagrams** — NLP pipeline, embeddings, attention, the Transformer, BERT masking, token generation, RAG pipeline, ReAct agent loop
- 🔍 **Offline full-text search** (`⌘K` / `Ctrl+K`) powered by Pagefind — no server, no API
- 🌗 **Dark / light mode** with a phase-color design system (no flash of unstyled content)
- ∑ **Math rendered with KaTeX** at build time; code highlighted with Shiki
- 📊 **Local progress tracking**, per-phase cheatsheets, and a 100+ term glossary
- ⚡ **Static-first** — ships HTML + minimal React islands; fast everywhere

## 🗺️ The five phases

| # | Phase | Covers |
|---|-------|--------|
| 1 | **NLP Foundations** | pipeline, linguistics, tokenization, BoW/TF-IDF, embeddings (Word2Vec/GloVe/FastText), language modeling, RNN/LSTM/GRU, Seq2Seq |
| 2 | **Attention & Transformers** | attention, self/multi-head attention, positional encoding, the Transformer, BPE, BERT, GPT |
| 3 | **LLMs — Training to Alignment** | LLM evolution, T5/BART, pre-training objectives, scaling laws, instruction tuning, RLHF, DPO, PEFT, LoRA/QLoRA, quantization |
| 4 | **Applied LLM Engineering** | prompting, advanced prompting, RAG, chunking & embeddings, vector databases, advanced RAG, evaluation, inference optimization |
| 5 | **Agents & Agentic AI** | agent architectures, ReAct, tool use, LangChain, LangGraph, memory, multi-agent systems, planning, evaluation, production |

## 🚀 Quick start

```bash
npm install      # install dependencies (Node >= 22.12)
npm run dev      # dev server → http://localhost:4321/LearnNLP2Agents
```

### All scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the Astro dev server |
| `npm run build` | Build the static site to `dist/` (auto-runs Pagefind via `postbuild`) |
| `npm run preview` | Preview the production build locally |
| `npm run search:build` | (Re)build the Pagefind search index manually |

> **Search note:** the search index is generated from the built site, so it only
> works against a production build. Use `npm run build && npm run preview` to try
> search locally — it gracefully shows "unavailable" in `npm run dev`.

## 🧰 Tech stack

- **[Astro](https://astro.build)** — static site generator + MDX content collections
- **[Tailwind CSS v4](https://tailwindcss.com)** + CSS custom properties for the phase-color design system
- **[React](https://react.dev) islands** — interactive diagrams, search, theme toggle, quizzes
- **[KaTeX](https://katex.org)** — math rendered at build time
- **[Shiki](https://shiki.style)** — syntax highlighting
- **[Pagefind](https://pagefind.app)** — offline, static full-text search
- **[D3](https://d3js.org)** — data-visualization diagrams

## 📁 Project structure

```
src/
├── components/
│   ├── diagrams/   # interactive D3 / React diagrams
│   ├── home/       # homepage sections (phase cards, etc.)
│   ├── layout/     # Navbar, Footer, Logo
│   ├── topic/      # topic hero + page chrome
│   └── ui/         # search modal, scroll progress, theme toggle
├── content/topics/ # 48 MDX topic files (the curriculum)
├── data/           # phases, glossary, and metadata
├── layouts/        # BaseLayout + TopicLayout
├── pages/          # routes: index, curriculum, glossary, phase/, topic/, cheatsheet/
├── scripts/        # client-side helpers
├── styles/         # global + diagram CSS
└── utils/          # base-path + shared helpers
```

## 🌐 Deployment (GitHub Pages)

Deploys automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push this project to the `main` branch of your repo.
2. **Settings → Pages → Source: GitHub Actions.**
3. Confirm `site` + `base` in [`astro.config.mjs`](astro.config.mjs) match your repo
   (currently `https://jigar710.github.io` + `/LearnNLP2Agents`).
4. Every push to `main` builds the site, generates the Pagefind index, and deploys.

## 📄 License

[MIT](./LICENSE) — free to use. Curriculum content is educational.
