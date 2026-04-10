<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Login Administrativo</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Usuário</label>
                <input v-model="username" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input v-model="password" type="password" class="form-control" required />
              </div>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://raffle-backend-kb40.onrender.com/api' });

export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: null
    };
  },
  created() {
    if (localStorage.getItem('adminToken')) {
      this.$router.push('/admin/panel');
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await API.post('/admin/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('adminToken', data.token);
        this.$router.push('/admin/panel');
      } catch (err) {
        this.error = err.response?.data?.error || 'Erro ao fazer login';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>