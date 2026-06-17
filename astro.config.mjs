// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// GitHub Pages deploy target for repo Jigar710/LearnNLP2Agents.
// Live URL: https://jigar710.github.io/LearnNLP2Agents
// https://astro.build/config
export default defineConfig({
  site: 'https://jigar710.github.io',
  base: '/LearnNLP2Agents',
  devToolbar: { enabled: false },
  integrations: [mdx(), react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
