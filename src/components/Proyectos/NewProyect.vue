<template>
  <form class="form-group card-body" action="" >
       <div class=" field my-2  columns">
      <label for="denominacion" class="form-label form-inline column col-6">Nombre</label>
      <input type="text" required name="denominacion" class="form-input column col-6" v-model="form.denominacion">
    </div>
    <div class=" field my-2  columns">
      <label for="description" class="form-label form-inline column col-6">Descripcion</label>
      <input type="text" name="description" class="form-input column col-6" v-model="form.description">
    </div>
    <div class=" field my-2  columns">
      <label for="start_date" class="form-label form-inline column col-6">Fecha de Inicio</label>
      <input type="date" name="start_date" class="form-date input is-small column col-6" v-model="form.start_date">
    </div>
    <div class=" field my-2  columns">
      <label for="finish_date" class="form-label form-inline column col-6">Fecha final</label>
      <input type="date" name="finish_date" class="form-date input is-small column col-6" v-model="form.finish_date">
    </div>
    <div class=" field my-2  columns">
      <label for="status" class="form-label form-inline column col-6">Estatus del proyecto</label>
      <select type="text" name="status" required class=" select is-small py-0 form-date column col-6" v-model="form.status">
        <option value="0" >Eliminada</option>
        <option value="1" selected="selected" default>En proceso</option>
        <option value="2">Finalizado</option>
        <option value="3">Por completar</option>
      </select>
    </div>
    <div class=" field my-2  columns"> 
      <label for="employees" class="form-label form-inline column col-6">Integrantes</label>
      <select name="employees" multiple id="" class=" select is-multiple is-small form-date column col-6 py-0" v-model="employeesSelect">
      <option :value="employee.id" v-for="employee in employees">{{employee.name + ' ' + employee.lastname}}</option>
      </select>
    </div>
    <div class=" field my-2  columns"> 
      <label for="promotor" class="form-label form-inline column col-6">Promotor</label>
      <select name="promotor" id="" class="form-date select is-small column col-6 py-0" v-model="form.promotor">
        <option :value="employee.id" v-for="employee in employees">{{employee.name + ' ' + employee.lastname}}</option>
      </select>
    </div>
       
    <button class="btn btn-success" @click="newProyect($event)">Crear Proyecto</button>
	</form>
</template>
<script>
import {env} from '../../tools/env.js'
import {employees} from '../../tools/alls.js'
import Multiselect from 'vue-multiselect'
export default {
  name: 'NewProyect',
  components: {
    Multiselect
  },
  data() {
    return {
      form :{
        denominacion: "",
        start_date: "",
        finish_date: "",
        status: 1,
        promotor: "",
      },
      employees : [],
      employeesSelect : []

    }
  },
  methods: {
    
      newProyect(e) {
        if(this.form.status != "" && this.form.denominacion != "") {
        e.preventDefault();
        let fm = new FormData()

        fm.append("doc", this.form.doc)
       const bodyData = {
          ...new FormData(),
         id: denominacion.charAt(0) + deominacion.charAt(3) + employees.lenght + Math.floor(Math.random() * (+9 - +1)), 
         ...this.form,  
         employees: this.employeesSelect.join(",")
       }

        // formdata.append('user',this.user);
        // formdata.append('pass',this.pass);
      console.log(bodyData)
  	const headers = {
  		
        method: 'POST',
       headers: {...new Headers(),    'Cache': 'no-cache',    'Content-Type': 'application/json'
    },
       mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(bodyData)
}

       
        
fetch("http://" + env.ip + ":8081/rrhh_api/proyects/new", headers)
        .then(res => res.json())
          .then(res => { console.log(res); this.ok = res.auth})
          .catch(x => console.warn(x))
          .finally(x => this.$emit('send'))
              this.form = {}
 
      }     

    }
  },
  mounted() {
       const self = this
    employees().then(function(res){
      self.employees = res
     return res; 
    })
  }


}
</script>
<style lang="sass" scoped>
form
  margin: 2em
  margin-right: 0

</style>
