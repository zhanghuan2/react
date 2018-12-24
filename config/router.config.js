export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/workplace' },
      {
        path: '/dashboard',
        name: '统计页',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/workplace',
            name: '工作台',
            component: './Dashboard/Workplace',
          },
          {
            path: '/dashboard/analysis',
            name: '分析页',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: '监控页',
            component: './Dashboard/Monitor',
          },
        ],
      },
      {
        name: '公司业务',
        icon: 'user',
        path: '/business',
        routes: [
          {
            path: '/business/list',
            name: '订单列表',
            component: './business/orderList/view/index',
          },
          {
            path: '/business/customerList',
            name: '员工管理',
            component: './business/customerList/view/index',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
