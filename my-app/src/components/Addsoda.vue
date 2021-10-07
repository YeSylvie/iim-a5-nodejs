<template>
    <Navbar/>
    <div class="flex items-center justify-center form-login">
        <div class="w-full max-w-md">
          <form class="bg-white shadow-xl rounded px-12 pb-8 mb-4">
            <div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                Ajoute ton soda !
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-normal mb-2" for="email">Nom du soda</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-control"
                    name="name"
                    v-model="name"
                    type="text"
                    required
                    autofocus
                    placeholder="Un nom qui donne envie"
                />
            </div>
            <div class="mb-6 form-group">
                <label class="block text-gray-700 text-sm font-normal mb-2" for="password">Description</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline form-control"
                    v-model="description"
                    type="textarea"
                    placeholder="Pour que ça nous donne l'eau à la bouche"
                    name="description"
                    required
                />
            </div>
            <div class="flex items-center justify-end form-group">
                <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" @click.prevent="addSoda()">Ajouter</button>
            </div>
          </form>
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
    name: '',
    description: ''
  }),

  mounted() {
    axios.post(API_URL)
      .then(response => {
        this.soda = response.data
        })
      .catch(error => console.log(error))
  },
  methods: {
        addSoda() {
            const soda = {name: this.name, description: this.description}
            console.log("Je suis là 1", soda)
            const config = {
                headers: { Authorization : `Bearer `+ JSON.parse(localStorage.userData).token}
            }
            axios
                .post(API_URL, soda, config)
                .then(response => {
                    console.log("Je suis là 2", response.data)
                    this.$router.push("/");
                })
                .catch(err => console.log(err))
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-login {
    height: 90vh;
}
</style>
