import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _771111f6 = () => interopDefault(import('../pages/channelstatus.vue' /* webpackChunkName: "pages/channelstatus" */))
const _4053d98f = () => interopDefault(import('../pages/contactsupport.vue' /* webpackChunkName: "pages/contactsupport" */))
const _682df764 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _5c9b65b9 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0bb77a03 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _87c746a4 = () => interopDefault(import('../pages/usermanagement.vue' /* webpackChunkName: "pages/usermanagement" */))
const _da187abc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/channelstatus",
    component: _771111f6,
    name: "channelstatus"
  }, {
    path: "/contactsupport",
    component: _4053d98f,
    name: "contactsupport"
  }, {
    path: "/dashboard",
    component: _682df764,
    name: "dashboard"
  }, {
    path: "/login",
    component: _5c9b65b9,
    name: "login"
  }, {
    path: "/settings",
    component: _0bb77a03,
    name: "settings"
  }, {
    path: "/usermanagement",
    component: _87c746a4,
    name: "usermanagement"
  }, {
    path: "/",
    component: _da187abc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
