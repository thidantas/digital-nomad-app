import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { UpdateProfileForm } from "@/src/ui/containers/Forms/UpdateProfileForm/UpdateProfileForm";
import { Header } from "@/src/ui/containers/Header";
import { useLocalSearchParams } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateProfileScreen() {
  const searchParams = useLocalSearchParams<{
    fullname: string;
    email: string;
  }>();

  function handleUpdateProfile() {
    //
  }
  return (
    <Screen scrollable>
      <SafeAreaView>
        <Header title="Atualizar Perfil" />
        <Text mb="s16">
          Mantenha suas informações atualizadas para uma melhor experiência
        </Text>
        <UpdateProfileForm
          onSubmit={handleUpdateProfile}
          defaultValues={{
            email: searchParams.email,
            fullname: searchParams.fullname,
          }}
        />
      </SafeAreaView>
    </Screen>
  );
}
