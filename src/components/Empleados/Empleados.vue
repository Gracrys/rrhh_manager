<template>
	<aside class="main_info  right">
		<header class="top_title bg-secondary right columns">
      <button @click="() => {isNew = true; showModal()}"class="btn btn-primary column col-1 my-0"><i class="icon icon-plus"></i></button>
			<h4 class="column my-0 ">Empleados</h4>
		</header>
		<section class="panel">
			<ul class="panel-body">
        <li v-for="employee in employees" :id="employee.id" @click="description($event)" class="bg-blue columns px-2 "><h5 class="column m-2"><b>{{employee.name + ' ' + employee.lastname}}</b></h5></li>
			</ul>
		</section>
		<Window 
			position="left"
			 v-show="isModalVisible"
		        @close="closeModal">
			<template  slot="header"><h2 class="my-0"> {{isNew ? "Nuevo Empleado" : current.name + " " + current.lastname}} </h2></template>
			<NewEmpleado v-if="isNew" slot="body" @send="reload"/>

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

import {employees} from '../../tools/alls'

export default {
  name: 'Empleados',
  components: {
  	NewEmpleado
  },
  props: {
    msg: String
  },
  methods: {
  description(e) {
      this.isNew = false;
      this.current = this.employees.filter(x => x.id == e.currentTarget.id)[0]
      this.showModal();
      console.log(this.current)
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
        current: {}
      }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
ul.panel-body
  margin: 2em -8px 0
   
</style>
