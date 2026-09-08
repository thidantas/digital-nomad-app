import { Link } from "expo-router";
import { ImageBackground, Pressable, useWindowDimensions } from "react-native";

import { CityPreview } from "@/src/domain/city/City";
import { useAppTheme } from "../theme/useAppTheme";
import { BlackOpacity } from "./BlackOpacity";
import { Box } from "./Box";
import { CityFavoriteButton } from "./CityFavoriteButton";
import { Text } from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
  type?: "small" | "large";
  disableFavorite?: boolean;
};

export function CityCard({
  cityPreview,
  type = "large",
  disableFavorite = false,
}: CityCardProps) {
  const { borderRadii } = useAppTheme();

  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  const style =
    type === "small" ? { width: cardWith, height: cardHeight } : undefined;

  return (
    <Link
      push
      href={{
        pathname: "/(protected)/city-details/[id]",
        params: { id: cityPreview.id },
      }}
      asChild
    >
      <Pressable>
        <ImageBackground
          source={
            typeof cityPreview.coverImage === "number"
              ? cityPreview.coverImage
              : { uri: cityPreview.coverImage }
          }
          style={[{ width: "100%", height: 280 }, style]}
          imageStyle={{ borderRadius: borderRadii.default }}
        >
          <BlackOpacity />

          <Box flex={1} padding="s24" justifyContent="space-between">
            {!disableFavorite && (
              <Box alignSelf="flex-end">
                <CityFavoriteButton city={cityPreview} />
              </Box>
            )}

            <Box>
              <Text variant="title22">{cityPreview.name}</Text>
              <Text variant="text16">{cityPreview.country}</Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
