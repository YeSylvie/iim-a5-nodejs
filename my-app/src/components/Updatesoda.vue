<template>
    <Navbar/>
    <div class="flex items-center justify-center form-login">
        <div class="w-full max-w-md">
          <form class="bg-white shadow-xl rounded px-12 pb-8 mb-4">
            <div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                Modifie ton soda à ta sauce!
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
                <textarea
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline form-control"
                    v-model="description"
                    placeholder="Pour que ça nous donne l'eau à la bouche"
                    name="description"
                    required
                >
                </textarea>
            </div>
            <div class="flex items-center justify-end form-group">
                <button class="px-4 py-2 rounded text-white inline-block shadow-lg border-2 border-purple-400 text-purple-400 transition duration-300 ease-in-out hover:bg-purple-400 hover:text-white" @click.prevent="updateSoda()">Modifier</button>
            </div>
          </form>
        </div>
      </div>
</template>

<script>
import axios from "axios"
import Navbar from './Navbar.vue'
const API_URL = "http://localhost:8081/sodas/";

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
    const sodaId = this.$route.params.id
    axios.get(API_URL+sodaId)
        .then(response => {
                this.name = response.data.name
                this.description = response.data.description
            })
        .catch(error => console.log(error))
  },
  methods: {
        updateSoda() {
            const sodaId = this.$route.params.id
            const soda = {name: this.name, description: this.description}
            const config = {
                headers: { Authorization : `Bearer `+ JSON.parse(localStorage.userData).token}
            }
            axios
                .put(API_URL+sodaId, soda, config)
                .then(response => {
                    console.log(response)
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
