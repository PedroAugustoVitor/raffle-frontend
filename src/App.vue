<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container">
        <router-link class="navbar-brand" to="/">🎟️ Rifa Beneficente</router-link>
        <div class="navbar-nav ms-auto">
          <template v-if="isAdminLoggedIn">
            <router-link class="nav-link" to="/admin/panel">Painel Administrativo</router-link>
            <a class="nav-link" href="#" @click.prevent="logout">Sair</a>
          </template>
          <template v-else>
            <router-link class="nav-link" to="/admin">Área Admin</router-link>
          </template>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAdminLoggedIn() {
      return !!localStorage.getItem('adminToken');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/');
    }
  }
};
</script>