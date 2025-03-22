import type { PaymentDto } from "sistema-rachas-domain/dto";
import { api } from './api';

const resource = "/payments";

export const fetchPaymentsOwner = async () => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get('/payments/owner');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    throw error;
  }
};

export const fetchFinancialReport = async () => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get('/payments/owner/dashboard');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar relatório financeiro:', error);
    throw error;
  }
};