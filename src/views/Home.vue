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
  methods: {
    randColor () {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }
  },
  data: () => ({
    chartData: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          backgroundColor: ['#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16)],
          data: [10, 20, 25, 16, 18, 15, 22]
        }
      ]
    },
    doughnutData: {
      labels: ['Mauricio', 'José', 'Fernanda', 'Jesus', 'Mayra', 'Angel'],
      datasets: [
        {
          backgroundColor: ['#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16), '#'+(Math.random()*0xFFFFFF<<0).toString(16)],
          data: [4, 5, 2, 3, 5, 8]
        }
      ]
    },
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
  })
}
</script>
