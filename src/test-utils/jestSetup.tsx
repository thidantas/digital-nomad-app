jest.mock("@/src/ui/components/Icon", () => {
  const { Text } = jest.requireActual("react-native");
  return {
    Icon: ({ name }: { name: string }) => <Text>{name}</Text>,
  };
});
