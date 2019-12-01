<template>
  <v-container fluid>
    <v-stepper v-model="stepper" vertical>
      <v-stepper-step :complete="stepper > 1" step="1">
        Elegir cliente
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-autocomplete
          :loading="isFetching"
          label="Clientes"
          v-model="client"
          :items="clients"
          @input="stepper = 2"
        ></v-autocomplete>
      </v-stepper-content>

      <v-stepper-step :complete="stepper > 2" step="2">
        Elegir equipo
        <small>Busca el código QR</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <qrcode-stream v-if="isScanning" @decode="onDecode"></qrcode-stream>
      </v-stepper-content>

      <v-stepper-step :complete="stepper > 3" step="3">Tipo de mantenimiento</v-stepper-step>

      <v-stepper-content step="3">
        <v-select
          v-model="supportType"
          :items="supportTypes"
          placeholder="Selecciona tipo de mantenimiento"
          @input="stepper++"
        ></v-select>
      </v-stepper-content>

      <v-stepper-step :complete="stepper > 4" step="4">Información acerca de mantenimiento</v-stepper-step>

      <v-stepper-content step="4">
        <v-textarea
          v-model="supportDetail"
          placeholder="Escribe lo que se le hizo al equipo"
        ></v-textarea>
        <v-btn color="primary" :disabled="supportDetail.length < 1" @click="stepper++">Siguiente</v-btn>
      </v-stepper-content>

      <v-stepper-step step="5">Confirma el mantenimiento al equipo</v-stepper-step>

      <v-stepper-content step="5">
        <p v-if="currentDevice !== null">{{ currentDevice.manufacturer }} {{ currentDevice.model }} {{ currentDevice.description }}</p>
        <p>Tipo de mantenimiento: {{ supportType }}</p>
        <p>Descripción: {{ supportDetail }}</p>
        <v-btn color="primary" @click="prepNextDevice">Siguiente equipo</v-btn>
        <v-btn text @click="endVisit">Finalizar</v-btn>
      </v-stepper-content>
    </v-stepper>

    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition">
      <v-card class="visits-card text-center" dark>
        <v-card-title>¿Estás seguro que deseas finalizar la visita?</v-card-title>
        <v-card-text class="text-center">
          <h4>Cliente: {{ client.name }}</h4>
          <div v-for="d in devices" :key="d.id">
            <p><b>{{ d.deviceObject.manufacturer }} {{ d.deviceObject.model }} {{ d.deviceObject.description }}</b></p>
            <p>Tipo: {{ d.category }}</p>
            <p>Descripción: {{ d.description }}</p>
            <v-divider></v-divider>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false" color="red">Cancelar</v-btn>
          <v-btn @click="submitVisit" color="green darken-3">Finalizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    stepper: 1,
    isScanning: true,
    isSending: false,
    client: {},
    currentDevice: null,
    dialog: false,
    clients: [],
    devices: [],
    supportTypes: ['Preventivo', 'Correctivo'],
    supportType: '',
    supportDetail: '',
    startDate: Date()
  }),
  methods: {
    fetchClients () {
      this.isFetching = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('clients', options).then(response => {
        var clients = []
        response.data.forEach(element => {
          clients.push({
            text: element.name,
            value: element
          })
        })
        this.clients = clients
        this.isFetching = false
      }, response => {
        this.isFetching = false
      })
    },
    closeDialog () {
      this.$emit('ending', false)
    },
    onDecode (qrCode) {
      this.isScanning = false
      this.isFetching = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('devices/' + qrCode, options).then(response => {
        console.log(response.data)
        if (response.data.clientId === this.client.id) {
          this.stepper++
          this.currentDevice = response.data
        }
        this.isFetching = false
      }, response => {
        this.isScanning = true
        this.isFetching = false
      })
    },
    addDevice () {
      this.devices.push({
        deviceObject: this.currentDevice,
        device: this.currentDevice.id,
        category: this.supportType,
        description: this.supportDetail
      })
      this.currentDevice = {}
      this.supportType = ''
      this.supportDetail = ''
    },
    prepNextDevice () {
      this.addDevice()
      this.stepper = 2
      this.isScanning = true
    },
    submitVisit () {
      this.isSending = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      var visit = {
        clientId: this.client.id,
        startDate: this.startDate,
        endDate: Date(),
        maintenance: this.devices
      }
      this.$http.post('visits', visit, options).then(response => {
        this.isSending = false
        this.closeDialog()
      }, response => {
        this.isSending = false
      })
    },
    endVisit () {
      this.addDevice()
      this.dialog = true
    }
  },
  created () {
    this.fetchClients()
  }
}
</script>
