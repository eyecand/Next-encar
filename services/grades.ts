import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { GradesProps } from "@/components/shared/Form/model";

export const getGrades = async (
  makes: string | null,
  model: string | null
): Promise<GradesProps[]> => {
  return (
    await axiosInstance.get<GradesProps[]>(ApiRoutes.GRADES, {
      params: { makes, model },
    })
  ).data;
};
