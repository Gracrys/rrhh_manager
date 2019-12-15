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
      <section v-else slot="body" class="panel aside">
        <div class="panel-header ">
				<h3 role="title"> Nombre de proyecto </h3>
				<ul>
					<li><b> Descripcion  y pautas </b>descripcion</li>
					<li><b> status </b>{{current.status}}</li>
          <li><b> Fecha de Inicio </b>{{current.start_date}}</li>
					<li><b> Fecha de finalizacion estimada </b>{{current.finish_date}}</li>
					<li><b> Duracion (estimada) </b>ni idea we</li>
        </ul>
        <details>
        <form action="">
          <input placeholder="descripcion" required type="text" v-model="newTask.title"> 
          <label>Fecha de entrega
          <input type="date"  v-model="newTask.due_date">
        </label>
        <label> asignado a
          <select id="" name=""  v-model="newTask.asignee"><option  v-for="employee in employees" :value="employee.id">{{employee.name + " " + employee.lastname}}</option></select>
          </label>
          <textarea v-model="newTask.description" id="" name="" placeholder="escriba una descripcion detallada" cols="30" rows="3"></textarea>

          <label for="">
            Estado de la tarea
            <select id="" required name="" v-model="newTask.status">
              <option value="1">Completado</option>
              <option value="2">Por completar</option>
              <option value="3">En proceso</option>
              <option value="4">No aplica</option>
              <option value="0">Eliminado</option>
          </select>
        </label>
          <button @click="createTask($event)">Nueva Tarea</button>
        </form>
        </details>
        </div>
        <div class="panel-body">
        <h5> Tareas</h5>
          <ul>
            <li v-for="task in taskList" :key="task.id" class="card">
              <div class="card-header">{{task.title}}</div>
              <div class="card-body">{{task.description}}
                <b>{{currentEmployee(task.asignee)}}</b>
              </div>
            </li>
          </ul>
        </div>
			</section>
		</Window>
	</aside>
</template>

<script>

import {projects, tasks, employees} from '../../tools/alls'
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
      console.log(bodyData)
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
              console.log(res)
              self.taskList = res
              return res;
            })
          })
              this.newTask = {}

   }, 
 
    description(e) {
      this.isNew = false;
      this.current = this.projects.filter(x => x.keyname == e.currentTarget.id)[0]
      const self = this
      tasks(e.currentTarget.id).then(function(res){
        console.log(res)
        self.taskList = res
        return res;
      })
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
      },
     currentEmployee (x){
      let emp = this.employees.filter(y=> y.id == x)[0]
        console.log(this.employees, emp)
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
        newTask: {}
      }   
  },
  computed: {
  } ,
  mounted() {
      var self = this;
       projects().then(function(res){
      console.log(res)
      self.projects = res
     return res; 
    })
    employees().then(function(res){
      console.log(res)
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
