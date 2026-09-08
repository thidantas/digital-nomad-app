import { useAuthGetUser } from "@/src/domain/auth/operations/useAuthGetUser";
import { useAuthSignOut } from "@/src/domain/auth/operations/useAuthSignOut";
import { Box, Icon, Screen, Text } from "@/src/ui/components";
import { FavoriteCityList } from "@/src/ui/containers/Profile/FavoriteCityList";
import { ProfileHeader } from "@/src/ui/containers/Profile/ProfileHeader";
import { Pressable } from "react-native";

export default function ProfileScreen() {
  const { mutate: signOut } = useAuthSignOut();
  const { data: authUser } = useAuthGetUser();

  return (
    <Screen>
      <FavoriteCityList
        ListHeaderComponent={authUser && <ProfileHeader authUser={authUser} />}
        ListFooterComponent={
          <Pressable onPress={signOut}>
            <Box
              mt="s24"
              flexDirection="row"
              alignItems="center"
              alignSelf="center"
            >
              <Icon name="Logout" color="fbErrorSurface" />
              <Text color="fbErrorSurface">Sair</Text>
            </Box>
          </Pressable>
        }
      />
    </Screen>
  );
}
