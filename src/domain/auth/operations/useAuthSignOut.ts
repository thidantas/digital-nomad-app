import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAuth } from "../AuthContext";

export function useAuthSignOut() {
  const { auth } = useRepository();
  const { removeAuthUser } = useAuth();

  return useTanstackMutation({
    mutationFn: () => auth.signOut(),
    onSuccess: () => {
      removeAuthUser();
    },
  });
}
