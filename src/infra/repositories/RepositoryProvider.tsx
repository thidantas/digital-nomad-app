import { Repositories } from "@/src/domain/Repositories";
import React from "react";

export const RepositoryContext = React.createContext<Repositories>(
  {} as Repositories,
);

export const RepositoryProvider = RepositoryContext.Provider;

/** Example of how to use the RepositoryProvider */

// export function RepositoryProvider({ children }: { children: React.ReactNode }) {
//   const repositories = {
//     city: new InMemoryCityRepo(),
//     category: new InMemoryCategoryRepo(),
//   };

//   return <RepositoryContext.Provider value={repositories}>{children}</RepositoryContext.Provider>;
// }

export function useRepository(): Repositories {
  const context = React.useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      "Repository Context should be used within a RepositoryProvider",
    );
  }

  return context;
}
