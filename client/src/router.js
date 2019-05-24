import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import MainPage from './views/MainPage.vue'
import About from './views/About.vue'
import Vreme from './views/Vreme.vue'
import Profile from './views/Profile.vue'
import Admin from './views/Admin.vue'
import Register from './views/Register.vue'
import Test from './views/Test.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/vreme',
      name: 'Vreme',
      component: Vreme
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
    
    

  ]
})
