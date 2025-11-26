import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Category } from "../lib/types";

// ID TEMPORÁRIO PARA TESTE
// Copie um ID real da sua tabela 'restaurants' no banco de dados e cole aqui.
// Sem um ID válido, a API vai retornar 404 ou lista vazia.
const RESTAURANT_ID = '1b872990-515e-4a98-b12f-d50fe269c2d3'; 

export function useMenu() {
  return useQuery({
    queryKey: ['menu', RESTAURANT_ID], 
    queryFn: async () => {
      // Estamos a chamar a rota '/products/:id' conforme o seu controller
      const response = await api.get<Category[]>(`/products/${RESTAURANT_ID}`);
      console.log("Cardápio carregado:", response.data.length, "categorias");
      return response.data;
    }
  });
}