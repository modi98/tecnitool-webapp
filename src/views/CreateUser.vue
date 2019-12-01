<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-row
          align="center"
          justify="center"
        >Información del usuario</v-row>
      </v-card-title>
      <v-card-text>
        <v-form v-model="userForm">
          <v-flex pa-2>
            <v-text-field
              label="Nombre"
              :rules="[v => (v.length > 2) || 'Ingresa el nombre del usuario']"
              v-model="user.name"
              required
            ></v-text-field>
            <v-text-field
              label="Correo electrónico"
              :rules="emailRules"
              v-model="user.email"
              required
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              :rules="[v => (v.length >= 6) || 'La contraseña debe contener al menos 6 caracteres']"
              v-model="user.password"
              type="password"
              required
            ></v-text-field>
            <v-select
              label="Rol"
              :rules="[v => (v && v.length > 2) || 'Selecciona un rol para el usuario']"
              v-model="user.role"
              :items="roles"
              required
            ></v-select>
          </v-flex>
          <v-row
            align="center"
            justify="center"
          >
            <v-btn :disabled="!userForm" :dark="userForm" color="blue" @click="createUser">Crear</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    userForm: false,
    user: {
      name: '',
      password: '',
      role: '',
      email: ''
    },
    roles: [
      {
        text: 'Administrador',
        value: 'admin'
      },
      {
        text: 'Usuario',
        value: 'user'
      }
    ],
    emailRules: [
      v => !!v || 'Inserta un correo válido',
      v => /.+@.+\..+/.test(v) || 'Inserta un correo válido'
    ]
  }),
  methods: {
    createUser () {
      this.isSending = true
      var vm = this
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.post('users', this.user, options).then(response => {
        console.log(response.data)
        vm.closeDialog()
      })
    },
    closeDialog () {
      this.$emit('ending', false)
    }
  }
}
</script>
