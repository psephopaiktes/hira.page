// Font list for astro config
import { fontProviders } from "astro/config";

export const FONT_SETTING = [
  {
    provider: fontProviders.local(),
    name: "AlibabaSansJP",
    cssVariable: "--font-alibaba-jp",
    options: {
      variants: [
        {
          src: ["./src/assets/font/AlibabaSansJP-Regular.woff2"],
          weights: [100, 200, 300],
          style: "normal",
        },
        {
          src: ["./src/assets/font/AlibabaSansJP-Medium.woff2"],
          weights: [400, 500, 600],
          style: "normal",
        },
        {
          src: ["./src/assets/font/AlibabaSansJP-Bold.woff2"],
          weights: [700, 800, 900],
          style: "normal",
        },
      ],
    },
    fallbacks: [
      "Hiragino Sans",
      "Noto Sans JP",
      "BIZ UDPGothic",
      "Meiryo",
      "sans-serif",
    ],
  },
  {
    provider: fontProviders.local(),
    name: "AlibabaSansSC",
    cssVariable: "--font-alibaba-sc",
    options: {
      variants: [
        {
          src: ["./src/assets/font/AlibabaPuHuiTi-3-55-Regular.woff2"],
          weights: [100, 200, 300],
          style: "normal",
        },
        {
          src: ["./src/assets/font/AlibabaPuHuiTi-3-65-Medium.woff2"],
          weights: [400, 500, 600],
          style: "normal",
        },
        {
          src: ["./src/assets/font/AlibabaPuHuiTi-3-85-Bold.woff2"],
          weights: [700, 800, 900],
          style: "normal",
        },
      ],
    },
    fallbacks: ["Noto Sans SC", "PingFang SC", "Microsoft YaHei", "sans-serif"],
  },
  {
    provider: fontProviders.local(),
    name: "AlibabaSans",
    cssVariable: "--font-alibaba",
    options: {
      variants: [
        {
          src: ["./src/assets/font/AlibabaSans-Regular.woff2"],
          weights: [100, 200, 300],
          style: "normal",
        },
        {
          src: ["./src/assets/font/AlibabaSans-Medium.woff2"],
          weights: [400, 500, 600],
          style: "normal",
        },
        {
          src: ["./src/assets/font/AlibabaSans-Bold.woff2"],
          weights: [700, 800, 900],
          style: "normal",
        },
      ],
    },
    fallbacks: ["Arial", "Helvetica", "sans-serif"],
  },
  {
    provider: fontProviders.local(),
    name: "FuturaNowVar",
    cssVariable: "--font-futura",
    options: {
      variants: [
        {
          src: ["./src/assets/font/FuturaNowVar.woff2"],
          weight: "100 900",
          style: "normal",
        },
      ],
    },
    fallbacks: [
      "Futura",
      "Avenir Next",
      "Avenir",
      "Century Gothic",
      "sans-serif",
    ],
  },
];
