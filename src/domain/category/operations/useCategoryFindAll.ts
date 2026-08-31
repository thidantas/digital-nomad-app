import { useTanstackQuery } from "@/src/infra/operations/useTanstackQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { Category } from "../Category";

export function useCategoryFindAll() {
  const { category } = useRepository();

  return useTanstackQuery<Category[]>({
    queryKey: ["category"],
    fetchData: () => category.findAll(),
  });
}
