import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import twConfig from './tailwind.config.cjs';

export default defineConfig({
  shortcuts: [
    /* Example
    ['name','uno-classes'],
    */
  ],
  // WebStorm don't support unocss config, so theme put in tailwind.config.cjs
  theme: {
    ...twConfig.theme.extend,
  },
  rules: [
    [/^size-(\d+)$/, ([, d]) => {
      const size = `${(Number(d)) / 4}rem`;

      return { width: size, height: size };
    }],
  ],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('max-'))
        return matcher;

      const [variant, ...rest] = matcher.split(':');

      const mediaPx = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      }[variant.replace('max-', '')] || 0;

      if (mediaPx == 0)
        return matcher;

      return {
        matcher: rest.join(':'),
        parent: `@media (max-width: ${mediaPx}px)`,
      };
    },
    (matcher) => {
      if (!matcher.startsWith('hocus:'))
        return matcher;

      return {
        matcher: matcher.slice(6),
        selector: s => `${s}:hover, ${s}:focus`,
      };
    },
  ],
  presets: [
    presetUno(),
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: 'Source Sans Pro:400,700',
        manrope: 'Manrope:300,400',
      },
    }),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'top',
        'height': 'auto',
        'min-height': '1em',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
