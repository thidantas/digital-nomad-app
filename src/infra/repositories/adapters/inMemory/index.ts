import { Repositories } from "@/src/domain/Repositories";
import { InMemoryAuthRepo } from "./InMemoryAuthRepo";
import { InMemoryCategoryRepo } from "./InMemoryCategory";
import { InMemoryCityRepo } from "./InMemoryCityRepo";

export const InMemoryRepository: Repositories = {
  auth: new InMemoryAuthRepo(),
  city: new InMemoryCityRepo(),
  category: new InMemoryCategoryRepo(),
};
