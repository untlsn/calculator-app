import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import type { UserModule } from './types';
import routes from '~pages';
import '~/assets/style';

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx));
  },
);
