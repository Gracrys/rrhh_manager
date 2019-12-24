<template>
  <object class="auth_container" v-if="!ok">
  <dialog open class=" auth_modal">
    <h1>Inicie Sesion</h1>
    <hr>
    <form @:submit.prevent action="http://localhost:8081/auth" method="post">
      <input type="text"  class="input" v-model="user" placeholder="Nombre de usuario" name="name" >
      <input type="password" v-model="pass" class="input" placeholder="contraseña" name="pass" >
      <button @click="auth($event)" class="btn ">Entrar</button>
    </form>
  </dialog>
  </object>
</template>

<script>
import {env} from '../tools/env.js'
  export default {
    name: 'Auth',
    data() {
      return {
        user: "",
        pass: "",
        ok: ""
      }
    },
    methods: {
      auth(e) {
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
        fetch("http://" + env.ip + ":8081/auth", headers)
        .then(res => res.json())
          .then(res => this.ok = res.auth)
          .catch(x => console.warn(x))
          .finally(x => location.reload() )
      }      
    },
    mounted( ){
      this.ok = document.cookie.includes("secretSessionValidator")
      console.warn(document.cookie)
    },
    props: {
        }
  };
</script>
<style lang="sass" scoped>

</style>
