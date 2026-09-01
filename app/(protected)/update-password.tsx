import { Screen } from "@/src/ui/components/Screen";
import { UpdatePasswordForm } from "@/src/ui/containers/Forms/UpdatePasswordForm/UpdatePasswordForm";
import { Header } from "@/src/ui/containers/Header";

import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatePasswordScreen() {
  function handleUpdatePassword() {
    //
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
