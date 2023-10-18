jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    push: jest.fn(),
    getState: jest.fn(),
  }),
  useIsFocused: () => ({}),
}));
