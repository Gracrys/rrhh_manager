<template>
  <object class="auth_container modal_container" v-if="!ok">
  <dialog open class=" auth_modal modal_one">
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

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


  export default {
    name: 'Auth',
    data() {
      return {
        user: "",
        pass: "",
        ok: false
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
          .then(res => {this.ok = res.auth; console.log('>>', res);this.$store.commit(res.user)})
          .catch(x => console.warn(x))
          .finally(x => location.reload() )
      }      
    },
    mounted( ){
      this.ok = document.cookie.includes("secretSessionValidator")
      if(this.ok){
        
        const headers = {

          method: 'POST',
          headers: {...new Headers(), 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache',
          },
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify({id: document.cookie.includes('cookie') ? getCookie('cookie') : 1})
        }
        fetch("http://" + env.ip + ":8081/user/get", headers)
          .then(res => res.json())
          .then(res => {console.log(res.user);this.$store.commit('currentUser',res.user)})
          .catch(x => console.warn(x))
          .finally(x => x)

      }
    },
    props: {
        }
  };
</script>
<style lang="sass" scoped>

</style>
