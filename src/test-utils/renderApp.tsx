import HomeScreen from "@/app/(protected)/(tabs)";
import TabLayout from "@/app/(protected)/(tabs)/_layout";
import ExploreScreen from "@/app/(protected)/(tabs)/explore";
import ProfileScreen from "@/app/(protected)/(tabs)/profile";
import ProtectedLayout from "@/app/(protected)/_layout";
import CityDetails from "@/app/(protected)/city-details/[id]";
import SignInScreen from "@/app/sign-in";
import SignUpScreen from "@/app/sign-up";
import { renderRouter } from "expo-router/testing-library";
import { AppStack } from "../ui/navigation/AppStack";

import { ThemeProvider } from "@shopify/restyle";

import { AuthContext, AuthProvider } from "../domain/auth/AuthContext";
import { AuthUser } from "../domain/auth/AuthUser";

import { InMemoryRepository } from "../infra/repositories/adapters/inMemory";
import { RepositoryProvider } from "../infra/repositories/RepositoryProvider";
import { inMemoryStorage } from "../infra/storage/adapters/InMemoryStorage";
import { StorageProvider } from "../infra/storage/StorageContext";
import { ToastFeedback } from "../services/feedbackService/adapters/toast/ToastFeedback";
import { FeedbackProvider } from "../services/feedbackService/FeedbackProvider";
import { Toast } from "../ui/components/Toast";
import theme from "../ui/theme/theme";

import UpdatePasswordScreen from "@/app/(protected)/update-password";
import UpdateProfileScreen from "@/app/(protected)/update-profile";
import NotFoundScreen from "@/app/+not-found";
import ResetPasswordScreen from "@/app/reset-password";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clonedeep from "lodash.clonedeep";
import merge from "lodash.merge";
import { Repositories } from "../domain/Repositories";
import { queryClientOptions } from "./queryClientOptions";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepPartialMerge<T>(target: T, source: DeepPartial<T>): T {
  return merge(clonedeep(target), source);
}

function MockedAuthProvider({ children }: React.PropsWithChildren) {
  const authUser: AuthUser = {
    email: "lucas@coffstack.com",
    id: "1",
    fullname: "Lucas Garcez",
    createdAt: "2025-06-23T10:32:55.10671Z",
  };

  return (
    <AuthContext.Provider
      value={{
        isReady: true,
        authUser,
        saveAuthUser: async () => {},
        removeAuthUser: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function renderApp(options?: {
  isAuthenticated?: boolean;
  repositories?: DeepPartial<Repositories>;
}) {
  const client = new QueryClient(queryClientOptions);
  const FinalAuthProvider = options?.isAuthenticated
    ? MockedAuthProvider
    : AuthProvider;

  const FinalRepositories = deepPartialMerge(
    InMemoryRepository,
    options?.repositories ?? {},
  );

  function Wrapper({ children }: React.PropsWithChildren) {
    return (
      <QueryClientProvider client={client}>
        <StorageProvider storage={inMemoryStorage}>
          <FinalAuthProvider>
            <FeedbackProvider value={ToastFeedback}>
              <RepositoryProvider value={FinalRepositories}>
                <ThemeProvider theme={theme}>
                  {children}
                  <Toast />
                </ThemeProvider>
              </RepositoryProvider>
            </FeedbackProvider>
          </FinalAuthProvider>
        </StorageProvider>
      </QueryClientProvider>
    );
  }

  renderRouter(
    {
      _layout: () => <AppStack />,
      "(protected)/_layout": () => <ProtectedLayout />,
      "(protected)/(tabs)/_layout": () => <TabLayout />,
      "(protected)/(tabs)/index": () => <HomeScreen />,
      "(protected)/(tabs)/explore": () => <ExploreScreen />,
      "(protected)/(tabs)/profile": () => <ProfileScreen />,
      "(protected)/city-details/[id]": () => <CityDetails />,
      "(protected)/update-profile": () => <UpdateProfileScreen />,
      "(protected)/update-password": () => <UpdatePasswordScreen />,
      "+not-found": () => <NotFoundScreen />,
      "sign-in": () => <SignInScreen />,
      "sign-up": () => <SignUpScreen />,
      "reset-password": () => <ResetPasswordScreen />,
    },
    { wrapper: Wrapper, initialUrl: "/" },
  );
}
