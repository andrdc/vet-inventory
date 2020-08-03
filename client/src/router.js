import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Brands from "./components/Brands.vue";
import CreateBrand from "./components/CreateBrand.vue";
import Foods from "./components/Foods.vue";
import CreateFood from "./components/CreateFood.vue";
import CreateFoodInstance from "./components/CreateFoodInstance.vue";
import Leashes from "./components/Leashes.vue";
import CreateLeash from "./components/CreateLeash.vue";
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
			path: "/food/create",
			name: "create-food",
			component: CreateFood
		},
		{
			path: "/food-instance/create",
			name: "create-food-instance",
			component: CreateFoodInstance
		},
		{
			path: "/leashes",
			name: "leashes",
			component: Leashes
		},
		{
			path: "/leash/create",
			name: "create-leash",
			component: CreateLeash
		},
		{
			path: "*",
			name: "not found",
			component: NotFound
		}
	]
});
