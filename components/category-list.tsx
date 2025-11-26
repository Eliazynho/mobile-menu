import { clsx } from 'clsx'; // O clsx ajuda a fazer condicional de classes (ativo/inativo)
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Category } from '../lib/types';

interface CategoryListProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CategoryList({ categories, selectedId, onSelect }: CategoryListProps) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }} // Espaçamento entre itens
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isSelected = item.id === selectedId;
        
        return (
          <TouchableOpacity 
            onPress={() => onSelect(item.id)}
            className={clsx(
              "px-4 py-2 rounded-full border",
              isSelected ? "bg-red-600 border-red-600" : "bg-white border-gray-200"
            )}
          >
            <Text className={clsx("font-bold text-sm", isSelected ? "text-white" : "text-gray-600")}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )
      }}
    />
  );
}