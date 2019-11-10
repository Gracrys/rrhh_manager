<template>
	<aside class="main_info left">
		<header class="top_title left">
			<h4>Proyectos</h4>
			<button @click="showModal">+</button>
		</header>
		<section>
			<ul>
				<li></li>
			</ul>
		</section>
		<Window 
			position="right"
			 v-show="isModalVisible"
        @close="closeModal">
			<header  slot="name"><h1> its a me</h1></header>
			<NewProyect v-if="isNew" slot="body"/>
			<section v-else slot="body">
				<h3 role="title">
				<ul>
					<li><b> Descripcion </b>rip man</li>
					<li><b> Tipo </b>rip man</li>
					<li><b> Fecha de Inicio </b>rip man</li>
					<li><b> Fecha de finalizacion estimada </b>rip man</li>
					<li><b> Duracion (estimada) </b>rip man</li>
				</ul>
			</section>
		</Window>
	</aside>
</template>

<script>
import NewProyect from './NewProyect'
export default {
  name: 'Proyectos',
  props: {
    msg: String
  },
  components: {
  	NewProyect
  },
   methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
     data () {
      return {
        isModalVisible: false,
        isNew: false
      }   
  }
}
</script>

<style scoped lang="sass">

   
</style>
