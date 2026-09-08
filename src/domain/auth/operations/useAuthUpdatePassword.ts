import { UseAppMutationOptions } from "@/src/infra/operations/useAppMutation";
import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useFeedbackService } from "@/src/services/feedbackService/FeedbackProvider";
import { AuthUpdatePasswordParams } from "../IAuthRepo";

export function useAuthUpdatePassword(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  return useTanstackMutation<void, AuthUpdatePasswordParams>({
    mutationFn: (params) => auth.updatePassword(params),
    onSuccess: () => {
      options?.onSuccess?.();
      feedbackService.send({
        type: "success",
        message: `senha atualizada com sucesso`,
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      feedbackService.send({
        type: "error",
        message: "erro ao atualizar senha",
      });
    },
  });
}
