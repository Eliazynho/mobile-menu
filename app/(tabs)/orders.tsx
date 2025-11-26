import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Orders() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-gray-800">Seus Pedidos</Text>
      <Text className="text-gray-500 mt-2">Você ainda não fez nenhum pedido.</Text>
    </SafeAreaView>
  );
}