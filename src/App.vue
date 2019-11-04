<template>
  <main id="app">
  <Header />
  <Proyectos></Proyectos>
  <Empleados></Empleados>
    <img alt="Vue logo" src="./assets/logo.png">
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/header/Header.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Header
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
