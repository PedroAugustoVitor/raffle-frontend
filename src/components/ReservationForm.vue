<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Seus dados</h4>
          </div>
          <div class="card-body">
            <p>Você selecionou {{ store.selectedNumbers.size }} número(s) – Total: R$ {{ store.totalValue }}</p>
            <form @submit.prevent="store.submitReservation">
              <div class="mb-3">
                <label class="form-label">Nome completo</label>
                <input v-model="store.formData.name" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Telefone (WhatsApp)</label>
                <input v-model="store.formData.phone" type="tel" class="form-control" required />
              </div>
              <div v-if="store.error" class="alert alert-danger">{{ store.error }}</div>
              <button type="submit" class="btn btn-primary w-100" :disabled="store.loading">
                <span v-if="store.loading" class="spinner-border spinner-border-sm me-2"></span>
                Reservar números
              </button>
              <button type="button" @click="store.resetToSelection" class="btn btn-link w-100 mt-2">Voltar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRaffleStore } from '../stores/raffleStore';

export default {
  name: 'ReservationForm',
  setup() {
    const store = useRaffleStore();
    return { store };
  }
};
</script>