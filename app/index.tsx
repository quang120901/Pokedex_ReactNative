import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {

  useEffect(() => {

  }, [])

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20"
      );
      const data = await response.json();
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
