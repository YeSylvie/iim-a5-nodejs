<template>
<Navbar/>
    <div class="flex items-center justify-center form-login">
        <div class="w-full max-w-md">
          <form class="bg-white shadow-xl rounded px-12 pb-8 mb-4">
            <div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                Page de connexion
            </div>
            <div class="pb-4">
                <p v-if="errors.length">
                    <b class="text-red-400" >Merci de corriger l'/les erreur(s) suivantes:</b>
                    <ul>
                        <li v-for="error in errors" v-bind:key="error">- {{ error }}</li>
                    </ul>
                </p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-normal mb-2" for="email">Email</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-control"
                    name="email"
                    v-model="email"
                    type="text"
                    required
                    autofocus
                    placeholder="Email"
                />
            </div>
            <div class="mb-6 form-group">
                <label class="block text-gray-700 text-sm font-normal mb-2" for="password">Mot de passe</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline form-control"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    autocomplete="current-password"
                />
            </div>
            <div class="flex items-center justify-end form-group">
                <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" @click.prevent="handleLogin()">Connexion</button>
            </div>
          </form>
        </div>
      </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';

export default {
    name: "Login",
    components: {
        Navbar
    },
    data() {
        return {
            errors: [],
            email: '',
            password: ''
        };
    },
    methods: {
        handleLogin() {
            if (this.email && this.password) {
                const user = {email: this.email, password: this.password}
                axios
                .post("http://localhost:8081/user/login", user)
                .then(response => {
                    localStorage.setItem('userData', JSON.stringify(response.data));
                    this.$router.push("/");
                })
                .catch(err => console.log(err))
            }
            this.errors = [];

            if (!this.email) {
                this.errors.push('Email Obligatoire');
            }
            if (!this.password) {
                this.errors.push('Mot de passe obligatoire');
            }
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-login {
    height: 90vh;
}
</style>
