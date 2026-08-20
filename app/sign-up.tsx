import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/src/ui/components/Button";
import { Logo } from "@/src/ui/components/Logo";
import { Screen } from "@/src/ui/components/Screen";
import { Header } from "@/src/ui/containers/Header";

export default function SignUpScreen() {
  function handleSignUp() {
    //
  }
  return (
    <Screen>
      <SafeAreaView>
        <Header title="Criar conta" />
        <Button title="Criar conta" onPress={handleSignUp} />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
