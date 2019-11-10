<template>
	<aside class="main_info">
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
			<section slot="body">
				
				<ul>
					<li>rip man</li>
				</ul>
			</section>
		</Window>
	</aside>
</template>

<script>

export default {
  name: 'Proyectos',
  props: {
    msg: String
  },
  components: {
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

<style scoped lang="sass">

   
</style>
