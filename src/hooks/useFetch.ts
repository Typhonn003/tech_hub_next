import { api } from "@/services/axiosClient";
import useSWR from "swr";

export const useFetch = <Data = any>(url: string, token: string) => {
  const fetcher = async ([url, token]: string[]) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await api.get(url);

    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR<Data>([url, token], () => fetcher([url, token]));

  return { data, error, isLoading, mutate };
};
