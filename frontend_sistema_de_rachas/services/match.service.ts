import type {
  CreateMatchDto,
  MatchDto,
} from "sistema-rachas-domain/dto/match.dto";
import type { MatchWithRelationsDto } from "../types/match.type";
import { api } from "./api";
import type { CreateTeamDto } from 'sistema-rachas-domain/dto/team.dto';

const resource = "/match";

export const updateMatch = async (
  id: string,
  matchData: Partial<CreateMatchDto>
) => {
  const { $api } = useNuxtApp();

  try {
    const response = await $api.put<{ data: MatchDto }>(
      `/match/${id}`,
      matchData
    );
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Erro ao atualizar a partida:", error);
    throw error;
  }
};

export async function getMatchById(matchId: string) {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get(`/match/${matchId}`);
    console.log("Dados da partida Atual ->", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar a partida pelo ID:", error);
    throw error;
  }
}

export async function getMatchByUser() {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get<MatchDto[]>("/match/by-user");

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as partidas do usuário:", error);
    throw error;
  }
}

export const makePaymentOwner = async (paymentData:any) => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.post(`/match/payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Erro ao realizar pagamento:", error);
  }
};

export async function getUnpaidMatchsByUser() {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get(`/match/by-user/unpaid`);
    console.log("Response unpaids->", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar partidas não pagas do usuário:", error);
    throw error;
  }
}

export const createMatch = async (data: CreateMatchDto) => {
  const { $api } = useNuxtApp();
  try {
    console.log('Dados enviados para criação da partida:', data);
    const response = await $api.post('/match', data);
    console.log('Resposta do servidor:', response);
    
    if (response.status === 201 || response.status === 200) {
      return {
        status: response.status,
        data: response.data
      };
    } else {
      throw new Error(`Erro ao criar partida: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Erro ao criar partida:', error);
    if (error.code === 'ERR_CONNECTION_REFUSED') {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao criar a partida');
    }
    throw error;
  }
};

export const getMatch = async (id: string) => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get(`/match/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar a partida:', error);
    throw error;
  }
};

export const getMatchAll = async () => {
  const { $api } = useNuxtApp();

  try {
    const response = await $api.get(`/match`);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar as partidas existentes:", error);
    throw error;
  }
};

export async function deleteMatch(id: string) {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.delete(`/match/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao excluir partida:', error);
    if (error.response?.status === 500) {
      throw new Error(error.response.data || 'Erro interno ao excluir a partida');
    }
    throw error;
  }
}

export const generateTeamsByPlayerStars = async (matchId: string): Promise<CreateTeamDto[]> => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get(`/match/${matchId}/generate-teams-by-players-stars`);
    console.log('Resposta do servidor (times):', response.data);
    return response.data.data || [];
  } catch (error) {
    console.error('Erro ao gerar times:', error);
    throw error;
  }
};
