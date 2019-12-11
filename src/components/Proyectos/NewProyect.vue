<template>
  <form class="form-group card-body" action="">
    <div class="form-group columns">
      <label for="id" class="form-label form-inline column col-6">Codigo del proyecto</label>
      <input type="text" class="form-input column col-6"  name="id">
    </div>
    <div class="form-group columns">
      <label for="denominacion" class="form-label form-inline column col-6">Denominacion</label>
      <input type="text" name="denominacion" class="form-input column col-6">
    </div>
    <div class="form-group columns">
      <label for="start_date" class="form-label form-inline column col-6">Fecha de Inicio</label>
      <input type="date" name="start_date" class="form-date column col-6">
    </div>
    <div class="form-group">
      <label for="finish_date" class="form-label form-inline column col-6">Fecha final</label>
      <input type="date" name="finish_date" class="form-date column col-6">
    </div>
    <div class="form-group">
      <label for="status" class="form-label form-inline column col-6">Estatus del proyecto</label>
      <input type="text" name="status" class="form-date column col-6">
    </div>
    <div class="form-group"> 
      <label for="integrantes" class="form-label form-inline column col-6">Integrantes</label>
      <select name="integrantes" id="" class="form-date column col-6"></select>
    </div>
    <div class="form-group"> 
      <label for="promotor" class="form-label form-inline column col-6">Promotor</label>
      <select name="promotor" id="" class="form-date column col-6"></select>
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
        
      }
    }
  },
  methods: {
      newProyect(e) {
        e.preventDefault();

       const bodyData = {
          ...new FormData(),
          user: this.user,
          pass: this.pass
        }
        // formdata.append('user',this.user);
        // formdata.append('pass',this.pass);
      console.log(bodyData)
  	const headers = {
  		
        method: 'POST',
       headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
          secretKey: "NaughtyToxicroak"
       },
       mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(bodyData)
  	}
        fetch("http://localhost:8081/auth", headers)
        .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => console.log(x))
      }      
    },


}
</script>
