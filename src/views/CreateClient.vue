<template>
  <v-container fluid>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>Datos del cliente</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" :editable="clientForm">Equipos</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :editable="devices.length > 0">Name of step 3</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-card-title>
              <v-row
                align="center"
                justify="center"
              >Información del cliente</v-row>
            </v-card-title>
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
                  <v-btn :disabled="!clientForm" :dark="clientForm" color="blue" @click="step++">Siguiente</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-title>
              <v-row
                align="center"
                justify="center"
              >Equipos</v-row>
            </v-card-title>
            <v-card-text class="text-center">
              <h4># de equipos: {{ devices.length }}</h4>
              <v-form v-model="deviceForm">
                <v-flex pa-2>
                  <v-text-field
                    label="Fabricante"
                    :rules="[v => (v.length > 0) || 'Ingresa el fabricante del equipo']"
                    v-model="device.manufacturer"
                    validate-on-blur
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Modelo"
                    :rules="[v => (v.length > 2) || 'Ingresa el modelo del equipo']"
                    v-model="device.model"
                    validate-on-blur
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Descripción"
                    :rules="[v => (v.length > 2) || 'Ingresa una descripción del equipo']"
                    v-model="device.description"
                    validate-on-blur
                    required
                  ></v-text-field>
                </v-flex>
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-btn text :disabled="!deviceForm" :dark="deviceForm" color="blue" @click="addDevice">Agregar</v-btn>
                  <v-btn :disabled="devices.length == 0" :dark="devices.length != 0" color="blue" @click="step++">Siguiente</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-card-title>
              <v-row
                align="center"
                justify="center"
              >Resumen</v-row>
            </v-card-title>
            <v-card-text class="text-center">
              <h2>{{ client.name }}</h2><br>
              <div v-for="(d, index) in devices" :key="d.key">
                <v-btn color="red" text @click="devices.splice(index, 1)">x</v-btn>
                {{ d.manufacturer }} {{ d.model }} {{ d.description }}
                <v-divider></v-divider>
              </div>
              <v-row
                align="center"
                justify="center"
                class="pt-2"
              >
                <v-btn color="blue" dark @click="createClient">Crear</v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isSending: false,
    step: 1,
    clientForm: false,
    deviceForm: false,
    client: {
      name: '',
      phone: '',
      email: '',
      address: '',
      company: ''
    },
    device: {
      key: 0,
      manufacturer: '',
      model: '',
      description: '',
      clientId: ''
    },
    deviceIndex: 1,
    devices: [],
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
    addDevice () {
      this.deviceIndex++
      this.device.key = this.deviceIndex
      this.devices.push(this.device)
      this.device = {
        key: 0,
        manufacturer: '',
        model: '',
        description: ''
      }
    },
    createDevices (clientId) {
      this.isSending = true
      var vm = this
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.devices.forEach(element => {
        element.clientId = clientId
        vm.$http.post('devices', element, options).then(response => {
          console.log(response.data)
        })
      })
      vm.closeDialog()
    },
    createClient () {
      this.isSending = true
      var vm = this
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.post('clients', this.client, options).then(response => {
        console.log(response.data)
        vm.createDevices(response.data.id)
      })
    },
    closeDialog () {
      this.$emit('ending', false)
    }
  }
}
</script>
