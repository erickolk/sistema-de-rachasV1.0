import type {
  CreateSoccerFieldDto,
  SoccerFieldDto,
} from "sistema-rachas-domain/dto/soccer-field.dto";
import type { ScheduleDto } from "sistema-rachas-domain/dto/schedule.dto";

const resource = "soccer-field";

export const createSoccerField = async (
  createSoccerFieldParams: CreateSoccerFieldDto,
  config = {}
) => {
  const { $api } = useNuxtApp();
  const { data } = await $api.post<{ data: SoccerFieldDto }>(
    resource,
    createSoccerFieldParams,
    config
  );
  return data;
};

export const getSoccerFields = async (): Promise<SoccerFieldDto[]> => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get<SoccerFieldDto[]>(resource);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os campos:", error);
    return [];
  }
};

export const getSoccerFieldsByUser = async (): Promise<SoccerFieldDto[]> => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.get<SoccerFieldDto[]>(`${resource}/by-user`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os campos:", error);
    return [];
  }
};

export const getSoccerFieldById = async (
  id: string
): Promise<SoccerFieldDto | undefined> => {
  const { $api } = useNuxtApp();

  try {
    const { data } = await $api.get<SoccerFieldDto>(`${resource}/find/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar campo:", error);
    throw error;
  }
};

export const deleteSoccerField = async (id: string) => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.delete(`${resource}/${id}`);
    return response;
  } catch (error) {
    console.error("Erro ao deletar o campo:", error);
    throw error;
  }
};

export const fetchAvailableTimes = async (id: string, day: string) => {
  const { $api } = useNuxtApp();
  try {
    console.log('Buscando horários disponíveis:', { id, day });
    const response = await $api.get<Record<string, ScheduleDto[]>>(
      `${resource}/${id}/available-times`,
      {
        params: { day },
      }
    );
    
    console.log('Resposta da API:', response.data);
    
    if (!response.data) {
      console.warn('API retornou dados vazios');
      return [];
    }
    
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar horários disponíveis:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const updateSoccerField = async (id: string, soccerFieldData: Partial<SoccerFieldDto>) => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.put<{ data: CreateSoccerFieldDto }>(
      `/${resource}/${id}`,
      soccerFieldData
    );
    return { status: response.status, data: response.data}
  } catch (error){
    console.error("Erro ao atualizar campo:", error);
    throw error;
  }
};
