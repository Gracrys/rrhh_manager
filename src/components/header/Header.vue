<template>
  <header class="columns p-2 mt-0">
    <center class="column is-8 is-offset-2"> PROYECTS MANAGEMENT </center>
    <aside class="is-4 is-offset-6">
      <nav class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link ">
          <strong class="has-text-white-bis">{{currentUser.username}}</strong>
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" @click="() =>{info('info')}">
            info
          </a>
          <a class="navbar-item" @click="() =>{if(currentUser.user_type != 3) info('users')}">
            Usuarios
          </a>
          <a class="navbar-item" @click="() =>{if(currentUser.user_type != 3) info('new')}">
            Nuevo
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
           Cerrar Sesion
          </a>
        </div>
      </div>
    </nav>
    </aside>  
    <Modal
      v-show="modal"
      @close="closeModal"
    >
    <template slot="header">Info</template>
    <section slot="body">
      <NewUser v-if="modal == 'new'" />
      <Profile v-if="modal == 'info'" :user="currentUser"/>
      <div v-if="modal == 'users'" class="columns">
        <b class="column is-half">Usuario </b>
        <select name="promotor" id="" class="form-date select is-small column is-half is-offset-one-quarter py-0" v-model="selected">
          <option :value="user.id" v-for="user in users">{{user.username}}</option>
        </select>
        <center class="column is-half is-offset-one-quarter">
          <Profile v-if="selected" :user="selectedUser[0]"/>
        </center>
        </div>
      </section>
    </Modal>
  </header>
</template>

<script>

import Modal from '../Modal.vue'
import NewUser from '../users/newUser'
import Profile from '../users/Profile'

export default {
  name: 'Header',
  props: {
    msg: String
  },
  components:{
    Modal,
    NewUser,
    Profile
  },
  mounted() {

   this.$store.dispatch('getUsers')

  },
  data () {
    return {
      modal: '',
      selected: undefined
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    },
    currentUser (){
      return this.$store.state.currentUser
    },
    selectedUser (){
      return this.users.filter(x => x.id == this.selected)
    }
  },
  methods: {
    info(x) {
      this.modal = x 
    },
    closeModal(){
      
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header{
  height: 80px;
  // width: 100vw;
  background-color: var(--secondary);
  color: white;
}

aside:hover strong, .navbar-link:hover .has-text-white-bis{
  color: black !important;
}
</style>
