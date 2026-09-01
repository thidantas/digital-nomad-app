import { useAuthUpdatePassword } from "@/src/domain/auth/operations/useAuthUpdatePassword";
import { Screen } from "@/src/ui/components/Screen";
import { UpdatePasswordForm } from "@/src/ui/containers/Forms/UpdatePasswordForm/UpdatePasswordForm";
import { UpdatePasswordSchema } from "@/src/ui/containers/Forms/UpdatePasswordForm/UpdatePasswordSchema";
import { Header } from "@/src/ui/containers/Header";
import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatePasswordScreen() {
  const { mutate: updatePassword } = useAuthUpdatePassword({
    onSuccess: () => {
      router.back();
    },
  });

  function handleUpdatePassword(data: UpdatePasswordSchema) {
    updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }

  return (
    <Screen scrollable>
      <SafeAreaView>
        <Header title="Atualizar Senha" />
        <UpdatePasswordForm onSubmit={handleUpdatePassword} />
      </SafeAreaView>
    </Screen>
  );
}
