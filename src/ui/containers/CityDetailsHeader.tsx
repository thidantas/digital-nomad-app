import { City } from "@/src/domain/city/City";
import { useSafeArea } from "@/src/hooks";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import { BlackOpacity, CategoryPill, PILL_HEIGHT } from "../components";
import { Box } from "../components/Box";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";

type CityDetailsHeaderProps = Pick<City, "id" | "coverImage" | "categories">;

export function CityDetailsHeader({
  coverImage,
  categories,
}: CityDetailsHeaderProps) {
  const { top } = useSafeArea();

  return (
    <Box>
      <ImageBackground
        source={
          typeof coverImage === "number" ? coverImage : { uri: coverImage }
        }
        style={{ width: "100%", height: 250 }}
        imageStyle={{ borderBottomRightRadius: 40 }}
      >
        <BlackOpacity />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding="default"
          style={{ paddingTop: top }}
        >
          <IconButton iconName="Chevron-left" onPress={router.back} />
          <Icon name="Favorite-outline" size={30} color="pureWhite" />
        </Box>
      </ImageBackground>
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: -PILL_HEIGHT / 2 }}
      >
        <Box flexDirection="row" gap="s8" paddingHorizontal="default">
          {categories.map((category) => (
            <CategoryPill active={true} key={category.id} category={category} />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
