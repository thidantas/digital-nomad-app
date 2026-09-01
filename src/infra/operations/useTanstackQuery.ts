import { useQuery } from "@tanstack/react-query";

type UseTanstackQueryReturn<DataT> = {
  data?: DataT;
  isLoading: boolean;
  isPending: boolean;
  error: unknown;
};

type UseTanstackQueryParams<DataT> = {
  queryKey: (string | null | undefined | number)[];
  fetchData: () => Promise<DataT>;
};

export function useTanstackQuery<DataT>({
  fetchData,
  queryKey,
}: UseTanstackQueryParams<DataT>): UseTanstackQueryReturn<DataT> {
  const { data, isLoading, error, isPending } = useQuery({
    queryKey,
    queryFn: fetchData,
  });

  return {
    data,
    isLoading,
    isPending,
    error,
  };
}
