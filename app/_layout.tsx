import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../utils/ThemeContext";

function StackWrapper() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.background,
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

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StackWrapper />
    </ThemeProvider>
  );
}
