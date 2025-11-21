import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhCN: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig: {
        nav: [
            { text: '首页', link: '/zh-CN/' },
            { text: '指南', link: '/zh-CN/guide' },
            { text: '模式', link: '/zh-CN/mode' },
            { text: '功能', link: '/zh-CN/feature' }
        ],
        sidebar: [
            {
                text: '指南',
                items: [
                    { text: '简介', link: '/zh-CN/guide' },
                    { text: '用法', link: '/zh-CN/guide#usage' },
                    { text: '限制', link: '/zh-CN/guide#limitations-recommendations' }
                ]
            },
            {
                text: '模式',
                items: [
                    { text: '概览', link: '/zh-CN/mode' },
                    { text: 'Tmpfs 模式', link: '/zh-CN/mode#tmpfs-mode' },
                    { text: 'Ext4 Sparse 模式', link: '/zh-CN/mode#ext4-sparse-mode' }
                ]
            },
            {
                text: '功能',
                items: [
                    { text: '配置', link: '/zh-CN/feature' }
                ]
            }
        ]
    }
}
