import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
interface GradesProps {
  grades: {
    grade_english: string;
  };
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
