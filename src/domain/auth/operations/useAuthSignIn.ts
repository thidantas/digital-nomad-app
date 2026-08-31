import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useFeedbackService } from "@/src/services/feedbackService/FeedbackProvider";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../AuthContext";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();
  const { saveAuthUser } = useAuth();

  const { mutate, error, isPending } = useMutation<
    AuthUser,
    Error,
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

  // return useAppMutation<AuthUser, { email: string; password: string }>({
  //   mutateFn: ({ email, password }) => auth.signIn(email, password),
  //   onSuccess: (authUser) => {
  //     saveAuthUser(authUser);
  //     feedbackService.send({
  //       type: "success",
  //       message: `signed in: ${authUser.email}`,
  //     });
  //   },
  //   onError: (error) => {
  //     feedbackService.send({
  //       type: "error",
  //       message: "Erro ao fazer login",
  //       description: (error as Error).message ?? "Erro desconhecido",
  //     });
  //   },
  // });
}
