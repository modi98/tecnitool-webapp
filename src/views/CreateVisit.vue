<template>
  <v-container fluid>
    <v-stepper v-model="stepper" vertical>
      <v-stepper-step :complete="stepper > 1" step="1">
        Elegir equipo
        <small>Busca el código QR</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="stepper = 2">Siguiente</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepper > 2" step="2">Tipo de mantenimiento ({{ supportType }})</v-stepper-step>

      <v-stepper-content step="2">
        <v-select
          v-model="supportType"
          :items="supportTypes"
          placeholder="Selecciona tipo de mantenimiento"
        ></v-select>
        <v-btn color="primary" :disabled="supportType.length < 1" @click="stepper = 3">Siguiente</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepper > 3" step="3">Información acerca de mantenimiento</v-stepper-step>

      <v-stepper-content step="3">
        <v-textarea
          v-model="supportDetail"
          placeholder="Escribe lo que se le hizo al equipo"
        ></v-textarea>
        <v-btn color="primary" :disabled="supportDetail.length < 1" @click="stepper = 4">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">Confirma el mantenimiento al equipo</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="stepper = 1">Siguiente equipo</v-btn>
        <v-btn text @click="dialog = true">Finalizar</v-btn>
      </v-stepper-content>
    </v-stepper>

    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition">
      <v-card class="visits-card text-center" dark>
        <v-card-title>¿Estás seguro que deseas finalizar la visita?</v-card-title>
        <v-card-text>Si finalizas no podras agregar nuevos equipos a la visita y se registrará en la base de datos</v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false" color="red">Cancelar</v-btn>
          <v-btn @click="closeDialog" color="green darken-3">Finalizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    stepper: 1,
    dialog: false,
    supportTypes: ['Preventivo', 'Correctivo'],
    supportType: '',
    supportDetail: ''
  }),
  methods: {
    closeDialog () {
      this.$emit('ending', false)
    }
  }
}
</script>