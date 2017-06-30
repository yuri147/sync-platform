import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Resource from 'vue-resource';
import axios from 'axios'
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import Menu from 'iview/src/components/menu';
import 'iview/src/components/table';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(axios);
// Vue.use(Menu);

Vue.use(iView);



// 路由配置
const RouterConfig = {
	mode: 'history',
	routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	if (to.meta.requireAuth) { 
		if(!store.state.user.userID){
			store.state.user = JSON.parse(sessionStorage.getItem("spf.user"));
		}
		if (store.state.user && store.state.user.userID) { 
			sessionStorage.setItem("spf.user", JSON.stringify(store.state.user)); 
			next();
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				} 
			})
		}
	} else {
		Util.title(to.meta.title);
		next();
	}
});

router.afterEach(() => {
	iView.LoadingBar.finish();
	window.scrollTo(0, 0);
});


Vue.prototype.$ajax = axios;

const store = new Vuex.Store({
	state: {
		user:{},
		api:'http://localhost:3000/api',
		imgPath:'http://orj2fu6qw.bkt.clouddn.com/'
	},
	getters: {

	},
	mutations: {

	},
	actions: {

	}
});


new Vue({
	el: '#app',
	router: router,
	store: store,
	render: h => h(App)
});
