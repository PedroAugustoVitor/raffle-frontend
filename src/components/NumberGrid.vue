<template>
  <div class="grid-container">
    <div v-if="store.loading" class="loading">Carregando...</div>
    <div v-else class="grid">
      <div
          v-for="num in store.numbers"
          :key="num.number"
          :class="[
          'number-card',
          num.status,
          { selected: store.selectedNumbers.has(num.number) }
        ]"
          @click="store.toggleNumber(num.number)"
      >
        {{ num.number }}
      </div>
    </div>
    <div class="legend">
      <span><span class="legend-color free"></span> Livre</span>
      <span><span class="legend-color reserved"></span> Reservado (pendente)</span>
      <span><span class="legend-color paid"></span> Pago</span>
      <span><span class="legend-color selected"></span> Selecionado</span>
    </div>
    <div v-if="store.selectedNumbers.size > 0" class="selected-info">
      {{ store.selectedNumbers.size }} número(s) selecionado(s) – Total: R$ {{ store.totalValue }}
      <button @click="store.proceedToForm" class="btn-primary">Continuar</button>
      <button @click="store.clearSelection" class="btn-secondary">Limpar</button>
    </div>
  </div>
</template>

<script>
import { useRaffleStore } from '../stores/raffleStore';

export default {
  name: 'NumberGrid',
  created() {
    this.store = useRaffleStore();
  },
  mounted() {
    this.store.fetchNumbers();
  }
};
</script>

<style scoped>
/* Mesmo CSS anterior */
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  max-width: 800px;
  margin: 20px auto;
}
.number-card {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
  color: #333;
}
.number-card.free { background-color: #f0f0f0; }
.number-card.reserved { background-color: #b8e6b8; } /* verde claro */
.number-card.paid { background-color: #2e7d32; color: white; } /* verde escuro */
.number-card.selected {
  border: 3px solid #1976d2;
  transform: scale(0.95);
}
.legend {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}
.legend-color {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 5px;
  vertical-align: middle;
}
.legend-color.free { background-color: #f0f0f0; border: 1px solid #ccc; }
.legend-color.reserved { background-color: #b8e6b8; }
.legend-color.paid { background-color: #2e7d32; }
.legend-color.selected { border: 3px solid #1976d2; background-color: #f0f0f0; }
.selected-info {
  margin-top: 20px;
  text-align: center;
}
.btn-primary, .btn-secondary {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-primary { background-color: #1976d2; color: white; }
.btn-secondary { background-color: #9e9e9e; color: white; }
</style>