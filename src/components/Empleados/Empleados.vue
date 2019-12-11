<template>
	<aside class="main_info  right">
		<header class="top_title bg-secondary right columns">
      <button @click="showModal"class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
			<h4 class="column my-0 ">Empleados</h4>
		</header>
		<section>
			<ul>
				<li></li>
			</ul>
		</section>
		<Window 
			position="left"
			 v-show="isModalVisible"
		        @close="closeModal">
			<header  slot="name"><h1> Jose Perez</h1></header>
			<NewEmpleado v-if="isNew" slot="body"/>

			<section v-else slot="body">
				<h3 role="title">Empleado 1</h3>
				<b>Proyectos</b>
				<ul>
					<li>Data</li>
				</ul>
			</section>
		</Window>
	</aside>
</template>

<script>
import NewEmpleado from './NewEmpleado'

export default {
  name: 'Empleados',
  components: {
  	NewEmpleado
  },
  props: {
    msg: String
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

   
</style>
