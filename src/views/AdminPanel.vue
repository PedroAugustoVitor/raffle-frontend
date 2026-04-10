<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Painel Adiministrativo</h2>
      <button @click="logout" class="btn btn-outline-danger">Sair</button>
    </div>

    <div class="card">
      <div class="card-header bg-secondary text-white">
        <h5 class="mb-0">Reservas</h5>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary"></div>
        </div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-else>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Números</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="res in reservations" :key="res.id">
                <td>{{ res.id }}</td>
                <td>{{ res.name }}</td>
                <td>{{ res.phone }}</td>
                <td>{{ res.numbers.join(', ') }}</td>
                <td>R$ {{ res.total_value.toFixed(2) }}</td>
                <td>
                  <span :class="statusBadgeClass(res.status)">{{ statusLabel(res.status) }}</span>
                </td>
                <td>{{ formatDate(res.created_at) }}</td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                        v-if="res.status === 'pending'"
                        @click="confirmPayment(res.id)"
                        class="btn btn-success"
                        title="Confirmar pagamento"
                    >
                      <i class="bi bi-check-lg"></i> Confirmar
                    </button>
                    <button
                        v-if="res.status === 'pending'"
                        @click="cancelReservation(res.id)"
                        class="btn btn-danger"
                        title="Cancelar reserva"
                    >
                      <i class="bi bi-x-lg"></i> Cancelar
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="reservations.length === 0">
                <td colspan="8" class="text-center">Nenhuma reserva encontrada.</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api' });

export default {
  name: 'AdminPanel',
  data() {
    return {
      reservations: [],
      loading: false,
      error: null
    };
  },
  mounted() {
    this.fetchReservations();
  },
  methods: {
    getAuthHeaders() {
      const token = localStorage.getItem('adminToken');
      return { Authorization: `Bearer ${token}` };
    },
    async fetchReservations() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await API.get('/admin/reservations', { headers: this.getAuthHeaders() });
        this.reservations = data;
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          this.logout();
        } else {
          this.error = 'Erro ao carregar reservas';
        }
      } finally {
        this.loading = false;
      }
    },
    async confirmPayment(id) {
      if (!confirm('Confirmar pagamento desta reserva?')) return;
      try {
        await API.post(`/admin/reservations/${id}/confirm`, {}, { headers: this.getAuthHeaders() });
        await this.fetchReservations();
      } catch (err) {
        alert('Erro ao confirmar pagamento');
      }
    },
    async cancelReservation(id) {
      if (!confirm('Cancelar esta reserva? Os números serão liberados.')) return;
      try {
        await API.post(`/admin/reservations/${id}/cancel`, {}, { headers: this.getAuthHeaders() });
        await this.fetchReservations();
      } catch (err) {
        alert('Erro ao cancelar reserva');
      }
    },
    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/admin');
    },
    statusBadgeClass(status) {
      return {
        'pending': 'badge bg-warning text-dark',
        'paid': 'badge bg-success',
        'cancelled': 'badge bg-secondary'
      }[status] || 'badge bg-light text-dark';
    },
    statusLabel(status) {
      return {
        'pending': 'Pendente',
        'paid': 'Pago',
        'cancelled': 'Cancelado'
      }[status] || status;
    },
    formatDate(isoString) {
      if (!isoString) return '';
      return new Date(isoString).toLocaleString('pt-BR');
    }
  }
};
</script>