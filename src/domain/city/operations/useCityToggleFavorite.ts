import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { CityToggleFavoriteParams } from "../ICityRepo";

export function useCityToggleFavorite() {
  const { city } = useRepository();

  return useTanstackMutation<void, CityToggleFavoriteParams>({
    mutationFn: (variables) => city.toggleFavorite(variables),
  });
}
