import { useTanstackQuery } from "@/src/infra/operations/useTanstackQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useFindAllFavorites() {
  const { city } = useRepository();

  return useTanstackQuery({
    queryKey: ["city", "favorite"],
    fetchData: () => city.findAllFavorites(),
  });
}
