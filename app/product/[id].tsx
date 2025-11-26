import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/ui/button';
import { useMenu } from '../../hooks/use-menu';
import { useCartStore } from '../../stores/cart-store';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: categories } = useMenu();
  const addToCart = useCartStore(state => state.addItem);

  // Estado local para controle do formulário
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');

  // Encontrar o produto dentro das categorias (buscando no cache)
  const product = categories
    ?.flatMap(category => category.products)
    .find(item => item.id === id);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Produto não encontrado</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart({
        product,
        quantity,
        observation
    });
    // Volta para o cardápio
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
        <ScrollView className="flex-1">
            {/* Imagem do Cabeçalho */}
            <View className="relative h-72 w-full">
                <Image 
                    source={{ uri: product.imageUrl || 'https://via.placeholder.com/400' }} 
                    className="w-full h-full"
                    resizeMode="cover"
                />
                {/* Botão Voltar Flutuante */}
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="absolute top-12 left-4 bg-white/80 p-2 rounded-full"
                >
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Conteúdo */}
            <View className="p-5">
                <Text className="text-3xl font-bold text-gray-900 mb-2">{product.name}</Text>
                <Text className="text-gray-500 text-lg leading-6 mb-6">
                    {product.description}
                </Text>
                
                <Text className="text-2xl font-bold text-green-600 mb-6">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </Text>

                {/* Área de Observação */}
                <View className="mb-6">
                    <Text className="font-bold text-gray-700 mb-2">Observações</Text>
                    <TextInput
                        className="border border-gray-200 rounded-lg p-4 h-24 text-align-top bg-gray-50"
                        placeholder="Ex: Tirar a cebola, maionese à parte..."
                        multiline
                        textAlignVertical="top"
                        value={observation}
                        onChangeText={setObservation}
                    />
                </View>
            </View>
        </ScrollView>

        {/* Barra Fixa Inferior (Footer) */}
        <SafeAreaView edges={['bottom']} className="bg-white border-t border-gray-100 p-5 shadow-lg">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-600 font-bold">Quantidade</Text>
                <View className="flex-row items-center gap-4 bg-gray-100 rounded-lg p-2">
                    <TouchableOpacity onPress={() => quantity > 1 && setQuantity(q => q - 1)}>
                        <Feather name="minus" size={20} color={quantity > 1 ? "black" : "gray"} />
                    </TouchableOpacity>
                    
                    <Text className="text-lg font-bold w-4 text-center">{quantity}</Text>
                    
                    <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
                        <Feather name="plus" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <Button 
                title={`Adicionar • ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * quantity)}`} 
                onPress={handleAddToCart}
            />
        </SafeAreaView>
    </View>
  );
}