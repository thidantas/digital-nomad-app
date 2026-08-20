import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/src/ui/components/Button";
import { Logo } from "@/src/ui/components/Logo";
import { Screen } from "@/src/ui/components/Screen";
import { Header } from "@/src/ui/containers/Header";

export default function ResetPasswordScreen() {
  function handleResetPassword() {
    //
  }
  return (
    <Screen>
      <SafeAreaView>
        <Header title="Recuperar Senha" />
        <Button title="Enviar link" onPress={handleResetPassword} />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
