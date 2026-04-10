<template>
  <div id="app">
    <h1>Rifa Beneficente</h1>

    <NumberGrid v-if="store.step === 'select'" />
    <ReservationForm v-else-if="store.step === 'form'" />
    <PixPayment v-else-if="store.step === 'payment'" />

    <div v-if="store.step === 'done'" class="done-message">
      <h2>🎉 Pagamento confirmado! Obrigado!</h2>
      <button @click="store.resetToSelection">Voltar ao início</button>
    </div>
  </div>
</template>

<script>
import { useRaffleStore } from './stores/raffleStore';
import NumberGrid from './components/NumberGrid.vue';
import ReservationForm from './components/ReservationForm.vue';
import PixPayment from './components/PixPayment.vue';

export default {
  components: {
    NumberGrid,
    ReservationForm,
    PixPayment
  },
  created() {
    this.store = useRaffleStore();
  }
};
</script>