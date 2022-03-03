const navbar =  require("./configs/navbar.js"); // 顶部导航
const sidebar =  require("./configs/sidebar.js"); // 左侧菜单
module.exports = {
  base: "/", // 部署站点的基础路径
  title: 'vk-unicloud 快速开发框架', // 网站的标题
  description: 'VK云开发：多平台全栈快速开发框架。vk-unicloud-router、vk-unicloud-admin、vk-uni-pay', // 网站的描述
  // 额外的需要被注入到当前页面的 HTML <head> 中的标签
  head: [
    [
      'link', { rel: 'icon', href: '/image/logo.png' },
    ],
    [
      'link', { rel: 'stylesheet', href: '/css/index.css' },
    ]
  ],
  dest: "dist", // 指定 vuepress build 的输出目录
  themeConfig: {
    // 显示所有页面的标题链接
    //displayAllHeaders: true,
    // 搜索框显示的最大结果数量
    searchMaxSuggestions: 10,
    // 网站logo
    logo: '/image/logo.png',
    lastUpdated: "最后修改时间",
    // 头部 tabs
    nav: navbar,
    // 左侧菜单嵌套最大深度，最大值为2
    sidebarDepth: 2,
    // 侧边栏菜单
    sidebar: sidebar,
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    },
    editLinks: false,
    editLinkText: '在 Gitee 上编辑此页（一起来纠错与优化）',
    docsRepo: 'https://gitee.com/vk-uni/vk-unicloud-docs.git', // 文档源文件的仓库 URL 。
    docsBranch: 'master', // 文档源文件的仓库分支。
    docsDir:"docs", // 文档源文件存放在仓库中的目录名。
  },
  markdown: {
    lineNumbers: true, // 是否在每个代码块的左侧显示行号。
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/active-header-links',
    'vuepress-plugin-smooth-scroll',
    [
      '@vuepress/medium-zoom',
      {
        selector: 'img.preview',
        options: {
          margin: 16
        }
      }
    ],
    [
      '@vuepress/last-updated',
      {
        dateOptions: {
          hour12: false,
          timeZone: "Asia/Shanghai"
        }
      }
    ],
  ]
};
