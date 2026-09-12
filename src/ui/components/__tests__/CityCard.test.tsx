import { CityPreview } from "@/src/domain/city/City";
import { renderComponent } from "@/src/test-utils/renderComponent";
import { screen } from "@testing-library/react-native";
import { CityCard } from "../CityCard";

const cityPreview: CityPreview = {
  id: "1",
  country: "Brasil",
  coverImage: "fake-url",
  name: "Rio de Janeiro",
  isFavorite: false,
};

describe("<CityCard />", () => {
  it("should render the component", () => {
    renderComponent(<CityCard cityPreview={cityPreview} />);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should display the city country and favorite icon", () => {
    renderComponent(<CityCard cityPreview={cityPreview} />);

    expect(screen.getByText("Brasil")).toBeOnTheScreen();
    expect(screen.getByTestId("icon-Favorite-outline")).toBeOnTheScreen();
  });

  it("should display the filled favorite icon when the city is favorite", () => {
    renderComponent(
      <CityCard cityPreview={{ ...cityPreview, isFavorite: true }} />,
    );

    expect(screen.getByTestId("icon-Favorite-fill")).toBeOnTheScreen();
  });
});

