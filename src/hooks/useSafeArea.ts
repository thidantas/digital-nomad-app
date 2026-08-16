import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useSafeArea() {
  const { top } = useSafeAreaInsets();

  return {
    top,
  };
}
