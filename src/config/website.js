/**
 * 全局配置文件
 */
export default {
  title: '生产系统',
  logo: 'A',
  key: 'saber', //配置主键,目前用于存储
  indexTitle: '生产计划系统',
  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  captchaMode: true, // 是否开启验证码模式
  tokenTime: 3000, //token过期时间
  Authorization: 'Blade-Auth',
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  setting: {
    sidebar: 'vertical',
    tag: true,
    debug: true,
    collapse: true,
    search: true,
    lock: true,
    screenshot: true,
    fullscren: true,
    theme: true,
    menu: true,
  },
  fistPage: {
    name: '首页',
    path: '/wel/index',
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'icon-caidan',
    label: 'name',
    path: 'path',
    icon: 'source',
    children: 'children',
    query: 'query',
    href: 'path',
    meta: 'meta',
  },
  //auth配置
  auth: {
    // 使用后端工程 @org.springblade.test.Sm2KeyGenerator 获取
    publicKey:
      '048c7223ad7f8c5d53ef0ce420b1547f2bb3e7907db4c530b280e82b0d63b9d7612e346f2f53e97f3eeae2a22d77a4ccf997022ba073e21b15af1ffb3647eb6d4b',
  },
  // 授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
};
