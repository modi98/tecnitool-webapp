<template>
  <v-container fluid>
    <v-card class="elevation-8 visits-card" dark>
      <v-card-title>
        Visitas
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text class="visits-card">
        <v-data-table
          class="visits-card"
          hide-default-footer
          :headers="headers"
          :items="visits"
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
        Agregar Visita
      </v-btn>
    </v-footer>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="visits-card">
        <v-toolbar dark class="submit-btn">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>AGREGANDO EQUIPO</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <CreateVisit v-if="dialog" @ending="dialog = false"></CreateVisit>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CreateVisit from './CreateVisit'
export default {
  components: {
    CreateVisit
  },
  data: () => ({
    dialog: false,
    isFetching: false,
    search: '',
    headers: [
      { text: 'Cliente', align: 'left', value: 'clientId.name' },
      { text: 'Técnico', value: 'createdBy.name' },
      { text: '# equipos', value: 'maintenance.length' },
      { text: 'Latitud', value: 'coordinates.lat' },
      { text: 'Longitud', value: 'coordinates.lng' },
      { text: 'Fecha de inicio', value: 'startDate' },
      { text: 'Fecha de finalización', value: 'endDate' }
    ],
    visits: []
  }),
  methods: {
    fetchVisits () {
      this.isFetching = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('visits', options).then(response => {
        this.isFetching = false
        this.visits = response.data
        console.log(response.data)
      })
    }
  },
  created () {
    this.fetchVisits()
  }
}
</script>
