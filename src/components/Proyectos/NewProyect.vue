<template>
  <form class="form-group card-body" action="">
    <div class="form-group columns">
      <label for="id" class="form-label form-inline column col-6" >Codigo del proyecto</label>
      <input type="text" class="form-input column col-6"  name="id" v-model="form.id">
    </div>
    <div class="form-group columns">
      <label for="denominacion" class="form-label form-inline column col-6">Nombre</label>
      <input type="text" name="denominacion" class="form-input column col-6" v-model="form.denominacion">
    </div>
    <div class="form-group columns">
      <label for="start_date" class="form-label form-inline column col-6">Fecha de Inicio</label>
      <input type="date" name="start_date" class="form-date column col-6" v-model="form.start_date">
    </div>
    <div class="form-group columns">
      <label for="finish_date" class="form-label form-inline column col-6">Fecha final</label>
      <input type="date" name="finish_date" class="form-date column col-6" v-model="form.finish_date">
    </div>
    <div class="form-group columns">
      <label for="status" class="form-label form-inline column col-6">Estatus del proyecto</label>
      <select type="text" name="status" class="form-date column col-6" v-model="form.status">
        <option value="0" selected>En espera</option>
        <option value="1">En proceso</option>
        <option value="2">Finalizado</option>
      </select>
    </div>
    <div class="form-group columns"> 
      <label for="employees" class="form-label form-inline column col-6">Integrantes</label>
      <select name="employees" id="" class="form-date column col-6" v-model="form.employees">
      <option :value="employee.id" v-for="employee in employees">{{employee.name + ' ' + employee.lastname}}</option>
      </select>
    </div>
    <div class="form-group columns"> 
      <label for="promotor" class="form-label form-inline column col-6">Promotor</label>
      <select name="promotor" id="" class="form-date column col-6" v-model="form.promotor">
        <option :value="employee.id" v-for="employee in employees">{{employee.name + ' ' + employee.lastname}}</option>
      </select>
    </div>
    
    <button class="btn btn-success" @click="newProyect($event)">Crear Proyecto</button>
	</form>
</template>
<script>
export default {
  name: 'NewProyect',
  data() {
    return {
      form :{
        id: "",
        denominacion: "",
        start_date: "",
        finish_date: "",
        status: "",
        employees: "",
        promotor: ""
      },
      employees : []
    }
  },
  methods: {
      newProyect(e) {
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
        fetch("http://localhost:8081/rrhh_api/proyects/new", headers)
        .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => this.$emit('send'))
              this.form = {}

      }     


  },
  mounted() {
    const headers = {
  		
        method: 'POST',
       headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include'
  	}
        fetch("http://localhost:8081/rrhh_api/employees/all", headers)
        .then(res => res.json())
          .then(res => this.employees = res)
          .catch(x => console.warn(x))
          .finally(x => console.log(x))

  }


}
</script>
