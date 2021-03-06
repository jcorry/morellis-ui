import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Dashboard from './components/Dashboard.vue'
import UserList from './components/Users/List.vue'
import StoreList from './components/Stores/List.vue'
import FlavorList from './components/Flavors/List.vue'
import './styles/quasar.styl'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  QBadge,
  QCard,
  QCardSection,
  QCardActions,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QTable,
  QTr,
  QTd,
  QSeparator,
  QForm,
  QInput
} from 'quasar'
import Router from 'vue-router'

const vueConfig = require('vue-config')

window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

if (window.localStorage.getItem('authToken') !== '') {
  window.axios.defaults.headers.common = {'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`}
}

Vue.use(Vuelidate)

Vue.use(Quasar, {
  config: {},
  components: {
    QBadge,
    QCard,
    QCardSection,
    QCardActions,
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QTable,
    QTr,
    QTd,
    QSeparator,
    QForm,
    QInput
  },
  directives: {
  },
  plugins: {
  }
})
Vue.use(Router)
const router = new Router({
  routes: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: Dashboard
    },
    {
      name: 'Users',
      path: '/users',
      component: UserList,
      children: []
    },
    {
      name: 'Stores',
      path: '/stores',
      component: StoreList,
      children: []
    },
    {
      name: 'Flavors',
      path: '/flavors',
      component: FlavorList,
      children: []
    }
  ]
})

Vue.config.productionTip = false

const configs = {
  apiBaseURL: 'https://localhost:4001/api/v1'
}

Vue.use(vueConfig, configs)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
