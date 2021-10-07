import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue"
import Login from "@/components/Login.vue"
import Profile from "@/components/Profile.vue"
import Signup from "@/components/Signup.vue"
import Soda from "@/components/Soda.vue"
import Addsoda from "@/components/Addsoda.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile
    },
    {
        path: "/soda/:id",
        name: "Soda",
        component: Soda
    },
    {
        path: "/addsoda/",
        name: "Addsoda",
        component: Addsoda
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;

