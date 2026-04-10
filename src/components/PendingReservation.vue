<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-warning text-dark">
            <h4 class="mb-0">Reserva Pendente</h4>
          </div>
          <div class="card-body">
            <div class="alert alert-info">
              <i class="bi bi-info-circle-fill me-2"></i>
              Sua reserva foi registrada e está aguardando confirmação de pagamento pelo administrador.
            </div>
            <p><strong>Valor total:</strong> R$ {{ store.reservation.total.toFixed(2) }}</p>
            <p><strong>Chave Pix (Celular):</strong> {{ store.reservation.pixKey }}</p>
            <p><strong>Nome do Titular:</strong> Davi Jesus Castro</p>
            <hr />
            <p class="text-muted">
              Após efetuar o pagamento, envie o comprovante para o WhatsApp do organizador.
              A confirmação será feita manualmente e você receberá a atualização.
            </p>
            <button @click="store.resetToSelection" class="btn btn-primary w-100">
              Voltar ao início
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRaffleStore } from '../stores/raffleStore';

export default {
  name: 'PendingReservation',
  setup() {
    const store = useRaffleStore();
    return { store };
  }
};
</script>