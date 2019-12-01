<template>
  <v-container fluid>
    <v-card class="elevation-8 clients-card" dark>
      <v-card-title>
        Clientes
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table
          dense
          :loading="isFetching"
          class="clients-card"
          item-key="id"
          hide-default-footer
          :headers="headers"
          :items="clients"
          :search="search"
          @click:row="printRow"
        >
        </v-data-table>
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
        Agregar Cliente
      </v-btn>
    </v-footer>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="visits-card">
        <v-toolbar dark class="submit-btn">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>AGREGANDO CLIENTE</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <CreateClient v-if="dialog" @ending="endCreateClient"></CreateClient>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CreateClient from './CreateClient'
export default {
  components: {
    CreateClient
  },
  data: () => ({
    search: '',
    isFetching: true,
    dialog: false,
    headers: [
      { text: 'Nombre', align: 'left', value: 'name' },
      { text: 'Teléfono', value: 'phone' },
      { text: 'Correo', value: 'email' },
      { text: 'Dirección', value: 'address' },
      { text: 'Empresa', value: 'company' },
      { text: 'Fecha de registro', value: 'createdAt' }
    ],
    clients: []
  }),
  methods: {
    printRow (item) {
      console.log(item)
    },
    endCreateClient () {
      this.dialog = false
      this.fetchClients()
    },
    fetchClients () {
      this.isFetching = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('clients', options).then(response => {
        this.isFetching = false
        this.clients = response.data
        console.log(response.data)
      })
    }
  },
  created () {
    this.fetchClients()
  }
}
</script>
