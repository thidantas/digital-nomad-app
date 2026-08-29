import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import Animated, { FadingTransition } from "react-native-reanimated";

import { useCategoryFindAll } from "@/src/domain/category/operations/useCategoryFindAll";
import { CityPreview } from "@/src/domain/city/City";
import { useCityFindAll } from "@/src/domain/city/operations/useCityFindAll";
import { useSafeArea } from "@/src/hooks";
import { useDebounce } from "@/src/hooks/useDebounce";
import { Box, CityCard, Screen, Text } from "@/src/ui/components";
import { CityFilter } from "@/src/ui/containers/CityFilter";
import { useAppTheme } from "@/src/ui/theme/useAppTheme";

export default function HomeScreen() {
  const { spacing } = useAppTheme();
  const { top } = useSafeArea();
  const [cityName, setCityName] = useState("");

  const debouncedCityName = useDebounce(cityName);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const {
    data: cities,
    isLoading,
    error,
  } = useCityFindAll({
    name: debouncedCityName,
    categoryId: selectedCategoryId,
  });

  const { data: categories } = useCategoryFindAll();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <Box paddingHorizontal="default">
        <CityCard cityPreview={item} />
      </Box>
    );
  }

  function renderEmptyComponent() {
    let Content;

    if (isLoading) {
      Content = <Text>carregando cidades...</Text>;
    } else if (error) {
      Content = (
        <Text>erro ao carregar cidades. {(error as Error).message}</Text>
      );
    } else {
      Content = <Text>não há cidades no momento</Text>;
    }

    return (
      <Box alignSelf="center" mt="s32">
        {Content}
      </Box>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        contentContainerStyle={{
          gap: spacing.default,
          paddingTop: top,
          paddingBottom: spacing.default,
        }}
        data={cities}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={
          <CityFilter
            categories={categories}
            cityName={cityName}
            onChangeCityName={setCityName}
            selectedCategoryId={selectedCategoryId}
            onChangeSelectedCategoryId={setSelectedCategoryId}
          />
        }
      />
    </Screen>
  );
}
