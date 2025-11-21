import { defineConfig } from 'vitepress'
import { en } from './locales/en.mts'
import { zhCN } from './locales/zh-CN.mts'

export default defineConfig({
  title: "Mountify",
  description: "Globally mounted modules via OverlayFS",
  base: '/mountify/',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/backslashxx/mountify' }
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      ...en
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',
      ...zhCN
    }
  }
})
