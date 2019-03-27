import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from '@/components/Header'
import Home from '@/components/Home'
import Register1 from '@/components/Register'
import Login from '@/components/Login'
import My from '@/components/my/MyHome'
import Me from '@/components/my/Me'
import Balance from '@/components/my/balance'
import Ticket from '@/components/my/Ticket'
import Integral from '@/components/my/Integral'
import Data from '@/components/my/Data'
import Address from '@/components/my/Address'
import Order from '@/components/my/Order'
import Detail from '@/components/Detail'
import Hello from '@/components/HelloWorld'
import Favorites from '@/components/Favorites'
import Index from '@/components/Index'
import Search from '@/components/home/Search'
import Car from '@/components/Car'

import AdminHome from '@/components/back/Home'
import AdminAdd from '@/components/back/Add'
import AdminIndex from '@/components/back/Index'
import AdminSearch from '@/components/back/Search'

import AdminOrder from '@/components/back/Order'

import AdminUser from '@/components/back/User'



Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect:'/index',
      component: Home,
      children:[
        {
          path:'index',
          name:'Index',
          component:Index,
        },
        {
          path:'search',
          component:Search,
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component:Register1 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      children:[
        {
          path:'me',
          name:'Me',
          component:Me,
         },
         {
          path:'balance',
          name:'Balance',
          component:Balance,
         },
         {
          path:'ticket',
          name:'Ticket',
          component:Ticket,
         },
         {
          path:'integral',
          name:'Integral',
          component:Integral,
         },
         {
          path:'data',
          name:'Data',
          component:Data,
         },
         {
          path:'address',
          name:'Address',
          component:Address,
         },
         {
          path:'order',
          name:'Order',
          component:Order,
         },
        

      ]
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },

    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },

    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },

    {
      path: '/car',
      name: 'Car',
      component: Car
    },



    // 后台地址

    {
      path: '/admin',
      name: 'AdminHome',
      redirect:'/admin/index',
      component: AdminHome,
      children:[
        {
          path:'index',
          name:'AddIndex',
          component:AdminIndex
        },
        {
          path:'add',
          name:'Add',
          component:AdminAdd
        },
        {
          path:'search',
          name:'Search',
          component:AdminSearch
        },
        {
          path:'order',
          name:'Order',
          component:AdminOrder
        },
        {
          path:'user',
          name:'User',
          component:AdminUser
        }
      ]
    }
   
  ]
})
