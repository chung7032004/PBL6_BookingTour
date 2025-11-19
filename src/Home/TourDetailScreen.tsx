import React, { useEffect, useState } from 'react';
import {
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
import SelectDateModal from './modals/SelectDate.modal';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ActiveModal from './modals/Active.modal';
import ActiveCard from './ActiveCard';
import CustomButton from '../components/CustomButton';
// import { getTourDetail, TourDetail } from '../api/fakeTours';
import { RootStackParamList } from '../../types/route';
import Notification from '../components/Notification';
import ReviewModal from './modals/Review.modal';
import ReviewCard from './ReviewCard';
import LoadingView from '../components/LoadingView';
import { Experience } from '../../types/experience';
import ErrorView from '../components/ErrorView';
import { getExperiencesById } from '../api/experiences/experiences';

const { width } = Dimensions.get('window');

const TourDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'tourDetail'> = useRoute();
  const { id } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);

  // const [tour, setTour] = useState<TourDetail | null>(null);
  const [tour, setTour] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [wishList, setWishList] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const reviews = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Người dùng ${i + 1}`,
    avatar: images.account,
    rating: Math.floor(Math.random() * 2) + 4,
    time: `${i + 1} ngày trước`,
    content:
      'Trải nghiệm tuyệt vời, hướng dẫn viên thân thiện, cảnh đẹp và đồ ăn ngon. Rất đáng để thử!',
  }));
  const [quantityReview] = useState<number>(164);
  const [showModalReview, setShowModalReview] = useState(false);

  // useEffect(() => {
  // loadData();
  // }, [id]);
  // const loadData = async () => {
  // const data = await getTourDetail(1);
  // setTour(data);
  // setLoading(false);
  // };
  // const tourImages = [
  // images.banner1,
  // images.banner2,
  // images.banner3,
  // images.banner4,
  // ];

  useEffect(() => {
    loadData();
  }, [id]);
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getExperiencesById(id);
      if (res.message) {
        setError(res.message);
        return;
      }
      console.log(res.experience);
      setTour(res.experience);
    } catch (error) {
      setError('Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };
  const tourImages = tour
    ? [
        ...(tour.media?.map(m => m.url) || []),
        ...(tour.itineraries?.map(i => i.photoUrl) || []),
      ]
    : [];
  const limitedItineraries = (tour?.itineraries || []).sort(
    (a, b) => a.stepNumber - b.stepNumber,
  );

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  const handleFavorite = () => {
    setWishList(!wishList);
    const newState = !wishList;
    setShowNotification(
      newState
        ? 'Đã thêm vào danh sách yêu thích'
        : 'Đã xóa khỏi danh sách yêu thích',
    );
  };

  if (loading) {
    return <LoadingView />;
  }
  if (error) {
    return (
      <ErrorView
        message={error}
        onPress={() => {
          setError(null);
          loadData();
        }}
      />
    );
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hình ảnh chính */}
        <View style={styles.imageSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {tourImages.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={styles.imageTour}
              />
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
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {tour?.title}
            </Text>
            <TouchableOpacity style={styles.favorite} onPress={handleFavorite}>
              <Icon
                name={wishList ? 'favorite' : 'favorite-border'}
                size={22}
                color={wishList ? '#ff4d4d' : '#666'}
                style={styles.favoriteIcon}
              />
              <Text
                style={[
                  styles.favoriteText,
                  !wishList && styles.unfavoriteText,
                ]}
              >
                Yêu thích
              </Text>
            </TouchableOpacity>
          </View>
          <ExpandableText text={tour?.description} limit={100} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Địa chỉ: </Text>
            <Text style={styles.detailValue}>
              {tour?.address}, {tour?.distance}, {tour?.city}, {tour?.country}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration: </Text>
            <Text style={styles.detailValue}>{tour?.duration}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Max Participants: </Text>
            <Text style={styles.detailValue}>{tour?.maxParticipants}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Activity Lever: </Text>
            <Text style={styles.detailValue}>{tour?.activityLevel}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Skill Lever: </Text>
            <Text style={styles.detailValue}>{tour?.skillLevel}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Max Participants: </Text>
            <Text style={styles.detailValue}>{tour?.maxParticipants}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cancellation Policy: </Text>
            <Text style={styles.detailValue}>{tour?.cancellationPolicy}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Language: </Text>
            <Text style={styles.detailValue}>{tour?.language}</Text>
          </View>
        </View>

        {/* Hoạt động nổi bật */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Những hoạt động nổi bật</Text>
          <TouchableOpacity onPress={() => setShowActiveModal(true)}>
            {limitedItineraries.slice(0, 3).map(iti => (
              <ActiveCard
                key={iti.id}
                stepNumber={iti.stepNumber}
                title={iti.title}
                description={iti.description}
                image={iti.photoUrl}
              />
            ))}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowActiveModal(true)}>
            <Text style={styles.moreText}>Xem tất cả hoạt động</Text>
          </TouchableOpacity>
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

        {/*  Đánh giá 
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đánh giá</Text>

          <View style={styles.ratingSummary}>
            <Text style={styles.ratingValue}>{tour?.rating}</Text>
            <Icon
              name="star"
              size={20}
              color="#FFD700"
              style={styles.starIcon}
            />
            <Text style={styles.ratingCount}>({quantityReview} đánh giá)</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewRow}
          >
            {reviews.slice(0, 4).map(item => (
              <ReviewCard key={item.id} {...item} />
            ))}
          </ScrollView>

          <TouchableOpacity onPress={() => setShowModalReview(true)}>
            <Text style={styles.moreText}>Hiển thị thêm</Text>
          </TouchableOpacity>
        </View>
        */}
        <View style={{ height: 80 }}></View>
      </ScrollView>

      {/* footer */}
      <View style={styles.stickyFooter}>
        <View style={styles.priceRowFooter}>
          <Text style={styles.priceTextFooter}>
            Giá từ:
            <Text style={styles.priceHighlightFooter}>
              {' '}
              {/* {tour?.price.toLocaleString('vi-VN')}₫ */}
              {tour?.adultPrice.toLocaleString('vi-VN')}₫
            </Text>
          </Text>
          <CustomButton
            title="Chọn ngày"
            onPress={() => setShowSelectModal(true)}
            style={styles.footerButton}
            textStyle={styles.footerButtonText}
          />
        </View>
      </View>

      <SelectDateModal
        visible={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        title="Chọn thời gian"
        navigation={navigation}
        tourInfo={{
          name: tour?.title || 'Tour',
          image: images.banner1,
        }}
      />
      <ActiveModal
        visible={showActiveModal}
        onClose={() => {
          setShowActiveModal(false);
        }}
        itineraries={limitedItineraries}
      />
      <ReviewModal
        reviews={reviews}
        onClose={() => setShowModalReview(false)}
        quantityReview={quantityReview}
        visible={showModalReview}
      />
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type="success"
          autoClose
          position="top"
          duration={3000}
        />
      )}
    </View>
  );
};

export default TourDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFEBEC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    width: '75%',
  },
  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
  },
  favoriteIcon: {
    marginRight: 4,
  },
  favoriteText: {
    color: '#ff4d4f',
    fontWeight: '600',
  },
  unfavoriteText: {
    color: '#666',
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#444',
    marginRight: 4,
  },
  detailValue: {
    color: '#666',
    flexShrink: 1,
  },
  imageSection: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 12,
  },
  imageTour: {
    width: width - 20,
    height: 250,
    borderRadius: 12,
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
  reviewRow: {
    paddingLeft: 5,
    paddingBottom: 10,
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
  moreText: {
    color: '#007bff',
    marginTop: 4,
    fontWeight: '500',
  },
  // Style cho Footer cố định (Sticky Footer)
  stickyFooter: {
    position: 'absolute', // KEY: Định vị tuyệt đối
    bottom: 0, // KEY: Dính vào đáy
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15, // Padding bên trong footer
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10, // Shadow cho Android
    zIndex: 10, // Đảm bảo nó luôn nằm trên cùng
  },
  priceRowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTextFooter: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  priceHighlightFooter: {
    color: '#e63946',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerButton: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 150,
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
