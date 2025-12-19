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
import { RootStackParamList } from '../../types/route';
import Notification from '../components/Notification';
import ReviewModal from './modals/Review.modal';
import ReviewCard from './ReviewCard';
import LoadingView from '../components/LoadingView';
import { Experience } from '../../types/experience';
import ErrorView from '../components/ErrorView';
import {
  formatDuration,
  getExperiencesById,
  getReviews,
} from '../api/experiences/experiences';
import WishListModal from './modals/wishList.modal';
import { HostDetail, HostInTour } from '../../types/host';
import { checkLoginAndRole } from '../api/auth/login';
import { addExpToWishList } from '../api/experiences/wishlist';
import { Review } from '../../types/booking';

const { width } = Dimensions.get('window');

const TourDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'tourDetail'> = useRoute();
  const { id } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);

  const [tour, setTour] = useState<Experience | null>(null);
  const [host, setHost] = useState<HostDetail | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [wishList, setWishList] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [showModalReview, setShowModalReview] = useState(false);
  const [showModalWistList, setShowModalWishList] = useState(false);
  const [typeNotification, setTypeNotification] = useState<'success' | 'error'>(
    'success',
  );

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
      setTour(res.experience);
      setHost(res.host);
      if (res.experience === null) {
        setError('Failed to load experience');
        return;
      }
      const resReview = await getReviews(res.experience?.id);
      if (!resReview.reviewResponse) {
        setError(resReview.message);
        return;
      }
      setReviews(resReview.reviewResponse.data);
      console.log('review', reviews);
    } catch (error) {
      setError('Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  const tourImages = tour
    ? [
        ...(tour.media?.map(m => m.url).filter(Boolean) || []),
        ...(tour.itineraries?.map(i => i.photoUrl).filter(Boolean) || []),
      ]
    : [];
  const limitedItineraries = (tour?.itineraries || []).sort(
    (a, b) => a.stepNumber - b.stepNumber,
  );

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  const checkLogin = async () => {
    const { isLoggedIn, isUserRole } = await checkLoginAndRole();
    if (!isLoggedIn || !isUserRole) {
      navigation.navigate('login', {
        redirect: 'homeTab',
        params: { screen: 'tourDetail', params: { id: tour?.id } },
        message: 'Please log in to use this feature',
      });
      return false;
    }
    return true;
  };
  const handleAddEpxToWishList = async (wishListId: string) => {
    if (tour?.id === undefined) {
      setTypeNotification('error');
      setShowNotification('Experience is undefined');
      return;
    }
    const res = await addExpToWishList(wishListId, tour.id);
    if (res?.isSuccess) {
      setTypeNotification('success');
    } else {
      setTypeNotification('error');
    }
    setShowNotification(res?.message);
  };
  const handleFavorite = async () => {
    // setWishList(!wishList);
    // const newState = !wishList;
    // setShowNotification(
    // newState
    // ? 'Đã thêm vào danh sách yêu thích'
    // : 'Đã xóa khỏi danh sách yêu thích',
    // );

    const allow = await checkLogin();
    if (!allow) return;
    setShowModalWishList(true);
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
            <Text style={styles.title} numberOfLines={3}>
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
                Favorite
              </Text>
            </TouchableOpacity>
          </View>
          <ExpandableText text={tour?.description} limit={100} />
          <View style={styles.headerInfo}>
            <Text style={styles.textHeader}>Trip Information</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address: </Text>
            <Text style={styles.detailValue}>
              {tour?.address}, {tour?.distance}
              {tour?.country}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration: </Text>
            <Text style={styles.detailValue}>
              {tour?.duration ? formatDuration(tour.duration) : 'Not specified'}
            </Text>
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
          <Text style={styles.sectionTitle}>What you’ll do</Text>
          <TouchableOpacity onPress={() => setShowActiveModal(true)}>
            {limitedItineraries.slice(0, 3).map((iti, index) => (
              <ActiveCard
                key={iti.id}
                stepNumber={index + 1}
                title={iti.title}
                description={iti.description}
                image={iti.photoUrl}
              />
            ))}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowActiveModal(true)}>
            <Text style={styles.moreText}>View all activities</Text>
          </TouchableOpacity>
        </View>

        {/* Thông tin Host */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Host Information</Text>
          <TouchableOpacity
            style={styles.hostContainer}
            onPress={() =>
              navigation.navigate('provider', {
                hostDetail: host,
              })
            }
          >
            <Image
              source={
                host?.avatarUrl ? { uri: host.avatarUrl } : images.banner4
              }
              style={styles.hostAvatar}
            />
            <View style={{ flex: 1, flexShrink: 1 }}>
              <Text style={styles.hostName}>{host?.fullName}</Text>
              <Text numberOfLines={3} style={styles.hostDesc}>
                {host?.bio}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Đánh giá  */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review</Text>

          <View style={styles.ratingSummary}>
            <Text style={styles.ratingValue}>
              {tour?.averageRating.toFixed(1)}
            </Text>
            <Icon
              name="star"
              size={20}
              color="#FFD700"
              style={styles.starIcon}
            />
            <Text style={styles.ratingCount}>
              ({tour?.totalReviews} reviews)
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewRow}
          >
            {reviews &&
              reviews
                .slice(0, 4)
                .map(item => <ReviewCard key={item.id} {...item} />)}
          </ScrollView>
          {reviews?.length ? (
            <TouchableOpacity onPress={() => setShowModalReview(true)}>
              <Text style={styles.moreText}>Show more</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <View style={{ height: 80 }}></View>
      </ScrollView>

      {/* footer */}
      <View style={styles.stickyFooter}>
        <View style={styles.priceRowFooter}>
          <Text style={styles.priceTextFooter}>
            From:
            <Text style={styles.priceHighlightFooter}>
              {' '}
              {tour?.adultPrice.toLocaleString('vi-VN')} VND
            </Text>
          </Text>
          <CustomButton
            title="Select date"
            onPress={() => setShowSelectModal(true)}
            style={styles.footerButton}
            textStyle={styles.footerButtonText}
          />
        </View>
      </View>

      <SelectDateModal
        visible={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        title="Select date"
        navigation={navigation}
        tourInfo={{
          name: tour?.title || 'Tour',
          image: tour?.media[0].url || '',
        }}
        adultPrice={tour?.adultPrice ? tour.adultPrice : 0}
        childPrice={tour?.childPrice ? tour.childPrice : 0}
        experienceId={tour?.id ? tour.id : ''}
      />
      <ActiveModal
        visible={showActiveModal}
        onClose={() => {
          setShowActiveModal(false);
        }}
        itineraries={limitedItineraries}
      />
      {reviews && (
        <ReviewModal
          experienceId={tour?.id ? tour.id : ''}
          reviews={reviews}
          onClose={() => setShowModalReview(false)}
          quantityReview={tour?.totalReviews ? tour.totalReviews : 0}
          visible={showModalReview}
        />
      )}

      <WishListModal
        visible={showModalWistList}
        onClose={() => setShowModalWishList(false)}
        onSave={handleAddEpxToWishList}
      />
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type={typeNotification}
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
    backgroundColor: '#f7f7f7',
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
  headerInfo: {
    marginVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  textHeader: {
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 5,
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
