import { useTanstackQuery } from "@/src/infra/operations/useTanstackQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useAuthGetUser() {
  const { auth } = useRepository();

  return useTanstackQuery({
    queryKey: ["user"],
    fetchData: () => auth.getUser(),
  });
}
