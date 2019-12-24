<template>
  <form action="" class="form-group card-body ">
    <div class="field my-2 columns">
      <label class="form-label form-inline column col-6" for="">
        Cedula o Documento de Identidad
    </label>
		<input type="number" class="form-input column col-6 input is-small" name="ci" v-model="form.CI">
      </div>
    <div class="field my-2 columns">
      <label class="form-label form-inline column col-6" for="">
       Nombre 
      </label>
      <input type="text" class="form-input column col-6 input is-small" name="name" v-model="form.name">
    </div>
    <div class=" field my-2  columns">
    <label class="form-label form-inline column col-6" for="">
      Apellido
    </label>
    <input type="text" class="form-input column col-6 input is-small" name="apellido" v-model="form.last_name">
</div>
<div class=" field my-2  columns">
  <label class="form-label form-inline column col-6" for="">
    Direccion
  </label>
  <input type="text" class="form-input column col-6 input is-small" name="address" v-model="form.address">
 </div>
<div class="field my-2  columns">
  <label class="form-label form-inline column col-6" for="">
    Especialidad
  </label>
  <input type="text" class="form-input column col-6 input is-small" name="speciality" v-model="form.speciality">
</div>

<div class="field my-2  columns">
  <label class="form-label form-inline column col-6" for="">
    Numero de Telefono
  </label>
  <input type="tel" class="form-input column col-6 input is-small" name="telephone" v-model="form.telephone">
</div>
<div class="field my-2  columns">
  <label class="form-label form-inline column col-6" for="">
    Correo Electronico
  </label>
  <input type="email" class="form-input column col-6 input is-small" name="email" v-model="form.email">
</div>
<div class="field my-2  columns">
  <label class="form-label form-inline column col-6" for="">
    Fecha de Inicio
  </label>
  <input type="date" class="form-input column col-6 input is-small" name="initial_date" v-model="form.initial_date">
</div>
	 <button class="btn btn-success float-right" @click="newEmployee($event)">Nuevo Empleado</button>
	</form>
</template>

<script>
import {env} from '../../tools/env.js'



export default {
  name: 'NewEmpleado',
 data() {
    return {
      form :{
        CI: "",
        name: "",
        last_name: "",
        address: "",
        telephone: "",
        email: "",
        initial_date: ""
      }
    }
  },
  methods: {
      newEmployee(e) {
        if(Object.keys(inventory).length !== 0){
        e.preventDefault();

       const bodyData = {
          ...new FormData(),
          ...this.form
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
        fetch("http://" + env.ip + ":8081/rrhh_api/employees/new", headers)
        .then(res => res.json())
          .then(res =>{ this.form = {}
          })
          .catch(x => console.warn(x))
          .finally(x => this.$emit('send'))

          this.form = {}
      }     
      }
    },
}
</script>
<style lang="sass" scoped>
form
  margin: 2em
  margin-left: 0

</style>
