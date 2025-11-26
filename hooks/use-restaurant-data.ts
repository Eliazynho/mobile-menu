import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Category, Restaurant } from "../lib/types";

// COLOQUE AQUI O SLUG DO SEU RESTAURANTE (igual está no banco de dados)
const RESTAURANT_SLUG = '90s-burgers'; 

export function useRestaurantData() {
  // 1. Busca os dados do restaurante pelo SLUG
  const restaurantQuery = useQuery({
    queryKey: ['restaurant', RESTAURANT_SLUG],
    queryFn: async () => {
      // Bate na rota: GET /restaurants/:slug
      const response = await api.get<Restaurant>(`/restaurants/${RESTAURANT_SLUG}`);
      return response.data;
    }
  });

  // 2. Busca o cardápio (só executa se a busca 1 tiver terminado e tivermos um ID)
  const menuQuery = useQuery({
    queryKey: ['menu', restaurantQuery.data?.id],
    queryFn: async () => {
      // Bate na rota: GET /products/:id
      const response = await api.get<Category[]>(`/products/${restaurantQuery.data?.id}`);
      return response.data;
    },
    // O "enabled" é a mágica: trava essa busca até termos o ID do restaurante
    enabled: !!restaurantQuery.data?.id, 
  });

  return {
    restaurant: restaurantQuery.data,
    categories: menuQuery.data,
    isLoading: restaurantQuery.isLoading || menuQuery.isLoading,
    isError: restaurantQuery.isError || menuQuery.isError,
  };
}