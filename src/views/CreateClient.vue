<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-form v-model="clientForm">
          <v-flex pa-2>
            <v-text-field
              label="Nombre"
              :rules="[v => (v.length > 2) || 'Ingresa el nombre del cliente']"
              v-model="client.name"
              required
            ></v-text-field>
            <v-text-field
              label="Teléfono"
              :rules="phoneRules"
              v-model="client.phone"
              required
            ></v-text-field>
            <v-text-field
              label="Correo electrónico"
              :rules="emailRules"
              v-model="client.email"
              required
            ></v-text-field>
            <v-text-field
              label="Dirección"
              :rules="[v => (v && v.length > 5) || 'Ingresa una dirección']"
              v-model="client.address"
              required
            ></v-text-field>
            <v-text-field
              label="Empresa"
              :rules="[v => (v && v.length > 2) || 'Ingresa la empresa del cliente']"
              v-model="client.company"
              required
            ></v-text-field>
          </v-flex>
          <v-row
            align="center"
            justify="center"
          >
            <v-btn :loading="isSending" :disabled="!clientForm" :dark="clientForm" color="blue" @click="createClient">Agregar</v-btn>
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
    isSending: false,
    clientForm: false,
    client: {
      name: '',
      phone: '',
      email: '',
      address: '',
      company: ''
    },
    emailRules: [
      v => !!v || 'Inserta un correo válido',
      v => /.+@.+\..+/.test(v) || 'Inserta un correo válido'
    ],
    phoneRules: [
      v => !!v || 'Inserta un teléfono válido',
      v => /^[789]\d{9}$/.test(v) || 'Inserta un teléfono válido'
    ]
  }),
  methods: {
    createClient () {
      this.isSending = true
      var vm = this
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.post('clients', this.client, options).then(respone => {
        vm.closeDialog()
      })
    },
    closeDialog () {
      this.$emit('ending', false)
    }
  }
}
</script>
