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
        <div id="threejs" ref="threejs" class="sm:h-100 sm:w-1/2 object-cover">
        </div>
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
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const API_URL = "http://localhost:8081/sodas/";

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data: () => ({
    error: "",
    soda: {},
     publicPath: process.env.BASE_URL
  }),

  mounted() {
    const canvas = this.initCanvas()
    const scene = canvas.scene

    this.initLightning(scene)
    this.initObject(scene)
    this.render(canvas)

    const sodaId = this.$route.params.id
    axios.get(API_URL+sodaId)
      .then(response => {
        this.soda = response.data
        })
      .catch(error => console.log(error))

    window.addEventListener("resize", () => {
      this.resizeCanvas(canvas.renderer)
    });
  },
  methods: {
    initCanvas: function() {
        const div = this.$refs.threejs
        const width = div.offsetWidth
        const height = div.offsetHeight

        console.log(width, height)

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
        camera.position.setZ(20)
        camera.position.setY(7)
        camera.position.setX(0)

        const renderer = new THREE.WebGLRenderer()
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)

        div.appendChild(renderer.domElement)



        return {scene, camera, renderer}
    },
    initLightning: function(scene) {
      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(20, 20, 20)

      const ambientLight = new THREE.AmbientLight(0xf1f1f1)

      scene.add(ambientLight)
      scene.add(pointLight)
    },
    initObject: function(scene) {
      const loader = new GLTFLoader()
      loader.load(
        `${this.publicPath}soda_can/scene.gltf`, 
        function(gltf) {
            const obj = gltf.scene

            scene.add(obj)

            obj.rotation.x += 0.7

            const animateObj = function() {
                requestAnimationFrame(animateObj)
                obj.rotation.y += 0.025
            }

            animateObj()
        }, 
        undefined, 
        function(error) {
            console.error(error)
        }
      )
    },
    render: function(canvas) {
      requestAnimationFrame(() => this.render(canvas))

      const scene = canvas.scene
      const camera = canvas.camera
      const renderer = canvas.renderer

      renderer.render(scene, camera)
    },
    resizeCanvas: function(renderer) {
      const div = this.$refs.threejs
      const width = div.offsetWidth
      const height = div.offsetHeight

      renderer.setSize(width, height)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.soda-detail {
    height: 90vh;
}

#threejs {
  height: 40vh;
}
</style>
