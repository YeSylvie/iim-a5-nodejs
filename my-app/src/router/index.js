import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue"
import Login from "@/components/Login.vue"
import Signup from "@/components/Signup.vue"
import Soda from "@/components/Soda.vue"
import Addsoda from "@/components/Addsoda.vue"
import Updatesoda from "@/components/Updatesoda.vue"
import ChatRoom from '@/components/Chatroom.vue'

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
        path: "/soda/:id",
        name: "Soda",
        component: Soda
    },
    {
        path: "/addsoda/",
        name: "Addsoda",
        component: Addsoda
    },
    {
        path: "/updatesoda/:id",
        name: "Updatesoda",
        component: Updatesoda
    },
    {
      path: '/chatroom/:email',
      name: 'ChatRoom',
      component: ChatRoom
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;

