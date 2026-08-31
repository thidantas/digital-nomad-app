import { useAuthGetUser } from "@/src/domain/auth/operations/useAuthGetUser";
import { useAuthSignOut } from "@/src/domain/auth/operations/useAuthSignOut";
import { Box, Icon, Screen, Text } from "@/src/ui/components";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { mutate: signOut } = useAuthSignOut();

  const { data } = useAuthGetUser();

  console.log({ data });

  return (
    <Screen>
      <SafeAreaView>
        <Text>Profile Screen</Text>
        <Pressable onPress={signOut}>
          <Box flexDirection="row" alignItems="center">
            <Text>Sair</Text>
            <Icon name="Logout" color="primary" />
          </Box>
        </Pressable>
      </SafeAreaView>
    </Screen>
  );
}
