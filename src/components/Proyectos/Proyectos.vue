<template>
	<aside class="main_info left">
		<header class="top_title bg-secondary left columns">
			<h4 class="column my-0 ">Proyectos</h4>
      <button @click="() => {isNew = true; showModal() }" class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
		</header>
			<section class="panel">
			<ul class="panel-body">
        <li v-for="project in projects" @click="description" :key="project.keyname" class="bg-blue columns px-4"><h5 class="column m-2"><b>{{project.denominacion}}</b></h5></li>
			</ul>
		</section>
    <Window 
      position="right"
			 v-show="isModalVisible"
        @close="closeModal">
        <template  slot="header"><h2>Nuevo Proyecto</h2></template>
			<NewProyect v-if="isNew" slot="body" @send="reload"/>
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

import {projects} from '../../tools/alls'
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
    description() {
      this.isNew = false;
      this.showModal();
    },
    reload() {
      var self = this;
       projects().then(function(res){
      console.log(res)
      self.projects = res
     return res; 
    })
    },
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
        projects: [] 
      }   
  },
   
  mounted() {
      var self = this;
       projects().then(function(res){
      console.log(res)
      self.projects = res
     return res; 
    })

  
  	const headers = {
  		
        method: 'POST',
       headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include'
  	}
      /*    fetch("http://localhost:8081/rrhh_api/projects/all", headers)
        .then(res => res.json())
          .then(res => this.projects = res)
          .catch(x => console.warn(x))
          .finally(x => console.log(x))
        
       */
  }
}
</script>

<style scoped lang="sass">
ul.panel-body
  margin: 2em -1em 0
.px-4 
  padding-right: 2em
  padding-left: 2em
</style>
