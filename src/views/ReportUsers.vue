<template>
  <v-container fluid>
    <v-card class="elevation-8 users-card" dark>
      <v-card-title>
        Usuarios
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text class="users-card">
        <v-data-table
          class="users-card"
          hide-default-footer
          :headers="headers"
          :items="users"
          :search="search"
          :loading="isFetching"
        ></v-data-table>
      </v-card-text>
    </v-card>

    <v-footer
      height="60px"
      class="main-footer"
      fixed
    >
      <v-btn
        block
        large
        dark
        class="submit-btn"
        @click="dialog = true"
      >
        Agregar usuario
      </v-btn>
    </v-footer>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="users-card">
        <v-toolbar dark class="submit-btn">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>AGREGANDO USUARIO</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <CreateUser v-if="dialog" @ending="fetchUsers"></CreateUser>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CreateUser from './CreateUser'
export default {
  components: {
    CreateUser
  },
  data: () => ({
    dialog: false,
    isFetching: false,
    search: '',
    headers: [
      { text: 'Nombre', align: 'left', value: 'name' },
      { text: 'Correo electrónico', value: 'email' },
      { text: 'Rol', value: 'role' },
      { text: 'Fecha de registro', value: 'createdAt' }
    ],
    users: []
  }),
  methods: {
    fetchUsers () {
      this.dialog = false
      this.isFetching = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users', options).then(response => {
        this.isFetching = false
        this.users = response.data
        console.log(response.data)
      })
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>
