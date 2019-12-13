<template>
	<aside class="main_info  right">
		<header class="top_title bg-secondary right columns">
      <button @click="() => {isNew = true; showModal()}"class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
			<h4 class="column my-0 ">Empleados</h4>
		</header>
		<section class="panel">
			<ul class="panel-body">
        <li v-for="employee in employees" class="bg-blue columns "><h5 class="column m-2"><b>{{employee.name + ' ' + employee.lastname}}</b></h5></li>
			</ul>
		</section>
		<Window 
			position="left"
			 v-show="isModalVisible"
		        @close="closeModal">
			<header  slot="name"><h1> Jose Perez</h1></header>
			<NewEmpleado v-if="isNew" slot="body"/>

			<section v-else slot="body">
				<h3 role="title">Empleado 1</h3>
				<b>Proyectos</b>
				<ul>
					<li>Data</li>
				</ul>
			</section>
		</Window>
	</aside>
</template>

<script>
import NewEmpleado from './NewEmpleado'

export default {
  name: 'Empleados',
  components: {
  	NewEmpleado
  },
  props: {
    msg: String
  },
  methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
  },
  mounted(){
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
  },
     data () {
      return {
        isModalVisible: false,
        isNew: false,
        employees: []
      }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

   
</style>
