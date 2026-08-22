import { SafeAreaView } from "react-native-safe-area-context";

import { Logo } from "@/src/ui/components/Logo";
import { Screen } from "@/src/ui/components/Screen";
import { SignUpForm } from "@/src/ui/containers/Forms/SignUpForm/SignUpForm";
import { Header } from "@/src/ui/containers/Header";

export default function SignUpScreen() {
  function handleSignUp() {
    //
  }
  return (
    <Screen>
      <SafeAreaView>
        <Header title="Criar conta" />
        <SignUpForm onSubmit={handleSignUp} />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
