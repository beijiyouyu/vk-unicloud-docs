module.exports = {
  base: "/",
  title: 'vk-unicloud 快速开发框架',
  description: 'VK云开发：多平台全栈快速开发框架。vk-unicloud-router、vk-unicloud-admin、vk-uni-pay',
  head: [
    [
      'link', { rel: 'icon', href: '/image/logo.png' },
    ],
    [
      'link', { rel: 'stylesheet', href: '/css/index.css' },
    ]
  ],
  dest: "dist",
  themeConfig: {
    // 显示所有页面的标题链接
    //displayAllHeaders: true,
    // 搜索框显示的最大结果数量
    searchMaxSuggestions: 10,
    // 网站logo
    logo: '/image/logo.png',
    lastUpdated: "最后修改时间",
    // 头部 tabs
    nav: [
      { text: '指南', link: '/' },
      { text: 'client端框架', link: '/client/' },
      { text: 'admin端框架', link: '/admin/' },
      { text: 'vk-uni-pay（统一支付）', link: '/vk-uni-pay/' },
      { text: 'Redis扩展', link: '/vk-redis/' },
      { text: '数据库一键搬家', link: '/db-migration/' },
      { text: 'DCloud插件市场', link: 'https://ext.dcloud.net.cn/publisher?id=164406' },
      //{ text: '成品项目', link: '/product/' },
      {
        text: 'Gitee',
        ariaLabel: 'Gitee',
        items: [
          { text: 'vk-unicloud-router（client端）', link: 'https://gitee.com/vk-uni/vk-uni-cloud-router' },
          { text: 'vk-unicloud-admin（admin端）', link: 'https://gitee.com/vk-uni/vk-unicloud-admin' }
        ]
      }
    ],
    // 左侧菜单嵌套最大深度，最大值为2
    sidebarDepth: 2,
    // 侧边栏菜单
    sidebar: {
      '/client/': [{
          title: '起步',
          collapsable: false,
          children: [
            'addQQGroup',
            'vk-unicloud-router',
            '',
            'serverless',
            'quickstart',
            'changelog',
            'changeGuide',
            'codeTips'
          ]
        },
        'jsapi',
        'vk.userCenter',
        {
          title: '前端（页面）',
          collapsable: true,
          children: [
            'pages/callFunction',
            'pages/callFunctionForUrl',
            'pages/interceptor1',
            'pages/interceptor2',
            'pages/list',
            'pages/updateRequestGlobalParam',
            'pages/vuex',
            'pages/uploadFile',
            'pages/config',
            'pages/localStorage',
            'pages/isQingming',
            {
              title: '组件',
              children: [
                'pages/components/vk-data-goods-sku-popup'
              ]
            },
          ]
        },
        {
          title: '后端（云函数）',
          collapsable: false,
          initialOpenGroupIndex: -1,
          children: [{
              title: '云函数',
              collapsable: true,
              children: [
                'uniCloud/cloudfunctions/catalogue',
                'uniCloud/cloudfunctions/template',
                'uniCloud/cloudfunctions/serviceParam',
                'uniCloud/cloudfunctions/userInfo',
                'uniCloud/cloudfunctions/question',
                'uniCloud/cloudfunctions/http',
                'uniCloud/cloudfunctions/timer',
                'uniCloud/cloudfunctions/urlrewrite',
                'uniCloud/cloudfunctions/beautifyCode',
                'uniCloud/cloudfunctions/crypto',
                'uniCloud/cloudfunctions/formRules',
                'uniCloud/cloudfunctions/originalParam',
                'uniCloud/cloudfunctions/urlOriginalParam'
              ]
            },
            {
              title: '数据库',
              collapsable: true,
              children: [
                'uniCloud/db/api',
                'uniCloud/db/selects',
                'uniCloud/db/getOne',
                'uniCloud/db/getTree',
                'uniCloud/db/dao',
                'uniCloud/db/userDao',
                'uniCloud/db/transaction',
                'uniCloud/db/question'
              ]
            },
            {
              title: '缓存',
              collapsable: true,
              children: [
                'uniCloud/cache/cache'
              ]
            },
            {
              title: '中间件',
              collapsable: true,
              children: [
                'uniCloud/middleware/filter'
              ]
            },
            {
              title: '扩展',
              collapsable: true,
              children: [
                'uniCloud/plus/weixin',
                'uniCloud/plus/baidu',
                'uniCloud/plus/sms',
                'uniCloud/plus/mail',
              ]
            },
            {
              title: '全局配置',
              collapsable: true,
              children: [
                'uniCloud/config/uni-id',
                'uniCloud/config/vk-unicloud',
                'uniCloud/config/uni-pay',
              ]
            },
            'uniCloud/redis/redis',
          ]
        },
        {
          title: '常见问题',
          collapsable: true,
          children: [
            'question/q1',
            'question/q2',
            'question/q3',
            'question/q4',
            'question/q5',
            'question/q6',
            'question/q7',
            'question/q8',
            'question/q9',
            'question/q10',
            'question/q11',
            'question/q12',
          ]
        },
        'question/question'
      ],
      // 侧边栏在 /bar/ 上
      '/admin/': [{
          title: '起步',
          collapsable: false,
          children: [
            '',
            '1/quickstart',
            '1/catalogue',
            '1/changelog',
            '1/update',
            '1/codeTips',
          ]
        },
        '2/table',
        '3/form',
        {
          title: '进阶',
          collapsable: false,
          children: [
            '4/role',
            '4/codeTips',
            '4/forceResetAdminPassword',
            '4/userIsolation'
          ]
        },
        '5/template',
        {
          title: '内置组件',
          collapsable: false,
          children: [
            'components/0、public',
            'components/1、text',
            'components/2、textarea',
            'components/3、money',
            'components/4、number',
            'components/5、percentage',
            'components/6、discount',
            'components/7、radio',
            'components/8、checkbox',
            'components/9、select',
            'components/10、remote-select',
            'components/11、cascader',
            'components/12、table-select',
            'components/13、address',
            'components/14、switch',
            'components/15、rate',
            'components/16、slider',
            'components/17、color',
            'components/18、image',
            'components/19、file',
            'components/20、date',
            'components/21、time',
            'components/22、editor',
            'components/23、json',
            'components/24、array',
            'components/25、file-select',
            'components/26、icon',
            'components/27、tree-select'
          ]
        },
        {
          title: '其他组件',
          collapsable: false,
          children: [
            'components2/1、vk-data-icon',
            'components2/2、vk-data-link',
            'components2/3、vk-data-dialog',
            'components2/4、vk-data-drawer',
          ]
        },
        'question/question'
      ],
      '/vk-uni-pay/': [{
          title: '起步',
          collapsable: false,
          children: [
            '',
            'quickstart',
            'config',
            'example'
          ]
        },
        {
          title: '通用-后端SDK（云函数）',
          collapsable: false,
          children: [
            'uniCloud/createPayment',
            'uniCloud/pay-notify',
            'uniCloud/refund',
            'uniCloud/queryPayment',
            'uniCloud/queryRefund',
            'uniCloud/transfer'
          ]
        },
        {
          title: '通用-前端SDK（页面）',
          collapsable: false,
          children: [
            'page/vk-uni-pay',
            'page/createPayment'
          ]
        },
        {
          title: '通用-数据库表',
          collapsable: false,
          children: [
            'db/uni-pay-orders',
            'db/uni-pay-config'
          ]
        },
        {
          title: 'vk-pay云函数示例代码',
          path: '/vk-uni-pay/template/service/tips',
          collapsable: false,
          children: [{
              title: 'pay',
              collapsable: false,
              children: [
                'template/service/pay/code2SessionAlipay',
                'template/service/pay/code2SessionWeixin',
                'template/service/pay/code2SessionWeixinH5',
                'template/service/pay/createPayment',
                'template/service/pay/queryPayment',
                'template/service/pay/queryRefund',
                'template/service/pay/refund',
                'template/service/pay/transfer'
              ]
            },
            {
              title: 'pay-notify',
              collapsable: false,
              children: [
                'template/service/pay-notify/custom1',
                'template/service/pay-notify/goods',
                'template/service/pay-notify/recharge',
                'template/service/pay-notify/vip',
              ]
            }
          ]
        },
        'question/question',
        {
          title: 'vk-unicloud-router 框架对接示例',
          children: [{
              title: '后端SDK（云函数）',
              children: [
                'template/vk-unicloud-router/uniCloud/intro',
                'template/vk-unicloud-router/uniCloud/createPayment',
                'template/vk-unicloud-router/uniCloud/pay-notify',
                'template/vk-unicloud-router/uniCloud/queryPayment',
                'template/vk-unicloud-router/uniCloud/queryRefund',
                'template/vk-unicloud-router/uniCloud/refund',
                'template/vk-unicloud-router/uniCloud/transfer'
              ]
            },
            {
              title: '前端SDK（页面）',
              children: [
                'template/vk-unicloud-router/page/createPayment'
              ]
            }
          ]
        }
      ],
      '/db-migration/': [{
        title: '一键搬家',
        collapsable: false,
        children: [
          ''
        ]
      }],
      '/vk-redis/': [{
        title: 'vk-redis',
        collapsable: false,
        children: [
          '',
          'quickstart',
          'api',
          'question'
        ]
      }]
    },
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  },
  markdown: {
    lineNumbers: true
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
