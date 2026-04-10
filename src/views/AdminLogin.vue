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
    // Se já tiver token, vai direto para o painel
    const token = localStorage.getItem('adminToken');
    if (token) {
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