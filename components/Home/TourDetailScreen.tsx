import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../images';
import ExpandableText from './ExpandableText';
import SelectDateModal from './SelectDate.modal';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ActiveModal from './Active.modal';
import ActiveCard from './ActiveCard';
import CustomButton from '../component/CustomButton';

const { width } = Dimensions.get('window');

const TourDetailScreen = () => {
  const navigation: NavigationProp<any> = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);

  const tourImages = [
    images.banner1,
    images.banner2,
    images.banner3,
    images.banner4,
  ];

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  const handleFavorite = () => {
    Alert.alert('Đã thêm vào danh sách yêu thích ');
  };

  const random = Math.floor(Math.random() * 5) + 1;
  const randomArr = Array.from({ length: random }, (_, i) => i);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tour Khám Phá Hội An</Text>
        <TouchableOpacity style={styles.favorite} onPress={handleFavorite}>
          <Icon
            name="favorite"
            size={20}
            color="#ff4d4d"
            style={styles.favoriteIcon}
          />
          <Text style={styles.favoriteText}>Yêu thích</Text>
        </TouchableOpacity>
      </View>

      {/* Hình ảnh chính */}
      <View style={styles.imageSection}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {tourImages.map((img, index) => (
            <Image key={index} source={img} style={styles.imageTour} />
          ))}
        </ScrollView>

        {/* Dots */}
        <View style={styles.dotContainer}>
          {tourImages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      {/*  Mô tả & giá */}
      <View style={styles.section}>
        <ExpandableText
          text="Trải nghiệm văn hóa và ẩm thực Hội An — di sản thế giới nổi tiếng với vẻ đẹp cổ kính, đèn lồng rực rỡ và con người hiếu khách."
          limit={100}
        />

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            Giá từ: <Text style={styles.priceHighlight}>₫1.000.000</Text> /khách
          </Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => setShowSelectModal(true)}
          >
            <Text style={styles.bookButtonText}>Chọn ngày</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hoạt động nổi bật */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Những hoạt động nổi bật</Text>
        <TouchableOpacity onPress={() => setShowActiveModal(true)}>
          {[1, 2].map(i => (
            <ActiveCard
              key={i}
              title="Làng chày cổ"
              description="Tận hưởng không khí mặn mòi và nhịp sống lao động chân thực của người dân địa phương"
              image={images.banner3}
            />
          ))}
        </TouchableOpacity>
        <CustomButton
          title="Hiển thị tất cả hoạt động"
          onPress={() => setShowActiveModal(true)}
          style={styles.buttonActive}
        />
      </View>

      {/* Thông tin Host */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin Host</Text>
        <TouchableOpacity
          style={styles.hostContainer}
          onPress={() => navigation.navigate('provider')}
        >
          <Image source={images.banner4} style={styles.hostAvatar} />
          <View style={{ flex: 1, flexShrink: 1 }}>
            <Text style={styles.hostName}>Nguyễn Minh An</Text>
            <Text style={styles.hostDesc}>
              Hướng dẫn viên địa phương với hơn 5 năm kinh nghiệm.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/*  Đánh giá */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đánh giá</Text>

        <View style={styles.ratingSummary}>
          <Text style={styles.ratingValue}>5.0</Text>
          <Icon name="star" size={20} color="#FFD700" style={styles.starIcon} />
          <Text style={styles.ratingCount}>(1.001 đánh giá)</Text>
        </View>

        <View style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Image source={images.banner1} style={styles.reviewAvatar} />
            <Text style={styles.reviewerName}>Trần Hải Nam</Text>
          </View>

          <View style={styles.reviewMeta}>
            <View style={{ flexDirection: 'row' }}>
              {randomArr.map(i => (
                <Icon key={i} name="star" size={18} color="#FFD700" />
              ))}
            </View>
            <Text style={styles.reviewTime}>2 ngày trước</Text>
          </View>
          <Text style={styles.reviewText}>
            Trải nghiệm tuyệt vời, hướng dẫn viên thân thiện, cảnh đẹp và đồ ăn
            ngon. Rất đáng để thử!
          </Text>

          <TouchableOpacity>
            <Text style={styles.moreText}>Hiển thị thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SelectDateModal
        visible={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        title="Chọn thời gian"
      />
      <ActiveModal
        visible={showActiveModal}
        onClose={() => {
          setShowActiveModal(false);
        }}
      />
    </ScrollView>
  );
};

export default TourDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteIcon: {
    marginRight: 4,
  },
  favoriteText: {
    color: '#ff4d4f',
    fontWeight: '600',
  },

  imageSection: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  imageTour: {
    width: width - 20,
    height: 250,
    borderRadius: 12,
    marginRight: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#ff4d4f',
  },

  section: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  priceHighlight: {
    color: '#e63946',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },

  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  hostDesc: {
    color: '#666',
    flexWrap: 'wrap',
  },

  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  starIcon: {
    marginHorizontal: 5,
  },
  ratingCount: {
    color: '#666',
  },

  reviewItem: {
    marginTop: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerName: {
    fontWeight: '600',
    fontSize: 14,
  },
  reviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  reviewTime: {
    color: '#999',
  },
  reviewText: {
    marginTop: 6,
    color: '#444',
    lineHeight: 20,
  },
  moreText: {
    color: '#007bff',
    marginTop: 4,
    fontWeight: '500',
  },
  buttonActive: {
    backgroundColor: '#ccc',
  },
});
