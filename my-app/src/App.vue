<template>
  <router-view/>
</template>

<script>
// import io from 'socket.io-client'
import * as io from 'socket.io-client'

export default {
  name: 'App',
  data () {
    return {
      socket: io('http://localhost:3000')
    }
  },
  components: {
  },
  methods: {
    sendMessage(e) {
      e.preventDefault()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
