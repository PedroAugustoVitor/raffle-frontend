import { defineStore } from 'pinia';
import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://raffle-backend-chi.vercel.app/api' });

export const useRaffleStore = defineStore('raffle', {
    state: () => ({
        numbers: [],
        selectedNumbers: new Set(),
        reservation: null,
        step: 'select', // 'select', 'form', 'payment', 'done'
        formData: { name: '', phone: '' },
        loading: false,
        error: null
    }),
    getters: {
        totalValue: (state) => state.selectedNumbers.size * 1000,
        freeNumbers: (state) => state.numbers.filter(n => n.status === 'free').map(n => n.number)
    },
    actions: {
        async fetchNumbers() {
            this.loading = true;
            try {
                const { data } = await API.get('/numbers');
                this.numbers = data;
            } catch (e) {
                this.error = 'Erro ao carregar números';
            } finally {
                this.loading = false;
            }
        },
        toggleNumber(number) {
            const numStatus = this.numbers.find(n => n.number === number)?.status;
            if (numStatus !== 'free') return;
            if (this.selectedNumbers.has(number)) {
                this.selectedNumbers.delete(number);
            } else {
                this.selectedNumbers.add(number);
            }
        },
        clearSelection() {
            this.selectedNumbers.clear();
        },
        proceedToForm() {
            if (this.selectedNumbers.size === 0) return;
            this.step = 'form';
        },
        async submitReservation() {
            if (!this.formData.name || !this.formData.phone) {
                this.error = 'Nome e telefone são obrigatórios';
                return;
            }
            this.loading = true;
            this.error = null;
            try {
                const numbersArray = Array.from(this.selectedNumbers);
                const { data } = await API.post('/reserve', {
                    name: this.formData.name,
                    phone: this.formData.phone,
                    numbers: numbersArray
                });
                this.reservation = {
                    reservationId: data.reservationId,
                    total: data.total,
                    pixKey: data.pixKey
                };
                this.step = 'pending';
                await this.fetchNumbers();
                this.selectedNumbers.clear();
            } catch (e) {
                if (e.response?.status === 409) {
                    this.error = `Conflito: ${e.response.data.error}. Recarregue a página.`;
                    await this.fetchNumbers();
                    this.selectedNumbers.clear();
                } else {
                    this.error = 'Erro ao reservar. Tente novamente.';
                }
            } finally {
                this.loading = false;
            }
        },
        resetToSelection() {
            this.step = 'select';
            this.selectedNumbers.clear();
            this.formData = { name: '', phone: '' };
            this.reservation = null;
            this.error = null;
        }
    }
});