<template>
    <Navbar/>
    <div class="soda-detail flex justify-center items-center h-screen bg-gray-100 w-full">
      <div
        class="
          bg-white
          shadow-md
          h-100
          mx-3
          rounded-3xl
          flex flex-col
          justify-around
          items-center
          overflow-hidden
          sm:flex-row sm:h-82 sm:w-3/5
          md:w-100
        "
      >
        <img
          class="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gjONyDo0FJuOuR4QhMipwDzBZJMyuvuYrnx_4528_P9zDxrZNA_B_MOnEEKynnytX4w&usqp=CAU"
          alt="image"
        />

        <div
          class="
            flex-1
            w-full
            flex flex-col
            items-baseline
            justify-around
            h-1/2
            pl-6
            sm:h-full sm:items-baseline sm:w-1/2
          "
        >
          <div class="flex flex-col justify-start items-baseline">
            <h1 class="text-lg font-normal mb-0 text-gray-600 font-sans">
              {{ soda.name }}
            </h1>
            <span class="text-ls text-indigo-300 mt-0">by Soda's Life</span>
          </div>
          <p class="text-ls text-left text-gray-500 w-4/5">
            {{ soda.description }}
          </p>
          <div class="w-full flex justify-between items-center">
            <h1 class="font-bold text-gray-500">2,00€</h1>
          </div>
        </div>
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
    soda: {},
  }),

  mounted() {
    const sodaId = this.$route.params.id
    axios.get(API_URL+sodaId)
      .then(response => {
        console.log(response)
        this.soda = response.data
        })
      .catch(error => console.log(error))
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.soda-detail {
    height: 90vh;
}
</style>
