import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useFeedbackService } from "@/src/services/feedbackService/FeedbackProvider";
import { useAuth } from "../AuthContext";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();
  const { saveAuthUser } = useAuth();

  const { mutate, error, isPending } = useTanstackMutation<
    AuthUser,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: (authUser) => {
      saveAuthUser(authUser);
      feedbackService.send({
        type: "success",
        message: `signed in: ${authUser.email}`,
      });
    },
    onError: (error) => {
      feedbackService.send({
        type: "error",
        message: "Erro ao fazer login",
        description: error.message ?? "Erro desconhecido",
      });
    },
  });

  return {
    mutate,
    error,
    isPending,
  };
}
