import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../AuthContext";

export function useAuthSignOut() {
  const { auth } = useRepository();
  const { removeAuthUser } = useAuth();

  const queryClient = useQueryClient();

  return useTanstackMutation({
    mutationFn: () => auth.signOut(),
    onSuccess: () => {
      queryClient.clear();
      removeAuthUser();
    },
  });
}
