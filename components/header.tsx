import { Feather, FontAwesome } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import { Restaurant } from '../lib/types';

interface HeaderProps {
  restaurant?: Restaurant;
}

export function Header({ restaurant }: HeaderProps) {
  return (
    <View className="relative w-full pb-4 bg-white">
      {/* Banner / Capa */}
      <View className="h-36 w-full bg-gray-200">
        {restaurant?.background_url && (
            <Image 
                source={{ uri: restaurant.background_url }} 
                className="w-full h-full"
                resizeMode="cover"
            />
        )}
      </View>
      
      {/* Informações do Restaurante (Sobrepondo um pouco o banner ou logo abaixo) */}
      <View className="px-5 -mt-8 flex-row items-end">
        {/* Logo com borda branca para destacar */}
        <View className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-sm items-center justify-center overflow-hidden">
            <Image 
                source={{ uri: restaurant?.logo_url || 'https://via.placeholder.com/100' }} 
                className="w-full h-full"
                resizeMode="cover"
            />
        </View>

        <View className="flex-1 ml-3 mb-1">
             <Text className="text-2xl font-bold text-gray-900" numberOfLines={1}>
                {restaurant?.name || "Carregando..."}
             </Text>
             {/* Categoria do restaurante (Ex: Lanches) - Se tiver no banco */}
             <Text className="text-gray-500 text-xs">Lanches • Delivery</Text>
        </View>
      </View>

      {/* Badges de Informação (Tempo, Frete) */}
      <View className="px-5 mt-4 flex-row items-center gap-4">
        {/* Avaliação (Fake por enquanto) */}
        <View className="flex-row items-center gap-1">
            <FontAwesome name="star" size={14} color="#EAB308" />
            <Text className="text-yellow-600 font-bold text-xs">4.8</Text>
        </View>

        <View className="w-[1px] h-3 bg-gray-300" />

        {/* Tempo */}
        <View className="flex-row items-center gap-1">
            <Feather name="clock" size={14} color="#6B7280" />
            <Text className="text-gray-600 text-xs">{restaurant?.delivery_time || "30-40"} min</Text>
        </View>

        <View className="w-[1px] h-3 bg-gray-300" />

        {/* Frete */}
        <Text className="text-gray-600 text-xs">
            Entrega: {restaurant && Number(restaurant.fixed_delivery_price) > 0 
                ? `R$ ${restaurant.fixed_delivery_price}` 
                : 'Grátis'}
        </Text>
      </View>
    </View>
  );
}