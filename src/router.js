import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ReportVisits from './views/ReportVisits.vue'
import ReportClients from './views/ReportClients.vue'
import ReportUsers from './views/ReportUsers.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reportVisits',
      name: 'reportVisits',
      component: ReportVisits
    },
    {
      path: '/reportClients',
      name: 'reportClients',
      component: ReportClients
    },
    {
      path: '/reportUsers',
      name: 'reportUsers',
      component: ReportUsers
    }
  ]
})
