<template>
  <nav>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
    <div class="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
      <router-link to="/" class="ml-8 text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hidden md:flex">Soda's Life</router-link> 
      <span class="w-screen md:w-1/3 h-10 bg-yellow-200 cursor-pointer border-2 border-yellow-500 text-sm rounded-full flex">
        <input type="search" name="serch" placeholder="Cette barre de recherche ne fonctionne pas, elle est là pour la déco :3"
          class="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none">
        <i class="fas fa-search m-3 mr-5 text-lg text-yellow-500 w-4 h-4">
        </i>
      </span>
      <div class="flex flex-row-reverse mr-4 ml-4 md:hidden">
        <i class="fas fa-bars"></i>
      </div >
        <div class="flex flex-row-reverse mr-8 hidden md:flex" v-if="isToken === false">
          <router-link to="/login" class="border-2 border-green-400 text-green-400 text-center rounded-lg px-4 py-2 m-2 transition duration-300 ease-in-out hover:bg-green-400 hover:text-white">Se connecter</router-link>
          <router-link to="/signup" class="border-2 border-green-400 text-green-400 text-center rounded-lg px-4 py-2 m-2 transition duration-300 ease-in-out hover:bg-green-400 hover:text-white">S'inscrire</router-link>
        </div>
        <div class="flex mr-8 hidden md:flex" v-if="isToken === true">
          <button> 
            <router-link :to="`/chatroom/${userEmail}`">
              <ChatIcon class="h-8 w-8 text-yellow-400"/>
            </router-link>
          </button>
          <router-link to="/" class="text-lg text-gray-700 hidden md:flex px-4 py-2 m-2">{{ userEmail }}</router-link> 
          <button @click.prevent="logout()">
            <LogoutIcon class="h-8 w-8 text-green-500"/>
          </button>
        </div>
    </div>
  </nav>
</template>

<script>
import { LogoutIcon, ChatIcon } from '@heroicons/vue/outline'

export default {
    name: 'Navbar',
    components: {
      LogoutIcon,
      ChatIcon
    },
    data: () => ({
      isToken: false,
      userEmail: ''
    }),
    mounted() {
        if(localStorage.userData) {
          this.isToken = true;
          this.userEmail = JSON.parse(localStorage.userData).userEmail
        }
    },
    methods: {
      logout() {
        localStorage.removeItem('userData')
        this.$router.push("/");
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
