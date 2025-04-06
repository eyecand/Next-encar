import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { ModelProps } from "@/components/shared/Form/model";

export const getModels = async (makes: string): Promise<ModelProps[]> => {
  return (
    await axiosInstance.get<ModelProps[]>(ApiRoutes.MODELS, {
      params: { makes },
    })
  ).data;
};
