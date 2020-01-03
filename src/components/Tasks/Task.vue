<template>
<section v-else slot="body" class="body-relative" style="position:relative">

        <div class="panel-header ">
        <button style="position: absolute; right: 0; top: 0" @click="editable = true">edit</button>
				<ul>
          <li><b> <span id="description" @input="onInput($event)" ref="description" :contenteditable="editable">{{task.description ? task.description : "descripción "}}</span></b></li>
          <li><b> status </b>
             <select v-if="editable"  @change="onChange($event)" :value="task.status" type="text" id="status" name="status" ref="status"  class=" select is-small py-0 form-date column col-6" >
              <option value="1">Completado</option>
              <option value="2">Por completar</option>
              <option value="3">En proceso</option>
              <option value="4">No aplica</option>
              <option value="0">Eliminado</option>
              </select>

            <span id="created_at" v-else @input="onInput($event)" ref="created_at" >{{task.status}}</span></li>
          <li><b> Fecha de Inicio </b>
            <input v-if="editable" id="created_at" type="date" ref="created_at" @change="onChange($event)" :value="task.created_at.split('T')[0]">
            <span id="created_at"  ref="created_at"  v-else>{{task.created_at.split('T')[0]}}</span></li>
          <li><b> Fecha de finalizacion estimada </b>
            <input v-if="editable" id="due_date" type="date" ref="due_date" @change="onChange($event)" :value="task.due_date.split('T')[0]">
            <span id="due_date"  ref="due_date" v-else>{{task.due_date.split("T")[0]}}</span></li>
          <li><b> descripcion del documento </b>
            <span id="descripcion" ref="descripcion" placeholder="something" @input="onInput2($event)" :contenteditable="editable">{{docs ? docs.description : "_"}}</span></li>
          <li>
           <label class="file-label" v-if="editable">
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
              {{docs ? docs.name : "Seleccione un archivo"}}
            </span>

          </label>
          <span id="file"  ref="file" v-else>
            <a target="_blank" v-if="docs" :href=" ( '/docs/'+docs.file) " >{{docs.file }}</a>
            <span v-else>No hay archivo registrado</span>
          </span>
          </li>
          </ul>
            <footer>
              <button @click="cancel">cancelar</button>
          <button @click="update">Actualizar</button>    
        </footer>
      </div>
       			</section>
          </template>
<script>
import {env} from '../../tools/env.js'

export default {
  name: 'Task',
  props: {
    task: Object
  },
  components: {
  },
  methods: {
    onChange(e){
     this.toEdit[e.currentTarget.id] =  e.currentTarget.value
      console.log(e.currentTarget.value)
    },
    onInput(e) {
      this.toEdit[e.currentTarget.id] = e.target.innerText
      console.log(this.toEdit)
    },
    onInput2(e) {
      this.newDoc[e.currentTarget.id] = e.target.innerText
      console.log(this.toEdit)
    },
    cancel () {
      this.editable = false
      Object.keys(this.toEdit).forEach(x => this.$refs[x].innerText  = this.task[x])
         this.toEdit = {}
    },
    update() {
      console.warn("something >>> ", this.toEdit) 
       const bodyData = {
        
         id : this.task.id,
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
      if(Object.entries(this.toEdit).length > 0) {



        fetch("http://" + env.ip + ":8081/rrhh_api/tasks/update", headers)
          .then(res => res.json())
          .then(res => res )
          .catch(x => console.warn(x))
          .finally(x => this.$emit('send'))
      }
      
      if(Object.entries(this.newDoc).length > 0) {
        console.log("help")
        delete headers.headers['Content-Type']
        let fm = new FormData()


        fm.append("doc", this.newDoc.file)
        fm.append("description", this.newDoc.description)
        fm.append("taskDescription", this.task.id )

        headers.body = fm
        fetch("http://" + env.ip + ":8081/rrhh_api/docs/update", headers)
          .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => this.doc = "")
      }
/*
      fetch("http://" + env.ip + ":8081/rrhh_api/docs/update", headers)
        .then(res => res.json())
          .then(res => res )
          .catch(x => console.warn(x))
          .finally(x => this.$emit('send'))
        }
         */
          this.editable = false
         // Object.keys(this.toEdit).forEach(x => this.$refs[x].innerText  = this.current[x])
//        this.toEdit = {}

    },
    onFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.newDoc.file = files[0]
      console.log(files)
    },

  showModal() {
        if(!this.editable)
        this.isModalVisible = true;
      },
      closeModal() {
        if(!this.editable)
        this.isModalVisible = false;
      }
  },
  watch: {
    task (val){
      const headers = {
  		
        method: 'POST',
       headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include',
        body: JSON.stringify({id: val.id})
  	}
          fetch("http://"+ env.ip +":8081/rrhh_api/docs/all", headers)
        .then(res => res.json())
        .then(res =>{ this.docs = res[0]; console.warn("ok ok >=>>  ", this.docs); return res })
          .catch(x => console.warn(x))
          .finally(x => console.log(x))
    }
  },
  data(){
    return {
      editable: false,
      toEdit: {} ,
      docs : {},
      newDoc: {}
    }
  }
}
</script>
