import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { defineConfig } from "astro/config";
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./src/locales";

// https://astro.build/config
export default defineConfig({
  site: "https://hira.page",
  i18n: {
    defaultLocale: DEFAULT_LOCALE_SETTING,
    locales: Object.keys(LOCALES_SETTING),
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE_SETTING,
        locales: Object.fromEntries(
          Object.entries(LOCALES_SETTING).map(([key, value]) => [
            key,
            value.lang ?? key,
          ]),
        ),
      },
      filter: (page) => {
        return !page.includes('tag=') && !page.includes('sort=');
      },
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
      ],
    },
  },
});
