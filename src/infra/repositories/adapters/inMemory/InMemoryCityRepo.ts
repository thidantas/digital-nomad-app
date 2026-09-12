import { City, CityPreview } from "@/src/domain/city/City";
import {
  CitiesGroupedByCategory,
  CityFindAllFilters,
  CityToggleFavoriteParams,
  ICityRepo,
} from "@/src/domain/city/ICityRepo";
import { categories } from "./data/categories";
import { cities } from "./data/cities";

export class InMemoryCityRepo implements ICityRepo {
  async findById(id: string): Promise<City> {
    const city = cities.find((city) => city.id === id);
    if (city) {
      return city;
    }
    throw new Error("City not found");
  }

  async getRelatedCities(cityId: string): Promise<CityPreview[]> {
    const city = cities.find((city) => city.id === cityId);
    return cities.filter((c) => city?.relatedCitiesIds.includes(c.id));
  }

  async findAll({
    name,
    categoryId,
  }: CityFindAllFilters): Promise<CityPreview[]> {
    let cityPreviewList = [...cities];

    if (name) {
      cityPreviewList = cityPreviewList.filter((city) => {
        return city.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (categoryId) {
      cityPreviewList = cityPreviewList.filter((city) => {
        return city.categories.some((category) => category.id === categoryId);
      });
    }

    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve("");
    //   }, 2000);
    // });

    // throw new Error("server is down!");

    return cityPreviewList;
  }

  async toggleFavorite({
    cityId,
    isFavorite,
  }: CityToggleFavoriteParams): Promise<void> {
    const city = cities.find((city) => city.id === cityId);
    if (!city) {
      throw new Error("City not found");
    }

    city.isFavorite = !isFavorite;
  }

  async findAllFavorites(): Promise<CityPreview[]> {
    return cities.filter((city) => city.isFavorite);
  }

  async findGroupedByCategory(): Promise<CitiesGroupedByCategory[]> {
    return categories
      .map((category) => ({
        category,
        cities: cities.filter((city) =>
          city.categories.some(
            (cityCategory) => cityCategory.id === category.id,
          ),
        ),
      }))
      .filter((group) => group.cities.length > 0);
  }
}
