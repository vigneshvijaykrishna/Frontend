import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Navigation: () => import('../../components/Navigation.vue' /* webpackChunkName: "components/navigation" */).then(c => wrapFunctional(c.default || c)),
  MenuAdminMenu: () => import('../../components/menu/AdminMenu.vue' /* webpackChunkName: "components/menu-admin-menu" */).then(c => wrapFunctional(c.default || c)),
  MenuUserMenu: () => import('../../components/menu/UserMenu.vue' /* webpackChunkName: "components/menu-user-menu" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
