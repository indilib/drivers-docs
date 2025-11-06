import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkAlert from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkAlert],
  },
  integrations: [
    starlight({
      title: 'INDI Drivers Documentation',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/indilib/indi',
        },
      ],
      components: {
        Sidebar: './src/components/Sidebar.astro',
        PageSidebar: './src/components/StarlightRightSidebar.astro',
      },
      customCss: ['./src/styles/alerts.css', './src/styles/custom-layout.css'],
    }),
  ],
});
