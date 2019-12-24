<template>
    <div>
    <div>
	        <details>
            <summary>Crear nueva tarea</summary>
        <form action="" v-on:submit.prevent class="px-2">
          <div class="field is-grouped is-grouped-centered">
          <textarea v-model="newTask.description " required id="" name="" class="p-2 mx-2" placeholder="escriba una descripcion detallada" cols="30" rows="3"></textarea>
          <div class="control mx-2">
          <label class="label is-small" style="background:transparent">Fecha de entrega
        </label>
          <input type="date" class="input is-small" v-model="newTask.due_date">
          </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
      <div class="field">
          <div class="control mx-2">
        <label class="label is-small" style="background:transparent"> asignado a
          </label>
            <div class="select is-small">
          <select id="" name=""   v-model="newTask.asignee"><option  v-for="employee in employees" :value="employee.id">{{employee.name + " " + employee.lastname}}</option></select>
        </div>
        </div>
      </div>
      <div class="field">
          <div class="control mx-2">
          <label for="" class="label is-small" style="background:transparent">
            Estado de la tarea
            </label>
            <div class="select is-small">
            <select id="" required name=""  v-model="newTask.status">
              <option value="1">Completado</option>
              <option value="2">Por completar</option>
              <option value="3">En proceso</option>
              <option value="4">No aplica</option>
              <option value="0">Eliminado</option>
            </select>
          </div>
          </div>
          </div>
          </div>
            <hr>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
      <label for="doc" class="form-label form-inline column col-6">Documento</label>
      <textarea class="textarea" id="" name="" v-model="description"  rows="2"></textarea>
            </div>        
            <div class="file is-primary has-name is-boxed">
  <label class="file-label">
    <input type="file" name="doc" @change="onFile($event)" class="form-file file-input column col-6">
    <span class="file-cta">
      <span class="file-icon">
        <i class="fas fa-upload"></i>
      </span>
      <span class="file-label">
        Choose a file…
      </span>
    </span>
    <span class="file-name">
      {{doc.name ? doc.name : "Seleccione un archivo"}}
    </span>

  </label>
</div>
    </div>
        </label>
        <button  @click="createTask($event)" >Nueva Tarea</button>
        </form>
        </details>
        </div>
        <div class="panel-body" >
        <h5> Tareas</h5>
          <ul class="py-2" v-if="taskList.length">
            <li v-for="task in taskList" @click="info($event)" :key="task.id" :id="task.id" class="card">
              <div class="card-header">{{task.description}}
                  </div>
                <div class="card-header">            
                  <b>{{currentEmployee(task.asignee)}}</b>
              </div>
            </li>
          </ul>
          <strong v-else> No tienes tareas pendientes </strong>
        </div>
        <Window 
      position="right"
			 v-show="isModalVisible"
        @close="closeModal">
        <template  slot="header"><h2 class="my-0">Tarea #{{task[0] ? task[0].id : ""}}</h2></template>
         <Task :task="task[0]" slot="body"/> 
		</Window>

        </div>
    </template>

<script>

import {env} from '../../tools/env.js'
import {projects, tasks, employees} from '../../tools/alls'
import Task from './Task'
// import rrhhReq from './server/config'

export default {
  name: 'Proyectos',
  props: {
    msg: String
  },
  components: {
    Task
  },
  methods: {
    onFile(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
      this.doc = files[0]
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
console.log(this.proyect)
      if(this.newTask.description && this.newTask.status){
        e.preventDefault();
      const self = this
       const bodyData = {
          ...new FormData(),
                  proyect: this.proyect,

         ...this.newTask,
       }
        // formdata.append('user',this.user);
        // formdata.append('pass',this.pass);
  	const headers = {
  		
      method: 'POST',  
      headers: {...new Headers(), 
        'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(bodyData)
  	}
        fetch("http://"+ env.ip +":8081/rrhh_api/task/new", headers)
        .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => {
              tasks(self.current.keyname).then(function(res){
              self.taskList = res
              return res;
            })
          })
      
      if(this.doc != '' ){
console.log("help")
        delete headers.headers['Content-Type']
        let fm = new FormData()
        

        fm.append("doc", this.doc)
        fm.append("description", this.description)
        fm.append("taskDescription", this.newTask.description )

        headers.body = fm
        console.log(headers)
        fetch("http://" + env.ip + ":8081/rrhh_api/docs/new", headers)
        .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => this.doc = "")
      }
              this.newTask = {}
    }
   }, 
     currentEmployee (x){
       let emp = this.employees.filter(y=> y.id == x)[0]
       return  emp ?  emp.name   + " " + emp.lastname : "noname"
     },
    showModal() {
        if(!this.editable)
        this.isModalVisible = true;
      },
      closeModal() {
        if(!this.editable)
        this.isModalVisible = false;
      },
    info($event){
      this.task = this.taskList.filter(x => $event.currentTarget.id == x.id)
      this.showModal()
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
        task: {},
        newTask: {
          status: 2
        },
        editable: false,
        doc: "",
        description: ""
      }   
  },
  props: {
    proyect: {
   type: String,
        required: true
    }
  },
 watch: {
      proyect(newValue) {
        console.log(newValue)
        const self = this

        tasks(newValue).then(function(res){
          self.taskList = res
                console.warn("conseguiste uno", res)
        return res;
      })

      }
    }, 
  mounted() {
    const self = this
      tasks(this.id).then(function(res){
        self.taskList = res
        return res;
      })
      console.log("hey, i am a tasklist", this.proyect)
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
</ style>
