import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
export interface GradesProps {
  grade_english: string;
  grade_detail_english: string;
}
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
