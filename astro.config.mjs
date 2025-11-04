import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Indi Website',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/indilib/indi',
        },
      ],
      sidebar: [
        {
          label: 'Drivers Documentation',
          autogenerate: { directory: 'drivers' },
        },
      ],
      components: {
        PageSidebar: './src/components/StarlightRightSidebar.astro',
      },
    }),
  ],
});
