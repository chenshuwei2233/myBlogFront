import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const category = () => import('../views/category/Category.vue')
const home = () => import('../views/home/Home.vue')
const search = () => import('../views/search/Search.vue')
const tag = () => import('../views/tag/Tag.vue')
const detail = () => import('../views/detail/Detail.vue')
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: home
		},
		{
			path:'/category/:index',
			component: category
		},
		{
			path: '/search',
			component: search
		},
		{
			path: '/tag/:tag',
			component: tag
		},
		{
			path: '/detail/:id',
			component: detail
		}
	],
	mode: 'history'
})

export default router
