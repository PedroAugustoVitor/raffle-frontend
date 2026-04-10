<template>
  <div class="form-container">
    <h2>Seus dados</h2>
    <p>Você selecionou {{ store.selectedNumbers.size }} número(s) – Total: R$ {{ store.totalValue }}</p>
    <form @submit.prevent="store.submitReservation">
      <div>
        <label>Nome completo:</label>
        <input v-model="store.formData.name" required />
      </div>
      <div>
        <label>Telefone (WhatsApp):</label>
        <input v-model="store.formData.phone" required />
      </div>
      <div v-if="store.error" class="error">{{ store.error }}</div>
      <button type="submit" :disabled="store.loading">Reservar e gerar Pix</button>
      <button type="button" @click="store.resetToSelection">Voltar</button>
    </form>
  </div>
</template>

<script>
import { useRaffleStore } from '../stores/raffleStore';

export default {
  name: 'ReservationForm',
  created() {
    this.store = useRaffleStore();
  }
};
</script>