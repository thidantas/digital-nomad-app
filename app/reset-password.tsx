import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSendResetPasswordEmail } from "@/src/domain/auth/operations/useAuthSendResetPasswordEmail";
import { Text } from "@/src/ui/components";
import { Button } from "@/src/ui/components/Button";
import { Logo } from "@/src/ui/components/Logo";
import { Screen } from "@/src/ui/components/Screen";
import { TextInput } from "@/src/ui/components/TextInput";
import { Header } from "@/src/ui/containers/Header";
import { TextLink } from "@/src/ui/containers/TextLink";
import { router } from "expo-router";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const { mutate: sendResetEmail } = useAuthSendResetPasswordEmail({
    onSuccess: router.back,
  });

  function handleResetPassword() {
    sendResetEmail({ email });
  }

  return (
    <Screen>
      <SafeAreaView>
        <Header title="Recuperar Senha" />
        <Text mb="s16">
          Digite o endereço de e-mail associado à sua conta e enviaremos
          instruções para redefinir sua senha
        </Text>
        <TextInput
          label="E-mail"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="seu email"
        />
        <Button title="Enviar link" onPress={handleResetPassword} />
        <TextLink
          goBackOnPress
          text="Lembrou sua senha?"
          ctaText="Voltar para o login"
        />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
