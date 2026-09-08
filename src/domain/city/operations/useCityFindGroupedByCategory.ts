import { useTanstackQuery } from "@/src/infra/operations/useTanstackQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useCityFindGroupedByCategory() {
  const { city } = useRepository();

  return useTanstackQuery({
    queryKey: ["city", "category-grouped"],
    fetchData: () => city.findGroupedByCategory(),
  });
}
