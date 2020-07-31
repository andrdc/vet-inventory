import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Brands from "./components/Brands.vue";
import CreateBrand from "./components/CreateBrand.vue";
import Foods from "./components/Foods.vue";
import Leashes from "./components/Leashes.vue";
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
			path: "/brand/create",
			name: "create-brand",
			component: CreateBrand
		},
		{
			path: "/foods",
			name: "foods",
			component: Foods
		},
		{
			path: "/leashes",
			name: "leashes",
			component: Leashes
		},
		{
			path: "*",
			name: "not found",
			component: NotFound
		}
	]
});
