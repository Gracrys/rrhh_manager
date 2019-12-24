<template>
	<aside class="main_info  right">
		<header class="top_title bg-secondary right columns">
      <button @click="() => {isNew = true; showModal()}"class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
			<h4 class="column my-0 py-0">Empleados</h4>
		</header>
		<section class="panel">
			<ul class="panel-body">
        <li v-for="employee in employees" :id="employee.id" @click="description($event)" class="bg-blue columns px-2 mt-0 "><h5 class="column mx-2 py-0 mt-2"><b>{{employee.name + ' ' + employee.lastname}}</b></h5></li>
			</ul>
		</section>
		<Window 
			position="left"
			 v-show="isModalVisible"
		        @close="closeModal">
			<template  slot="header"><h2 class="my-0"> {{isNew ? "Nuevo Empleado" : current.name + " " + current.lastname + " #" + current.id}} </h2></template>
			<NewEmpleado v-if="isNew" slot="body" @send="reload"/>

      <section v-else slot="body" class="body-relative" style="position:relative">
        <button style="position: absolute; right: 0; top: 0" @click="editable = true">edit</button>
        <h5 role="title"><b>Datos:</b></h5>
        <ul>
          <li v-if="editable"><b  >Nombre y apellido: </b> <span id="name" @input="onInput($event)" ref="name" :contenteditable="editable">{{current.name + "  "}}</span>
          <span id="lastname" @input="onInput($event)" ref="lastname" :contenteditable="editable">{{current.lastname}}</span>
          </li>
          <li ><b  >Especialización: </b> <span id="specialization" @input="onInput($event)" ref="specialization" :contenteditable="editable">{{current.specialization}}</span></li>
          <li ><b >Dirección: </b> <span @input="onInput($event)"  id="address" ref="address" :contenteditable="editable">{{current.address}} </span></li>
          <li  ><b >Telefono: </b> <span ref="telephone" id="telephone" @input="onInput($event)" :contenteditable="editable"> {{current.telephone}} </span></li>
          <li  ><b >Correo Electronico: </b> <span ref="email" id="email" @input="onInput($event)" :contenteditable="editable" >{{current.email}}</span></li>

          
              <li  ><b >CI O DNI: </b><span ref="CI" id="CI"  contenteditable="editable"> {{current.CI}}</span></li>
              <li ><b >Fecha de Ingreso: </b>
                <input v-if="editable" id="initial_date" type="date" ref="initial_date" @change="onChange($event)" :value="current.initial_date.split('T')[0]">

                <span ref="initial_date" id="initial_date" @input="onInput($event)" :contenteditable="editable">{{current.initial_date ? current.initial_date.split("T")[0] : current.initial_date}}</span></li>
            </ul>
          <footer class="mb-2">
          <button @click="cancel">cancelar</button>
          <button @click="update">Actualizar</button>    
        </footer>
				<b class="mt-2">Proyectos</b>
				<ul class="mt-2">
         <li v-if="projects.length == 0">No hay proyectos asignados</li>
          <li v-for="proyect in projects" :key="proyect.id" v-else class="card">
              <div class="card-header">{{proyect.denominacion}}</div>
              <div class="card-body">{{proyect.description}}
              </div>
            </li>

				</ul>
			</section>
		</Window>
	</aside>
</template>

<script>
import NewEmpleado from './NewEmpleado'

import {employees} from '../../tools/alls'
import {env} from '../../tools/env.js'

export default {
  name: 'Empleados',
  components: {
  	NewEmpleado
  },
  methods: {
    onChange(e){
     this.toEdit[e.currentTarget.id] =  e.currentTarget.value
      console.log(e.currentTarget.value)
    },

    onInput(e) {
      this.toEdit[e.currentTarget.id] = e.target.innerText
    },
    cancel () {
      this.editable = false
      Object.keys(this.toEdit).forEach(x => this.$refs[x].innerText  = this.current[x])
         this.toEdit = {}
    },
       update() {

       const bodyData = {
        
         id : this.current.id,
         ...this.toEdit
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
         if(Object.entries(this.toEdit).length >= 0) fetch("http://" + env.ip +":8081/rrhh_api/employees/update", headers)
        .then(res => res.json())
          .then(res => res )
          .catch(x => console.warn(x))
          .finally(x => this.$emit('send'))

          this.editable = false
         // Object.keys(this.toEdit).forEach(x => this.$refs[x].innerText  = this.current[x])
         this.toEdit = {}
      } ,
      description(e) {
      this.isNew = false;
     this.current = this.employees.filter(x => x.id == e.currentTarget.id)[0]
      this.showModal();


        const headers = {
  		
        method: 'POST',
       headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({id : this.current.id})
  	}
    console.log(this.current.id)
          fetch("http://"+ env.ip +":8081/rrhh_api/projects/id", headers)
        .then(res => res.json())
          .then(res => this.projects = res)
          .catch(x => console.warn(x))
          .finally(x => console.log(x))

    },

    reload() {
      var self = this;
       employees().then(function(res){
      self.employees = res
     return res; 
    })
    }, 
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        if(!this.editable)
        this.isModalVisible = false;
      },
  },
  mounted(){
    	var self = this;
       employees().then(function(res){
      self.employees = res
     return res; 
       })
    
     },
     data () {
      return {
        isModalVisible: false,
        isNew: false,
        employees: [],
        current: {},
        editable: false,
        toEdit: {},
        projects: []
      }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
ul.panel-body
  margin: 2em -8px 0
   
</style>
