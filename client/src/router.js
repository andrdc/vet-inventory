import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import About from "./views/About.vue";
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
			path: "/about",
			name: "about",
			component: About
		},
		{
			path: "*",
			name: "not found",
			component: NotFound
		}
	]
});
