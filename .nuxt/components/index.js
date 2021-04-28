import { wrapFunctional } from './utils'

export { default as Navigation } from '../../components/Navigation.vue'
export { default as MenuAdminMenu } from '../../components/menu/AdminMenu.vue'
export { default as MenuUserMenu } from '../../components/menu/UserMenu.vue'

export const LazyNavigation = import('../../components/Navigation.vue' /* webpackChunkName: "components/navigation" */).then(c => wrapFunctional(c.default || c))
export const LazyMenuAdminMenu = import('../../components/menu/AdminMenu.vue' /* webpackChunkName: "components/menu-admin-menu" */).then(c => wrapFunctional(c.default || c))
export const LazyMenuUserMenu = import('../../components/menu/UserMenu.vue' /* webpackChunkName: "components/menu-user-menu" */).then(c => wrapFunctional(c.default || c))
