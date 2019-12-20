<template>
    <div>
    <div>
	        <details>
        <form action="" v-on:submit.prevent>
          <input placeholder="descripcion" required type="text" required v-model="newTask.title"> 
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
          <div class="form-group columns"> 
      <label for="doc" class="form-label form-inline column col-6">Documento</label>
        <input type="file" name="doc" @change="onFile($event)" class="form-file column col-6">
    </div>

        </label>
        <button  @click="createTask($event)" >Nueva Tarea</button>
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
      </div>
    </template>

<script>

import {projects, tasks, employees} from '../../tools/alls'
// import rrhhReq from './server/config'

export default {
  name: 'Proyectos',
  props: {
    msg: String
  },
  components: {
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

      if(form.title && form.status){
      const self = this
       const bodyData = {
          ...new FormData(),
         ...this.newTask,
         proyect: this.current.keyname
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
      
      if(this.doc != ''){

        delete headers.headers['Content-Type']
        let fm = new FormData()
        

        fm.append("doc", this.doc)

        headers.body = fm
        console.log(headers)
        fetch("http://localhost:8081/rrhh_api/docs/new", headers)
        .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => this.doc = "")
      }
    }
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
        editable: false,
        doc: ""
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
