<template>
    <Navbar/>
    <div class="">
        <div class="flex flex-col bg-white">
            <div id="chat" class="flex flex-col mt-2 flex-col-reverse overflow-y-scroll space-y-3 mb-2 pb-3 " v-for="chat in chats" :key="chat._id">
                <div class="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-600 mr-auto rounded-2xl p-2 text-white">
                    {{chat.email}} : {{chat.message}}
                </div>
            </div>
            <form @submit="onSubmit" class="flex flex-row  items-center bottom-0 my-2 w-full">
                <div class="ml-2 flex flex-row border-gray items-center w-full border rounded-3xl h-12 px-2">
                    <div class="w-full">
                        <input
                        type="text"
                        id="message"
                        class="border-2 rounded-2xl border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                        placeholder="Écris ton message...."
                        v-model="chat.message"
                        />
                    </div>
                </div>
                <div>
                    <button id="self" class="flex items-center justify-center h-10 w-10 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white focus:outline-none">
                        <svg
                        class="w-5 h-5 transform rotate-90 -mr-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Navbar from './Navbar.vue'
import * as io from 'socket.io-client'
const API_URL = "http://localhost:8081/chatroom/";

export default {
    name: 'ChatRoom',
    components: {
        Navbar
    },
    data: () => ({
        chats: [],
        errors: [],
        email: '',
        chat: {},
        socket: io('http://localhost:3000')
    }),
    created () {
        const config = {
            headers: { Authorization : `Bearer `+ JSON.parse(localStorage.userData).token}
        }
        axios.get(API_URL, config)
        .then(response => {
            this.chats = response.data
            console.log(this.chats)
        })
        .catch(e => {
            this.errors.push(e)
        })
        this.socket.on('new-message', function (data) {
            this.chats.push(data.message)
        }.bind(this))
    },
    mounted() {
        this.email = this.$route.params.email
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault()
            this.chat.email = this.email
            const config = {
                headers: { Authorization : `Bearer `+ JSON.parse(localStorage.userData).token}
            }
            axios.post(API_URL, this.chat, config)
            .then(response => {
                console.log(response)
                this.socket.emit('save-message', this.chat)
                this.chat.message = ''
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll {
    height: 200px;
    width: 200px;
}
</style>
