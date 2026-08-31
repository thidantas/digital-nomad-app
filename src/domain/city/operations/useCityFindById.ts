import { useTanstackQuery } from "@/src/infra/operations/useTanstackQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useCityFindById(id: string) {
  const { city } = useRepository();

  return useTanstackQuery({
    queryKey: ["city", id],
    fetchData: () => city.findById(id),
  });
}
