import { Stack } from "expo-router";
import theme from "./styles/theme";

const { COLORS } = theme;

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'slide_from_right',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Pokédex",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Pokemon Details",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
