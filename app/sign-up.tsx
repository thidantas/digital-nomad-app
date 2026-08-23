import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSignUp } from "@/src/domain/auth/operations/useAuthSignUp";
import { Logo } from "@/src/ui/components/Logo";
import { Screen } from "@/src/ui/components/Screen";
import { SignUpForm } from "@/src/ui/containers/Forms/SignUpForm/SignUpForm";
import { SignUpSchema } from "@/src/ui/containers/Forms/SignUpForm/SignUpSchema";
import { Header } from "@/src/ui/containers/Header";
import { router } from "expo-router";

export default function SignUpScreen() {
  const { mutate: signUp } = useAuthSignUp({ onSuccess: router.back });

  function handleSignUp(formValues: SignUpSchema) {
    signUp({
      email: formValues.email,
      fullname: formValues.fullname,
      password: formValues.password,
    });
  }

  return (
    <Screen scrollable>
      <SafeAreaView>
        <Header title="Criar conta" />
        <SignUpForm onSubmit={handleSignUp} />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
