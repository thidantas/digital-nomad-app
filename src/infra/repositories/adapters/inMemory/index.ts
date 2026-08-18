import { Repositories } from "@/src/domain/Repositories";
import { InMemoryCategoryRepo } from "./InMemoryCategory";
import { InMemoryCityRepo } from "./InMemoryCityRepo";

export const InMemoryRepository: Repositories = {
  city: new InMemoryCityRepo(),
  category: new InMemoryCategoryRepo(),
};
