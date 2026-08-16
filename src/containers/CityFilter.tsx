import { ScrollView } from "react-native";
import { Box } from "../components/Box";
import { CategoryPill } from "../components/CategoryPill";
import { SearchInput } from "../components/SearchInput";
import { Category } from "../types";

type CityFilterProps = {
  categories: Category[];
  cityName: string;
  onChangeCityName: (cityName: string) => void;
  selectedCategoryId: string | null;
  onChangeSelectedCategoryId: (id: string | null) => void;
};

export function CityFilter({
  categories,
  cityName,
  onChangeCityName,
  selectedCategoryId,
  onChangeSelectedCategoryId,
}: CityFilterProps) {
  return (
    <Box>
      <Box paddingHorizontal="default">
        <SearchInput
          value={cityName}
          onChangeText={onChangeCityName}
          placeholder="Qual seu próximo destino?"
        />
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box mt="s16" flexDirection="row" gap="s8" paddingHorizontal="default">
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              active={category.id === selectedCategoryId}
              category={category}
              onPress={() =>
                onChangeSelectedCategoryId(
                  category.id === selectedCategoryId ? null : category.id,
                )
              }
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
