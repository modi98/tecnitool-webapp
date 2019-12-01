<template>
  <v-app dark class="main-background" v-if="user !== null">
    <v-app-bar
      class="app-bar"
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">Tecnitool</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      dark
      style="background-color: #065A82"
    >
      <v-list nav>
        <v-list-item-group>
          <v-list-item @click="$router.push('/')">
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/reportVisits')">
            <v-list-item-title>Visitas</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/reportClients')">
            <v-list-item-title>Clientes</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.role === 'admin'" @click="$router.push('/reportUsers')">
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>

  <v-app dark class="main-background" v-else>
    <v-app-bar app dark class="app-bar">
      <v-toolbar-title class="headline text-uppercase">
        <span @click="$router.push('/')">Tecnitool</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-flex pa-5>
        <v-card class="elevation-8 mx-auto" max-width="600">
          <v-card-text>
            <Login @ending="checkAuth" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-content>
  </v-app>
</template>

<script>
import Login from './views/Login'
export default {
  name: 'App',
  components: {
    Login
  },
  data: () => ({
    drawer: false,
    user: null
  }),
  methods: {
    logout () {
      this.$cookies.remove('authToken')
      this.user = null
    },
    checkAuth () {
      if (this.$cookies.isKey('authToken')) {
        console.log(this.$cookies.get('user'))
        this.user = this.$cookies.get('user')
        
      } else {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.checkAuth()
  }
}
</script>

<style>
.app-bar {
 background-color: #107789 !important;
}

.main-background {
  background-color: #2F4858 !important;
}

.toolbar-primary {
  background-color: #00C2A7 !important;
}

.main-footer {
  background-color: #285F72 !important;
}

.submit-btn {
  background-color: #00C2A7 !important;
}

.visits-card {
  background-color: #285F72 !important;
}

.clients-card {
  background-color: #007EC8 !important;
}

.users-card {
  background-color: rgb(202, 78, 88) !important;
}
</style>
