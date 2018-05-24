import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/auth/login'
import Home from '../views/auth/home'
import AlList from '../views/allocate/list'
import AlShow from '../views/allocate/show'
import Allocate from '../views/allocate/allocate'
import ReList from '../views/receipt/list'
import Receipt from '../views/receipt/receipt'
import LoList from '../views/local/list'
import LoBatch from '../views/local/batch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        isShowNav: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      props: true,
      meta: {
        isShowNav: true,
        title: '首页',
        showBack: true
      }
    },
    {
      path: '/list',
      name: 'list',
      component: AlList,
      props: true,
      meta: {
        isShowNav: true,
        title: '列表',
        showBack: true
      }
    },
    {
      path: '/show',
      name: 'show',
      component: AlShow,
      props: true,
      meta: {
        isShowNav: true,
        title: '详情',
        showBack: true
      }
    },
    {
      path: '/allocate',
      name: 'allocate',
      component: Allocate,
      props: true,
      meta: {
        isShowNav: true,
        title: '派发',
        showBack: true
      }
    },
    {
      path: '/reList',
      name: 'reList',
      component: ReList,
      props: true,
      meta: {
        isShowNav: true,
        title: '回执列表',
        showBack: true
      }
    },
    {
      path: '/receipt',
      name: 'receipt',
      component: Receipt,
      props: true,
      meta: {
        isShowNav: true,
        title: '回执',
        showBack: true
      }
    },
    {
      path: '/loList',
      name: 'loList',
      component: LoList,
      props: true,
      meta: {
        isShowNav: true,
        title: '回执列表',
        showBack: true
      }
    },
    {
      path: '/loBatch',
      name: 'loBatch',
      component: LoBatch,
      props: true,
      meta: {
        isShowNav: true,
        title: '批量回执',
        showBack: true
      }
    },
  ]
})
