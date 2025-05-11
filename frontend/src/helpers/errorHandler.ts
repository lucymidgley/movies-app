import { AxiosError } from "axios";

export const handleError = (error: any): string => {
  if (!error?.isAxiosError) throw error;
  const axiosError = error;
  const { response } = axiosError;
  if (!response) return axiosError.message; // e.g. "Network Error"
  if ((response.data).message) return response.data.message; // message from api
  if (response.headers?.["content-type"]?.includes("text/html"))
    return "Internal Server Error";
  if (typeof response.data == "string") return response.data;
  console.error(error);
  return "Internal Server Error";
};