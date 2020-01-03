<template>
	<aside class="main_info left">
		<header class="top_title bg-secondary left columns">
      <h4 class="column my-0 py-0 ">Proyectos</h4>
      <button @click="() => {isNew = true; showModal() }" class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
		</header>
			<section class="panel">
			<ul class="panel-body">
        <li v-for="project in projects" @click="description($event)" :id="project.keyname" :key="project.keyname" class="bg-blue columns px-4 mt-0"><h5 class="column mx-2 py-0 mt-2"><b>{{project.denominacion}}</b></h5></li>
			</ul>
		</section>
    <Window 
      position="right"
			 v-show="isModalVisible"
        @close="closeModal">
        <template  slot="header"><h2 class="my-0">{{ isNew ? "Nuevo Proyecto" : current.denominacion}}</h2></template>
			<NewProyect v-if="isNew" slot="body" @send="reload"/>
      <section v-else slot="body" class="body-relative" >

        <div class="panel-header ">
          <details style="position:relative">
            <button style="position: absolute; right: 0; top: 0" @click="() =>{if(currentUser.admin_type !== 3) editable = true}">edit</button>
          <h3 role="title" id="denominacion" @input="onInput($event)" ref="denominacion" :contenteditable="editable"> {{current.denominacion}} </h3>
				<ul>
          <li><b> Descripcion  y pautas </b><span id="description" @input="onInput($event)" ref="description" :contenteditable="editable">{{current.description ? current.description : "descripción "}}</span></li>
          <li><b> status </b>
             <select v-if="editable"  @change="onChange($event)" :value="current.status" type="text" id="status" name="status" ref="status"  class=" select is-small py-0 form-date column col-6" >
                <option value="0" >Eliminada</option>
                <option value="1" selected="selected" default>En proceso</option>
                <option value="2">Finalizado</option>
                <option value="3">Por completar</option>
              </select>

            <span id="status" v-else @input="onInput($event)" ref="status" >{{current.status}}</span></li>
          <li><b> Fecha de Inicio </b>
            <input v-if="editable" id="start_date" type="date" ref="start_date" @change="onChange($event)" :value="current.start_date.split('T')[0]">
            <span id="start_date"  ref="start_date"  v-else>{{current.start_date.split('T')[0]}}</span></li>
          <li><b> Fecha de finalizacion estimada </b>
            <input v-if="editable" id="finish_date" type="date" ref="finish_date" @change="onChange($event)" :value="current.finish_date.split('T')[0]">
            <span id="finish_date"  ref="finish_date" v-else>{{current.finish_date.split("T")[0]}}</span></li>
      </ul>
        <footer>
          <button @click="cancel">cancelar</button>
          <button @click="update">Actualizar</button>    
        </footer>
</details>
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
import {env} from '../../tools/env.js'
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
    onChange(e){
     this.toEdit[e.currentTarget.id] =  e.currentTarget.value
      console.log(e.currentTarget.value)
    },
    onFile(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
      this.form.doc = files[0]
      console.log(files)
      },
    onInput(e) {
      this.toEdit[e.currentTarget.id] = e.target.innerText
      console.log(this.toEdit)
    },
    cancel () {
      this.editable = false
      Object.keys(this.toEdit).forEach(x => this.$refs[x].innerText  = this.current[x])
         this.toEdit = {}
    },
    update(){
      
       const bodyData = {
        
         keyname : this.current.keyname,
        update: this.toEdit
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
      if(Object.entries(this.toEdit).length > 0) {fetch("http://" + env.ip + ":8081/rrhh_api/proyects/update", headers)
        .then(res => res.json())
          .then(res => res )
          .catch(x => console.warn(x))
          .finally(x => this.$emit('send'))
}
          this.editable = false
         // Object.keys(this.toEdit).forEach(x => this.$refs[x].innerText  = this.current[x])
//        this.toEdit = {}
     
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
        if(!this.editable)
        this.isModalVisible = true;
      },
      closeModal() {
        if(!this.editable)
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
        editable: false,
        toEdit: {}
      }   
  },
  computed: {
    currentUser (){
      return this.$store.state.currentUser
    },
  },
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
