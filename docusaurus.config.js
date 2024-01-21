// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Endeavour',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '', // Usually your GitHub org/user name.
  projectName: '', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans','en'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',*/
        },
        blog: false,/*{
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Endeavour',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'plm',
            position: 'left',
            label: 'PlanetMinecraft',
          },
          /*{
            type: 'doc',
            docId: 'madparticle/home',
            position: 'left',
            label: 'Mod使用指南',
          },*/
          /*{
            type: 'doc',
            docId: 'r6ms/home',
            position: 'left',
            label: 'R6MS指南',
          },*/
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://holojaneway.uss-shenzhou.cn',
            label: 'HoloJaneway',
            position: 'right',
          },
          /*{
            type: 'localeDropdown',
            position: 'right',
          },*/
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            label: 'CurseForge',
            href: 'https://legacy.curseforge.com/members/uss_shenzhou/projects'
          },
          {
            label: 'Modrinth',
            href: 'https://modrinth.com/user/USS-Shenzhou'
          },
          {
            label: 'KOOK',
            href:'https://kook.top/Bu1WLb'
          },
          {
            label: 'Bilibili',
            href:'https://space.bilibili.com/266675750'
          },
          {
            label: 'GitHub',
            href:'https://github.com/USS-Shenzhou'
          }
          /*{
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },*/
        ],
        //copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        copyright: `<font size="2">
        Copyright © ${new Date().getFullYear()} USS_Shenzhou.
         | 保留所有权利。
        </br>Built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a>.
         | <a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2023001090号-1</a>
         </font>
        `,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['java','toml','gradle','json'],
      },
    }),
    markdown:{
      mermaid:true,
    },
    themes:['@docusaurus/theme-mermaid'],
};

module.exports = config;
