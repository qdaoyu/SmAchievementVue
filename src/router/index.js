import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import dupNameJudge from '@/components/DupNameJudge'
import Page404 from '@/components/pageError/page404'
import Home from '@/components/Home'
import TextareaInput from '@/components/TextAreaInput'
import TempMenu from '@/components/TempMenu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true,
    },
    {
      path: '/textInput',
      name: 'TextareaInput',
      component: TextareaInput,
      hidden: true,
    },
    {
      path: '/tempMenu',
      name: 'TempMenu',
      component: TempMenu,
      hidden: true,
    },
    {
      path: '/page404',
      name: 'Page404',
      component: Page404,
      hidden: true,
    },
    
    {
      path: '/dupNameJudge',
      name: 'dupNameJudge',
      component: dupNameJudge,
      hidden: true,
    },
    {
      //动态渲染
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
      ]
    },



  ],
  // mode:history

})
