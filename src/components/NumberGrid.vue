<template>
  <div class="grid-page">
    <!-- Área rolável da grade -->
    <div class="grid-scrollable">
      <div v-if="store.loading" class="text-center py-4">
        <div class="spinner-border text-primary"></div>
      </div>
      <div v-else class="grid">
        <div
            v-for="num in store.numbers"
            :key="num.number"
            :class="['number-card', num.status, { selected: store.selectedNumbers.has(num.number) }]"
            @click="store.toggleNumber(num.number)"
        >
          {{ num.number }}
        </div>
      </div>
      <!-- Legenda dentro da área rolável, mas antes do footer -->
      <div class="legend d-flex justify-content-center gap-4 mt-3">
        <span><span class="legend-color free"></span> Livre</span>
        <span><span class="legend-color reserved"></span> Reservado</span>
        <span><span class="legend-color paid"></span> Pago</span>
        <span><span class="legend-color selected"></span> Selecionado</span>
      </div>
    </div>

    <!-- Rodapé fixo com informações e botões -->
    <footer class="selection-footer" v-if="store.selectedNumbers.size > 0">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between flex-wrap">
          <div class="selection-info">
            <strong>{{ store.selectedNumbers.size }}</strong> número(s) selecionado(s)
            – Total: <strong>R$ {{ store.totalValue }}</strong>
          </div>
          <div class="actions">
            <button @click="store.proceedToForm" class="btn btn-primary me-2">
              Continuar
            </button>
            <button @click="store.clearSelection" class="btn btn-outline-secondary">
              Limpar
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useRaffleStore } from '../stores/raffleStore';

export default {
  name: 'NumberGrid',
  setup() {
    const store = useRaffleStore();
    return { store };
  },
  mounted() {
    this.store.fetchNumbers();
  }
};
</script>

<style scoped>
/* Container principal: ocupa toda a altura da tela */
.grid-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px); /* Ajuste conforme altura da navbar */
  margin: 0;
}

/* Área com scroll para o grid e legenda */
.grid-scrollable {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
}

/* Grid de números */
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  max-width: 800px;
  margin: 0 auto;
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
  font-size: 1.1rem;
}

.number-card.free { background-color: #f0f0f0; }
.number-card.reserved { background-color: #b8e6b8; }
.number-card.paid { background-color: #2e7d32; color: white; }
.number-card.selected {
  border: 3px solid #1976d2;
  transform: scale(0.95);
}

/* Legenda */
.legend {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
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

/* Rodapé fixo */
.selection-footer {
  background-color: #ffffff;
  border-top: 1px solid #dee2e6;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  width: 100%;
  flex-shrink: 0;
}

.selection-info {
  font-size: 1.1rem;
}

.actions .btn {
  min-width: 120px;
}

/* Responsividade */
@media (max-width: 768px) {
  .grid-page {
    height: calc(100vh - 56px); /* navbar menor em mobile */
  }
  .grid {
    gap: 4px;
  }
  .number-card {
    font-size: 0.9rem;
  }
  .selection-footer .d-flex {
    flex-direction: column;
    gap: 10px;
  }
  .actions {
    display: flex;
    width: 100%;
  }
  .actions .btn {
    flex: 1;
  }
}
</style>