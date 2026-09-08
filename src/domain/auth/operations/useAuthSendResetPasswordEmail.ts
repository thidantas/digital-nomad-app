import { UseAppMutationOptions } from "@/src/infra/operations/useAppMutation";
import { useTanstackMutation } from "@/src/infra/operations/useTanstackMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useFeedbackService } from "@/src/services/feedbackService/FeedbackProvider";

export function useAuthSendResetPasswordEmail(
  options?: UseAppMutationOptions<void>,
) {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  return useTanstackMutation<void, { email: string }>({
    mutationFn: ({ email }) => auth.sendResetPasswordEmail(email),
    onSuccess: () => {
      options?.onSuccess?.();
      feedbackService.send({
        type: "success",
        message: `verifique sua caixa de e-mail`,
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      feedbackService.send({ type: "error", message: "error on sign" });
    },
  });
}
