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
    search: '',
    headers: [
      { text: 'Cliente', align: 'left', value: 'user' },
      { text: 'Técnico', value: 'createdBy' },
      { text: '# equipos', value: 'numComputers' },
      { text: 'Coordenadas', value: 'coordinates' },
      { text: 'Hora de inicio', value: 'startDate' },
      { text: 'Hora de finalización', value: 'endDate' }
    ],
    clients: [
      {
        user: 'Abigail Sosa',
        createdBy: 'Mauricio Alvarado',
        numComputers: 8,
        coordinates: 'x: 435.352523 y: 163.136215 z: 12.1243521',
        startDate: '10-Sep-19 20:00:00',
        endDate: '10-Sep-19 22:00:00'
      },
      {
        user: 'Nicole Fernandez',
        createdBy: 'Raul Tamez',
        numComputers: 8,
        coordinates: 'x: 435.352523 y: 163.136215 z: 12.1243521',
        startDate: '10-Sep-19 20:00:00',
        endDate: '10-Sep-19 22:00:00'
      },
      {
        user: 'Angel Figueroa',
        createdBy: 'Mauricio Alvarado',
        numComputers: 8,
        coordinates: 'x: 435.352523 y: 163.136215 z: 12.1243521',
        startDate: '10-Sep-19 20:00:00',
        endDate: '10-Sep-19 22:00:00'
      }
    ]
  })
}
</script>
