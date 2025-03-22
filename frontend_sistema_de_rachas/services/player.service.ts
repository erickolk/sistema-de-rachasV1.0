import type { CreatePlayerDto, PlayerDto } from "sistema-rachas-domain/dto/player.dto";

const resource = "player";
export const createPlayerAPI = async (player: {
  name: string;
  stars: number;
}) => {
  console.log("Dados enviados para a API de criação de jogador:", player);
  const { $api } = useNuxtApp();
  try {
    const { data } = await $api.post<{ data: CreatePlayerDto }>(resource, player);
    console.log("Resposta da API ao criar jogador:", data);
    return data;
  } catch (error) {
    throw new Error("Erro ao criar jogador: " + error);
  }
};

export const deletePlayerAPI = async (playerId: string, matchId: string) => {
  const { $api } = useNuxtApp();
  try {
    await $api.put(`/match/${matchId}`);
    console.log(
      `Jogador ${playerId} removido com sucesso da partida ${matchId}.`
    );
  } catch (error) {
    console.error(`Erro ao remover jogador ${playerId}:`, error);
    throw error;
  }
};

export const updatePlayersMatch = async (
  players: Array<CreatePlayerDto>,
  matchId: string
) => {
  const { $api } = useNuxtApp();
  try {
    await $api.put(`/match/${matchId}`, { players }); 
    console.log(`Jogadores atualizados na partida ${matchId}.`);
  } catch (error) {
    console.error(`Erro ao atualizar jogadores na partida ${matchId}:`, error);
    throw error;
  }
};
