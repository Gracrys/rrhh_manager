<template>
	<aside class="main_info">
		<header class="top_title right">
			<h4>Empleados</h4>
			<button @click="showModal">+</button>
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
			<section slot="body">
				
				<ul>
					<li>Data</li>
				</ul>
			</section>
		</Window>
	</aside>
</template>

<script>
	
export default {
  name: 'Empleados',
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
        isForm: false
      }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

   
</style>
