import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('@/components/Login')
    },
    {
      path: '*',
      name: 'NotFound',
      hidden: true,
      component: () => import('@/components/NotFound')
    },
    {
      path: '/home',
      name: '车祸可视化',
      iconClass: 'fa fa-eye',
      redirect: '/home/visualization',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/home/visualization',
          name: '车祸图表',
          iconClass: 'fa fa-bar-chart',
          component: () => import('@/components/content/visualization')
        },
        {
          path: '/home/video',
          name: '车祸热力图',
          iconClass: 'fa fa-play',
          component: () => import('@/components/content/video')
        },
        {
          path: '/home/ScreenPage',
          name: '各州数量',
          iconClass: 'fa fa-play',
          component: () => import('@/components/content/ScreenPage')
        }
      ]
    }
  ],
  mode: 'history'
})
