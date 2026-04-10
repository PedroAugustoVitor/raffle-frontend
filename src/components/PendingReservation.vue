<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card">
          <div class="card-header bg-warning text-dark">
            <h4 class="mb-0">Reserva Pendente – Aguardando Pagamento</h4>
          </div>
          <div class="card-body">
            <div class="alert alert-info">
              <i class="bi bi-info-circle-fill me-2"></i>
              Sua reserva foi registrada! Efetue o pagamento via Pix e envie o comprovante para o organizador.
            </div>

            <!-- QR Code -->
            <div class="text-center mb-3">
              <img
                  :src="qrCodeImage"
                  alt="QR Code Pix"
                  class="img-fluid qr-code"
              />
            </div>

            <!-- Botão copiar código Pix -->
            <div class="d-grid mb-3">
              <button
                  class="btn btn-outline-primary"
                  @click="copyPixCode"
                  title="Copiar chave Pix"
              >
                <i class="bi bi-clipboard me-2"></i>Copiar código Pix
              </button>
            </div>

            <!-- Informações da conta -->
            <div class="pix-details p-3 bg-light rounded">
              <p class="mb-1"><strong>Chave Pix [Telefone]:</strong> 75999913101 </p>
              <p class="mb-1"><strong>Nome:</strong> Davi Jesus Castro</p>
              <p class="mb-1"><strong>CPF:</strong> •••.108.155-••</p>
              <p class="mb-1"><strong>Banco:</strong> 260 - Nu Pagamentos S.A. - Instituição de Pagamento</p>
            </div>

            <hr />

            <p class="text-muted small">
              Valor total da reserva: <strong>R$ {{ store.reservation.total.toFixed(2) }}</strong><br />
              Após o pagamento, envie o comprovante para o WhatsApp do organizador.
            </p>

            <button @click="store.resetToSelection" class="btn btn-primary w-100 mt-3">
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
import qrCodeImage from '../assets/qrcode-pix.png'; // Importa a imagem

export default {
  name: 'PendingReservation',
  setup() {
    const store = useRaffleStore();
    return { store, qrCodeImage };
  },
  computed: {
    pixCode() {
      return "00020126580014BR.GOV.BCB.PIX0136f60c9a8d-36c6-4e38-af13-aee0502983de52040000530398654071000.005802BR5917Davi Jesus Castro6009SAO PAULO621405103keubJp3qB6304278F";
    }
  },
  methods: {
    async copyPixCode() {
      try {
        await navigator.clipboard.writeText(this.pixCode);
        alert('Chave Pix copiada para a área de transferência!');
      } catch (err) {
        alert('Não foi possível copiar. Por favor, copie manualmente.');
      }
    }
  }
};
</script>

<style scoped>
.qr-code {
  max-width: 250px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 8px;
  background: white;
}
.pix-details {
  font-size: 0.95rem;
}
</style>