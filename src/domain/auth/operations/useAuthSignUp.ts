import { UseAppMutationOptions } from "@/src/infra/operations/useAppMutation";
import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useFeedbackService } from "@/src/services/feedbackService/FeedbackProvider";
import { AuthSignUpParams } from "../IAuthRepo";

export function useAuthSignUp(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  return useTanstackMutation<void, AuthSignUpParams>({
    mutationFn: (params) => auth.signUp(params),
    onSuccess: () => {
      options?.onSuccess?.();
      feedbackService.send({
        type: "success",
        message: `cadastro feito com sucesso`,
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      feedbackService.send({ type: "error", message: "erro ao cadastrar" });
    },
  });
}
