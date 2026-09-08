import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { Box, BoxProps } from "./Box";

export function Screen({
  children,
  scrollable = false,
  ...boxProps
}: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const Container = scrollable ? ScrollView : View;
  const { colors } = useAppTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        flex={1}
        backgroundColor="background"
        paddingHorizontal="default"
        {...boxProps}
      >
        <Container
          style={{ backgroundColor: colors.background }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Container>
      </Box>
    </KeyboardAvoidingView>
  );
}
