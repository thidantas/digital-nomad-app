import { useAuthSignIn } from "@/src/domain/auth/operations/useAuthSignIn";
import { Text } from "@/src/ui/components";
import { Button } from "@/src/ui/components/Button";
import { Logo } from "@/src/ui/components/Logo";
import { Screen } from "@/src/ui/components/Screen";
import { TextInput } from "@/src/ui/components/TextInput";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signIn } = useAuthSignIn();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Screen>
      <SafeAreaView>
        <Logo />
        <Text variant="title22" alignSelf="center" mb="s16">
          Bem-vindo
        </Text>
        <TextInput
          // errorMessage="mensagem de erro"
          autoCapitalize="none"
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seu email"
        />
        <TextInput
          autoCapitalize="none"
          label="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="digite sua senha"
        />

        <Link href="/reset-password" asChild>
          <Text mb="s16" alignSelf="flex-end" variant="text14" color="primary">
            Esqueceu sua senha
          </Text>
        </Link>

        <Button title="Entrar" onPress={handleSignIn} />

        <Link href="/sign-up" asChild>
          <Text alignSelf="center" mt="s16" color="gray2">
            Ainda não tem uma conta?{" "}
            <Text variant="title14" color="primary">
              Criar
            </Text>
          </Text>
        </Link>
      </SafeAreaView>
    </Screen>
  );
}
