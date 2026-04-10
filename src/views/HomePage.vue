<template>
  <div>
    <NumberGrid v-if="store.step === 'select'" />
    <ReservationForm v-else-if="store.step === 'form'" />
    <PendingReservation v-else-if="store.step === 'pending'" />
    <div v-if="store.step === 'done'" class="container text-center mt-5">
      <div class="alert alert-success">
        <h2>🎉 Pagamento confirmado! Obrigado!</h2>
        <button @click="store.resetToSelection" class="btn btn-primary mt-3">Voltar ao início</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRaffleStore } from '../stores/raffleStore';
import NumberGrid from '../components/NumberGrid.vue';
import ReservationForm from '../components/ReservationForm.vue';
import PendingReservation from '../components/PendingReservation.vue'; // <- novo

export default {
  name: 'HomePage',
  components: {
    NumberGrid,
    ReservationForm,
    PendingReservation
  },
  setup() {
    const store = useRaffleStore();
    return { store };
  }
};
</script>