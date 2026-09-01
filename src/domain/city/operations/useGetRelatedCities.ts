import { useTanstackQuery } from "@/src/infra/operations/useTanstackQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { CityPreview } from "../City";

export function useGetRelatedCities(id: string) {
  const { city } = useRepository();

  return useTanstackQuery<CityPreview[]>({
    queryKey: ["city", "related", id],
    fetchData: () => city.getRelatedCities(id),
  });
}
