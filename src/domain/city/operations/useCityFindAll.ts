import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

import { useTanstackQuery } from "@/src/infra/operations/useTanstackQuery";
import { CityFindAllFilters } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilters) {
  const { city } = useRepository();

  const { data, error, isLoading } = useTanstackQuery({
    queryKey: ["city", filters.name, filters.categoryId],
    fetchData: () => city.findAll(filters),
  });

  return {
    data,
    error,
    isLoading,
  };

  // return useAppQuery(
  //   () => city.findAll(filters),
  //   [filters.name, filters.categoryId],
  // );
}
