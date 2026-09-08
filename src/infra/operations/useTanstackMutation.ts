import { useMutation } from "@tanstack/react-query";

type UseTanstackMutationReturn<DataT, TVariables> = {
  mutate: (variable: TVariables) => DataT | void;
  isPending: boolean;
  error: Error | null;
};

export type UseAppMutationOptions<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
};

type UseTanstackMutationParams<TData, TVariables> = {
  mutationFn: (variable: TVariables) => Promise<TData>;
} & UseAppMutationOptions<TData>;

export function useTanstackMutation<TData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
}: UseTanstackMutationParams<TData, TVariables>): UseTanstackMutationReturn<
  TData,
  TVariables
> {
  const { isPending, error, mutate } = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
    error,
  };
}
