<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" py-3>
        <span class="headline white--text">Bienvenido a <b>Tecnitool</b></span>
      </v-flex>

      <v-flex xs12 class="text-center" pa-3>
        <v-card class="elevation-6">
          <v-card-title>Visitas en la última semana</v-card-title>
          <v-card-text>
            <ChartBar
              :chart-data="chartData"
              :options="chartOptions"
            ></ChartBar>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 class="text-center" pa-3>
        <v-card class="elevation-6">
          <v-card-title>Visitas por empleado</v-card-title>
          <v-card-text>
            <ChartDoughnut
              :chart-data="doughnutData"
            ></ChartDoughnut>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ChartBar from '../components/ChartBar'
import ChartDoughnut from '../components/ChartDoughnut'
export default {
  components: {
    ChartBar,
    ChartDoughnut
  },
  data: () => ({
    chartData: {},
    doughnutData: {},
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      legend: {
        display: false
      }
    }
  }),
  methods: {
    randColor () {
      return '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
    },
    setupCharts () {
      var vm = this
      var visits = {
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
      }
      var usersData = {}
      this.visits.forEach(element => {
        if (vm.$moment(element.startDate).day() === 0) {
          visits.sunday++
        } else if (vm.$moment(element.startDate).day() === 1) {
          visits.monday++
        } else if (vm.$moment(element.startDate).day() === 2) {
          visits.tuesday++
        } else if (vm.$moment(element.startDate).day() === 3) {
          visits.wednesday++
        } else if (vm.$moment(element.startDate).day() === 4) {
          visits.thursday++
        } else if (vm.$moment(element.startDate).day() === 5) {
          visits.friday++
        } else if (vm.$moment(element.startDate).day() === 6) {
          visits.saturday++
        }
        if (element.createdBy.name in usersData) {
          usersData[element.createdBy.name]++
        } else {
          usersData[element.createdBy.name] = 1
        }
      })
      this.chartData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            backgroundColor: ['#' + (Math.random() * 0xFFFFFF << 0).toString(16), '#' + (Math.random() * 0xFFFFFF << 0).toString(16), '#' + (Math.random() * 0xFFFFFF << 0).toString(16), '#' + (Math.random() * 0xFFFFFF << 0).toString(16), '#' + (Math.random() * 0xFFFFFF << 0).toString(16), '#' + (Math.random() * 0xFFFFFF << 0).toString(16), '#' + (Math.random() * 0xFFFFFF << 0).toString(16)],
            data: [visits.monday, visits.tuesday, visits.wednesday, visits.thursday, visits.friday, visits.saturday, visits.sunday]
          }
        ]
      }
      var dougnutLabels = []
      var dougnutColors = []
      var dougnutValues = []
      Object.keys(usersData).forEach(function(key) {
        dougnutLabels.push(key)
        dougnutValues.push(usersData[key])
        dougnutColors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
      })
      this.doughnutData = {
        labels: dougnutLabels,
        datasets: [
          {
            backgroundColor: dougnutColors,
            data: dougnutValues
          }
        ]
      }
    },
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
        this.setupCharts()
      })
    }
  },
  created () {
    this.fetchVisits()
  }
}
</script>
