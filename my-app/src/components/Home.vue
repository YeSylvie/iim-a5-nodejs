<template>
  <Navbar/>
  <button v-if="isToken === true" class="bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-white font-bold py-1 px-3 rounded text-xl transition duration-300 ease-in-out hover:from-indigo-600 hover:via-pink-600 hover:to-red-500">
    <router-link to="/addsoda">
      Ajouter
    </router-link>
    </button>
  <div class="w-2/3 mx-auto">
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
        <thead>
          <tr>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Soda</th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-grey-lighter" v-for="soda in sodas" :key="soda._id">
            <td class="py-4 px-6 border-b border-grey-light">{{ soda.name }}</td>
            <td class="py-4 px-6 border-b border-grey-light">
              <router-link :to="`/soda/${soda._id}`" class="border-2 border-blue-400 text-blue-400 font-bold py-1 px-3 rounded text-xs transition duration-300 ease-in-out hover:bg-blue-400 hover:text-white">Détail</router-link>
              <a href="#" v-if="isToken === true" class="border-2 border-purple-400 text-purple-400 font-bold py-1 px-3 ml-1 rounded text-xs transition duration-300 ease-in-out hover:bg-purple-400 hover:text-white">Modifier</a>
              <a href="#" v-if="isToken === true" class="border-2 border-pink-400 text-pink-400 font-bold py-1 px-3 ml-1 rounded text-xs transition duration-300 ease-in-out hover:bg-pink-400 hover:text-white">Supprimer</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Navbar from './Navbar.vue'
const API_URL = "http://localhost:8081/sodas";

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data: () => ({
    error: "",
    sodas: [],
    isToken: false
  }),

  mounted() {
    axios.get(API_URL)
      .then(response => {
        console.log(response)
        this.sodas = response.data
        })
      .catch(error => console.log(error))

    if(localStorage.userData) {
      this.isToken = true;
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
