import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
interface ModelProps {
  model_short_name: string;
}
export const getModels = async (makes: string): Promise<ModelProps[]> => {
  return (
    await axiosInstance.get<ModelProps[]>(ApiRoutes.MODELS, {
      params: { makes },
    })
  ).data;
};
