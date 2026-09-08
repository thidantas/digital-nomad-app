import { UseAppMutationOptions } from "@/src/infra/operations/useAppMutation";
import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useFeedbackService } from "@/src/services/feedbackService/FeedbackProvider";
import { useQueryClient } from "@tanstack/react-query";
import { AuthUpdateProfileParams } from "../IAuthRepo";

export function useAuthUpdateProfile(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  const queryClient = useQueryClient();

  return useTanstackMutation<void, AuthUpdateProfileParams>({
    mutationFn: (params) => auth.updateProfile(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      options?.onSuccess?.();
      feedbackService.send({
        type: "success",
        message: `perfil atualizado com sucesso`,
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      feedbackService.send({
        type: "error",
        message: "erro ao atualizar perfil",
      });
    },
  });
}
