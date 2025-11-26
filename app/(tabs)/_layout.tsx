import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Remove o cabeçalho padrão (já temos o nosso customizado)
        tabBarActiveTintColor: colors.red[600], // Cor do ícone ativo (Vermelho iFood)
        tabBarInactiveTintColor: colors.gray[400], // Cor do ícone inativo
        tabBarStyle: {
          borderTopColor: colors.gray[200],
          backgroundColor: "#FFF",
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Cardápio",
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="orders"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}