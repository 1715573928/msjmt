import Vue from 'vue'
import Router from 'vue-router'
import index from "@/components/index.vue"
//1.引入Test组件
import listt from "@/components/listt.vue"
import List from "@/components/List.vue"
import text from "@/components/text.vue"
import detail from "@/components/detail.vue"
import listtt from "@/components/listtt.vue"
import reg from "@/components/reg.vue"
import login from "@/components/login.vue"

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			component: index
		},
		{
				path: '/index',
				component: index
			},
		{
			path: '/listt',
			component: listt
		},
		{
			path: '/List',
			component: List
		},
		{
			path: '/text',
			component: text
		},
		{
			path: '/detail',
			component: detail
		},
		{
			path: '/listtt',
			component: listtt
		},
		{
			path: '/login',
			component: login
		},
		{
			path: '/reg',
			component: reg
		},

	]
})
