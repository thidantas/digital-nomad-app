import { Redirect, Stack } from "expo-router";

const isSignedIn = false;

export default function ProtectedLayout() {
  if (!isSignedIn) {
    console.log("Redirecting to sign-in");
    return <Redirect href="/sign-in" />;
  }
  return (
    <Stack
      screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
