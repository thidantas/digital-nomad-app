import { useAppQuery } from "@/src/infra/operations/useAppQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { CityPreview } from "../City";

export function useGetRelatedCities(id: string) {
  const { city } = useRepository();

  return useAppQuery<CityPreview[]>(() => city.getRelatedCities(id));
}
