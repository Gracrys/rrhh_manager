<template>
  <main id="app">
  <Header />
  <section>
    <Proyectos></Proyectos>
    <Empleados></Empleados>

    </section>
    <Auth />
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/header/Header.vue'
import Window from './components/Window.vue'
import Modal from './components/Modal.vue'
import Proyectos from './components/Proyectos/Proyectos'
import Empleados from './components/Empleados/Empleados'
import Auth from './components/Auth.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Header,
    Window,
    Proyectos,
    Empleados,
    Auth
  },
   methods: {
      showModal() {
        this.isModalVisible = true;
        this.$emit('showModal')
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
     data () {
      return {
        isModalVisible: false,
      }
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
