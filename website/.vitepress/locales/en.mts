import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const en: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide' },
            { text: 'Mode', link: '/mode' },
            { text: 'Feature', link: '/feature' }
        ],
        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Introduction', link: '/guide' },
                    { text: 'Usage', link: '/guide#usage' },
                    { text: 'Limitations', link: '/guide#limitations-recommendations' }
                ]
            },
            {
                text: 'Mode',
                items: [
                    { text: 'Overview', link: '/mode' },
                    { text: 'Tmpfs Mode', link: '/mode#tmpfs-mode' },
                    { text: 'Ext4 Sparse Mode', link: '/mode#ext4-sparse-mode' }
                ]
            },
            {
                text: 'Feature',
                items: [
                    { text: 'Configuration', link: '/feature' }
                ]
            }
        ]
    }
}
