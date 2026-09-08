import { AuthProvider } from "@/src/domain/auth/AuthContext";
import { SupabaseRepositories } from "@/src/infra/repositories/adapters/supabase";
import { RepositoryProvider } from "@/src/infra/repositories/RepositoryProvider";
import { AsyncStorage } from "@/src/infra/storage/adapters/AsyncStorage";
import { StorageProvider } from "@/src/infra/storage/StorageContext";
import { ToastFeedback } from "@/src/services/feedbackService/adapters/toast/ToastFeedback";
import { FeedbackProvider } from "@/src/services/feedbackService/FeedbackProvider";
import { Toast } from "@/src/ui/components/Toast";
import { AppStack } from "@/src/ui/navigation/AppStack";
import theme from "@/src/ui/theme/theme";
import {
  DarkTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

if (__DEV__) {
  require("../ReactotronConfig");
}

const client = new QueryClient();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.colors.background,
    card: theme.colors.background,
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    IcoMoon: require("../assets/icons/icomoon.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBlackItalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsExtraLightItalic: require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsLightItalic: require("../assets/fonts/Poppins-LightItalic.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsSemiBoldItalic: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("../assets/fonts/Poppins-ThinItalic.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <StorageProvider storage={AsyncStorage}>
        <AuthProvider>
          <RepositoryProvider value={SupabaseRepositories}>
            <ThemeProvider theme={theme}>
              <NavigationThemeProvider value={navigationTheme}>
                <FeedbackProvider value={ToastFeedback}>
                  <AppStack />
                  <StatusBar style="light" />
                  <Toast />
                </FeedbackProvider>
              </NavigationThemeProvider>
            </ThemeProvider>
          </RepositoryProvider>
        </AuthProvider>
      </StorageProvider>
    </QueryClientProvider>
  );
}
