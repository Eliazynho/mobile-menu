import React, { forwardRef } from 'react';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Product } from '../lib/types';

interface ProductItemProps extends TouchableOpacityProps {
  product: Product;
}

export const ProductItem = forwardRef<React.ElementRef<typeof TouchableOpacity>, ProductItemProps>(({ product, ...props }, ref) => {
  return (
    <TouchableOpacity 
      ref={ref} 
      className="w-full flex-row items-start py-4 border-b border-gray-100 bg-white"
      activeOpacity={0.7} // Feedback visual ao tocar
      {...props}
    >
      {/* Informações (Lado Esquerdo - Flex 1 para ocupar espaço) */}
      <View className="flex-1 pr-4">
        <Text className="text-gray-900 font-semibold text-base mb-1">
          {product.name}
        </Text>
        
        <Text className="text-gray-500 text-xs leading-5 mb-2" numberOfLines={2}>
          {product.description}
        </Text>

        <Text className="text-gray-900 font-medium text-sm">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
        </Text>
      </View>

      {/* Imagem (Lado Direito) */}
      {product.imageUrl && (
          <View className="relative">
             <Image 
                source={{ uri: product.imageUrl }} 
                className="w-24 h-24 rounded-xl bg-gray-100"
                resizeMode="cover"
            />
            {/* Opcional: Um ícone de + sobre a imagem ou ao lado (estilo iFood atual) */}
          </View>
      )}
    </TouchableOpacity>
  );
});