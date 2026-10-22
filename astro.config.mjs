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
      // Fonts of the indilib.org header (src/components/Header.astro)
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,800&family=IBM+Plex+Sans:wght@500;600&family=IBM+Plex+Mono&display=swap',
          },
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'Add your driver',
          href: 'https://github.com/indilib/drivers-docs',
        },
      ],
      components: {
        Header: './src/components/Header.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        Sidebar: './src/components/Sidebar.astro',
        PageSidebar: './src/components/StarlightRightSidebar.astro',
      },
      customCss: ['./src/styles/alerts.css', './src/styles/custom-layout.css', './src/styles/indi-colors.css', './src/styles/indi-header.css'],
    }),
  ],
});
