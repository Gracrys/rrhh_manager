<template>
	<aside class="main_info left">
		<header class="top_title left">
			<h4>Proyectos</h4>
			<button @click="fetching">+</button>
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
				<h3 role="title"> Nombre de proyecto </h3>
				<ul>
					<li><b> Descripcion </b>rip man</li>
					<li><b> Tipo </b>rip man</li>
					<li><b> Fecha de Inicio </b>rip man</li>
					<li><b> Fecha de finalizacion estimada </b>rip man</li>
					<li><b> Duracion (estimada) </b>rip man</li>
				</ul>
				<ul>
					<li>(Nombre)</li>
					<li>descripcion</li>
				</ul>
			</section>
		</Window>
	</aside>
</template>

<script>
import NewProyect from './NewProyect'
// import rrhhReq from './server/config'

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
	  	fetching() {
	  		const headers = {
      
    method: 'GET',
       headers: {...new Headers(), secretKey: "NaughtyToxicroak", 'Accept': 'application/json',
    'Content-Type': 'application/json',
   },
       mode: 'cors',
    }
    fetch("http://79.147.33.236/?secretkey=oh", headers)
        .then(res => res.text())
        .then(res => console.log(res))
    }
    },
     data () {
      return {
        isModalVisible: false,
        isNew: false,
        projects: {}
      }   
  },
   
  mounted() {
  
  	const headers = {
  		
		method: 'GET',
       headers: {...new Headers(), secretKey: "NaughtyToxicroak", 'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache': 'no-cache'
   },
       mode: 'cors',
		  credentials: 'include'
  	}
  	fetch("http://localhost:8081/rrhh_api", headers)
        .then(res => res.text())
        .then(res => console.log(res))
        
    
  }
}
</script>

<style scoped lang="sass">

   
</style>
