import { useNuxtApp } from "#app";

export const generateTeamsByPlayerStars = async (matchId: string) => {
  const { $api } = useNuxtApp();

  const response = await $api.get(
    `/match/${matchId}/generate-teams-by-players-stars`
  );
  return response.data;
};
