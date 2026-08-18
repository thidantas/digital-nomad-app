import { cities } from "@/src/data/cities";
import { City, CityPreview } from "@/src/domain/city/City";
import { CityFindAllFilters, ICityRepo } from "@/src/domain/city/ICityRepo";

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

  async findAll(filters: CityFindAllFilters): Promise<CityPreview[]> {
    return cities;
  }
}
