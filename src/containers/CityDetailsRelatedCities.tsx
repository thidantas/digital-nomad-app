import { ScrollView, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "../components/Box";
import { CityCard } from "../components/CityCard";
import { Text } from "../components/Text";

import { useAppTheme } from "../theme/useAppTheme";

import { City } from "../domain/city/City";
import { useGetRelatedCities } from "../domain/city/operations/useGetRelatedCities";

type Props = Pick<City, "id">;

export function CityDetailsRelatedCities({ id }: Props) {
  const { data: cities } = useGetRelatedCities(id);

  const { spacing } = useAppTheme();
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  return (
    <Box style={{ paddingBottom: bottom }}>
      <Text variant="title22" mb="s16" paddingHorizontal="default">
        Veja Também
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.default,
          paddingHorizontal: spacing.default,
        }}
      >
        {cities?.map((city) => (
          <CityCard
            key={city.id}
            cityPreview={city}
            style={{ width: cardWith, height: cardHeight }}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
