import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Brands from "./components/Brands.vue";
import Foods from "./components/Foods.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/brands",
			name: "brands",
			component: Brands
		},
		{
			path: "/foods",
			name: "foods",
			component: Foods
		},
		{
			path: "*",
			name: "not found",
			component: NotFound
		}
	]
});
