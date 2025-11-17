import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import WishListCard from './WishListCard';
import images from '../../images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const WishListScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const data = [
    {
      id: '1',
      title: 'Đã xem gần đây',
      date: 'Hôm nay',
      saved: 'Đã lưu 4 mục',
      images: [images.banner1, images.banner2, images.banner3, images.banner4],
    },
    {
      id: '2',
      title: 'Trải nghiệm 2026',
      date: '30 – 31 thg 10 (+2)',
      saved: 'Đã lưu 9 mục',
      image: images.banner1,
    },
    {
      id: '3',
      title: 'Trải nghiệm 2025',
      saved: 'Đã lưu 2 mục',
      image: images.banner2,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <WishListCard
              title={item.title}
              date={item.date}
              saved={item.saved}
              image={item.image}
              images={item.images}
              onPress={() => navigation.navigate('wishListDetail')}
            />
          </View>
        )}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
});
export default WishListScreen;
