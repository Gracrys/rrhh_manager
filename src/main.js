import Vue from 'vue'
import App from './App.vue'
import './assets/sass/App.sass';
import Window from './components/Window.vue'

Vue.config.productionTip = false

Vue.component('Window', Window)
new Vue({
  render: h => h(App),
}).$mount('#app')



