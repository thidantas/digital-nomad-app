import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

import { useAppQuery } from "@/src/infra/operations/useAppQuery";
import { CityFindAllFilters } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilters) {
  const { city } = useRepository();

  return useAppQuery(
    () => city.findAll(filters),
    [filters.name, filters.categoryId],
  );
}
