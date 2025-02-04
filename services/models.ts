import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { ModelProps } from "@/components/shared/form-filters";

export const getModels = async (query: string): Promise<ModelProps[]> => {
  return (
    await axiosInstance.get<ModelProps[]>(ApiRoutes.MODELS, {
      params: { query },
    })
  ).data;
};
