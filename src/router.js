import Vue from "vue";
import Router from "vue-router";
import Login from "./components/login";
import Main from "./components/main";
import Collection from "./components/collection/collection";
import AddCollection from "./components/collection/add";
import EditCollection from "./components/collection/edit";
import Members from "./components/members";
import store from "./store";

Vue.use(Router);

export default new Router({
    base: "/admin/",
    routes: [
        {
            path: "/login/",
			component: Login
        },
        {
        	path: "/",
        	component: Main,
        	beforeEnter(to, from, next) {
        		if (store.getters.loggedIn) return next();
        		next("/login/");
        	},
        	children: [
        		{
        			path: "/collections/:name/",
        			component: Collection
        		},
                {
                    path: "/collections/:name/add/",
                    component: AddCollection
				},
				{
					path: "/collections/:name/:file/",
					component: EditCollection
				},
                {
                    path: "/members/",
                    component: Members
                }
        	]
        }
    ]
});
