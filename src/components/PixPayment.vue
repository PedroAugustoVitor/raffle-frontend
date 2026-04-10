<template>
  <div class="payment-container">
    <h2>Pagamento via Pix</h2>
    <p>Valor total: <strong>R$ {{ store.reservation.total }}</strong></p>
    <p>Chave Pix (CPF): <strong>{{ store.reservation.pixKey }}</strong></p>
    <p>Após o pagamento, clique no botão abaixo para confirmar.</p>
    <button @click="store.confirmPayment" :disabled="store.loading">Confirmar pagamento</button>
    <button @click="store.resetToSelection">Cancelar</button>
    <div v-if="store.error" class="error">{{ store.error }}</div>
  </div>
</template>

<script>
import { useRaffleStore } from '../stores/raffleStore';

export default {
  name: 'PixPayment',
  created() {
    this.store = useRaffleStore();
  }
};
</script>