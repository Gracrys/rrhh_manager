<template>
	<aside class="main_info left">
		<header class="top_title bg-secondary left columns">
			<h4 class="column my-0 ">Proyectos</h4>
      <button @click="showModal" class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
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
			<template  slot="header"> its a me</template>
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
        isNew: true,
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
