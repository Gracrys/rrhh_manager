<template>
  <main id="app">
  <Header />
  <section>
    <Proyectos></Proyectos>
    <Empleados></Empleados>

    <Window
        v-show="isModalVisible"
        @close="closeModal"
        position="left"
      />
    </section>
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/header/Header.vue'
import Window from './components/Window.vue'
import Proyectos from './components/Proyectos/Proyectos'
import Empleados from './components/Empleados/Empleados'


export default {
  name: 'app',
  components: {
    HelloWorld,
    Header,
    Window,
    Proyectos,
    Empleados
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
