import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { ActivityIndicator, SectionList, Text, View } from 'react-native';

import { CategoryList } from '../../components/category-list';
import { Header } from '../../components/header';
import { ProductItem } from '../../components/product-item';
import { useRestaurantData } from '../../hooks/use-restaurant-data';
import { Category } from '../../lib/types';

export default function Home() {
  const { restaurant, categories, isLoading } = useRestaurantData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const sectionListRef = useRef<SectionList>(null);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  const sections = categories?.map((category: Category) => ({
    title: category.name,
    data: category.products,
    id: category.id
  })) || [];

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    const sectionIndex = sections.findIndex((section) => section.id === id);
    if (sectionIndex >= 0 && sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
            sectionIndex,
            itemIndex: 0,
            animated: true,
            viewOffset: 50 // Compensação visual para o título não ficar escondido
        });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" backgroundColor="transparent" translucent />
      
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true} // O Segredo do "Sticky"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        
        ListHeaderComponent={() => (
          <View>
             <Header restaurant={restaurant} />
             
             <View className="py-2 bg-white border-b border-gray-100">
                <CategoryList 
                    categories={categories || []} 
                    selectedId={selectedCategory} 
                    onSelect={handleSelectCategory}
                />
             </View>
          </View>
        )}

        // O cabeçalho da seção precisa ter fundo (bg-white) para cobrir o conteúdo ao rolar
        renderSectionHeader={({ section: { title } }) => (
          <View className="bg-white px-5 py-4 border-b border-gray-100/50">
            <Text className="text-xl font-bold text-gray-900">
                {title}
            </Text>
          </View>
        )}

        renderItem={({ item }) => (
            <Link href={`/product/${item.id}`} asChild>
                <View className="px-5">
                    <ProductItem product={item} />
                </View>
            </Link>
        )}
      />
    </View>
  );
}