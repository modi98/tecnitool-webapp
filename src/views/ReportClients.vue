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
          class="clients-card"
          hide-default-footer
          :headers="headers"
          :items="clients"
          :search="search"
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
        <CreateClient v-if="dialog" @ending="dialog = false"></CreateClient>
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
    dialog: false,
    headers: [
      { text: 'Nombre', align: 'left', value: 'name' },
      { text: 'Teléfono', value: 'phone' },
      { text: 'Correo', value: 'email' },
      { text: 'Dirección', value: 'direction' },
      { text: 'Empresa', value: 'company' },
      { text: 'Fecha de registro', value: 'createdAt' }
    ],
    clients: [
      {
        name: 'Abigail Sosa',
        phone: '812423523',
        email: 'a@a.aa',
        direction: 'Las Torres 1268',
        company: 'Tecmilenio',
        createdAt: '10-Sep-19 20:00:00'
      },
      {
        name: 'Jose Hernandez',
        phone: '6345622346',
        email: 'a@a.aa',
        direction: 'Lazaro Cardenas 238',
        company: 'Steelcase',
        createdAt: '05-Sep-19 20:00:00'
      },
      {
        name: 'Marcelo Flores',
        phone: '812423523',
        email: 'a@a.aa',
        direction: 'Las Torres 1268',
        company: 'Tecmilenio',
        createdAt: '10-Sep-19 20:00:00'
      }
    ]
  })
}
</script>
