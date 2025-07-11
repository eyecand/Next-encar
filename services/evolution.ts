import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
interface EvolutionProps {
  model_english: string;
}
export const getEvolution = async (
  makes: string | null,
  model: string | null
): Promise<EvolutionProps[]> => {
  return (
    await axiosInstance.get<EvolutionProps[]>(ApiRoutes.EVOLUTION, {
      params: { makes, model },
    })
  ).data;
};
