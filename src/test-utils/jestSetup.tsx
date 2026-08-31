jest.mock("@/src/ui/components/Icon", () => {
  const { View } = jest.requireActual("react-native");

  return {
    Icon: ({ name }: { name: string }) => <View testID={`icon-${name}`} />,
  };
});
