<template>
	<aside class="main_info left">
		<header class="top_title bg-secondary left columns">
			<h4 class="column my-0 ">Proyectos</h4>
      <button @click="() => {isNew = true; showModal() }" class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
		</header>
			<section class="panel">
			<ul class="panel-body">
        <li v-for="project in projects" @click="description($event)" :id="project.keyname" :key="project.keyname" class="bg-blue columns px-4"><h5 class="column m-2"><b>{{project.denominacion}}</b></h5></li>
			</ul>
		</section>
    <Window 
      position="right"
			 v-show="isModalVisible"
        @close="closeModal">
        <template  slot="header"><h2 class="my-0">{{ isNew ? "Nuevo Proyecto" : current.denominacion}}</h2></template>
			<NewProyect v-if="isNew" slot="body" @send="reload"/>
      <section v-else slot="body" class="body-relative" style="position:relative">
        <button style="position: absolute; right: 0; top: 0" @click="editable = true">edit</button>

        <div class="panel-header ">
				<h3 role="title"> Nombre de proyecto </h3>
				<ul>
          <li><b> Descripcion  y pautas </b><span id="description" @input="onInput($event)" ref="description" :contenteditable="editable">descripcion</span></li>
          <li><b> status </b><span id="status" @input="onInput($event)" ref="status" :contenteditable="editable">{{current.status}}</span></li>
          <li><b> Fecha de Inicio </b><span id="start_date" @input="onInput($event)" ref="start_date" :contenteditable="editable">{{current.start_date}}</span></li>
          <li><b> Fecha de finalizacion estimada </b><span id="finish_date" @input="onInput($event)" ref="finish_date" :contenteditable="editable">{{current.finish_date}}</span></li>
					<li><b> Duracion (estimada) </b>ni idea we</li>
        </ul>
      </div>
            <Tasks :proyect="current.keyname"/>
       			</section>
		</Window>
	</aside>
</template>

<script>

import {projects, tasks, employees} from '../../tools/alls'
import NewProyect from './NewProyect'
import Tasks from '../Tasks/Tasks'
// import rrhhReq from './server/config'

export default {
  name: 'Proyectos',
  props: {
    msg: String
  },
  components: {
    NewProyect
    , Tasks
  },
  methods: {
onFile(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
      this.form.doc = files[0]
      console.log(files)
      },
    onInput(e) {
      this.toEdit[e.currentTarget.id] = e.target.innerText
    },
    cancel () {
      this.editable = false
      Object.keys(this.toEdit).forEach(x => this.$refs[x].innerText  = this.current[x])
         this.toEdit = {}
    },

    createTask(e) {
      const self = this
        e.preventDefault();

       const bodyData = {
          ...new FormData(),
         ...this.newTask,
         proyect: this.current.keyname
       }
        // formdata.append('user',this.user);
        // formdata.append('pass',this.pass);
  	const headers = {
  		
      method: 'POST',  
      headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(bodyData)
  	}
        fetch("http://localhost:8081/rrhh_api/task/new", headers)
        .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => {
              tasks(self.current.keyname).then(function(res){
              self.taskList = res
              return res;
            })
          })
              this.newTask = {}

   }, 
 
    description(e) {
      this.isNew = false;
      this.current = this.projects.filter(x => x.keyname == e.currentTarget.id)[0]
      console.log(this.current)
      const self = this
      tasks(e.currentTarget.id).then(function(res){
        self.taskList = res
        return res;
      })
      this.showModal();
      console.log(this.current.keyname)
    },
    reload() {
      var self = this;
       projects().then(function(res){
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
      },
     currentEmployee (x){
      let emp = this.employees.filter(y=> y.id == x)[0]
      return emp.name + " " + emp.lastname
    }
    },
     data () {
      return {
        isModalVisible: false,
        isNew: true,
        projects: [],
        current : {},
        taskList: [],
        employees : [],
        newTask: {},
        editable: false
      }   
  },
  computed: {
  } ,
  mounted() {
      var self = this;
       projects().then(function(res){
      self.projects = res
     return res; 
    })
    employees().then(function(res){
      self.employees = res
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
.aside
  margin: 2em
  margin-right: 0
  box-shadow: 0px 0px 0px 4px #c0c0c0c0
  border: none
</style>
