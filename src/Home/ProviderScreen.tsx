import React, { useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import images from '../../images';
import ReviewCard from './ReviewCard';
import CustomButton from '../components/CustomButton';
import ReviewModal from './modals/Review.modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { tourDetails } from '../api/fakeTours';

const ProviderScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'provider'> = useRoute();
  const hostDetail = route?.params.hostDetail;
  const years = hostDetail?.hostingSince
    ? new Date().getFullYear() - new Date(hostDetail.hostingSince).getFullYear()
    : 0;

  const suggestData = [
    {
      id: 1,
      image: images.banner1,
      title: 'Street Food Motorbike Tour',
      rating: 4.98,
      price: '₫730,000',
      popular: true,
    },
    {
      id: 2,
      image: images.banner2,
      title: 'Hue City Tour',
      rating: 4.91,
      price: '₫650,000',
    },
    {
      id: 3,
      image: images.banner3,
      title: 'Ha Long Bay Cruise',
      rating: 5.0,
      price: '₫1,000,000',
    },
  ];

  // Fake 10 reviews
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

  return (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: hostDetail?.avatarUrl }}
            style={styles.avatar}
          />
          <Text style={styles.hostName}>{hostDetail?.fullName}</Text>
          <Text style={styles.hostRole}>{hostDetail?.country}</Text>
        </View>

        {/* Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{hostDetail?.totalReviews}</Text>
            <Text style={styles.infoLabel}>Đánh giá</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.infoValue}>
                {hostDetail?.ratingAvg ?? 'Chưa có'}
              </Text>
              <Icon
                name="star"
                size={20}
                color="#FFD700"
                style={styles.starIcon}
              />
            </View>
            <Text style={styles.infoLabel}>Xếp hạng</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{years}</Text>
            <Text style={styles.infoLabel}>năm kinh nghiệm</Text>
          </View>
        </View>
        {/* Extra Stats */}
        <View style={styles.extraStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {hostDetail?.totalBookings ?? 0}
            </Text>
            <Text style={styles.statLabel}>Booking</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{hostDetail?.totalExperiences}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {hostDetail?.responseTime ?? 'Không rõ'}
            </Text>
            <Text style={styles.statLabel}>Thời gian trả lời</Text>
          </View>
        </View>
      </View>
      {/* Introduction */}
      <Text style={styles.introText}>{hostDetail?.bio}</Text>

      <View style={styles.aboutCard}>
        {/* Badge xác minh */}
        {hostDetail?.isVerified && (
          <View style={styles.verifiedRow}>
            <Icon name="verified" size={22} color="#4CAF50" />
            <Text style={styles.verifiedText}>Đã xác minh danh tính</Text>
          </View>
        )}

        {/* Ngôn ngữ */}
        {hostDetail?.spokenLanguages &&
          hostDetail.spokenLanguages.length > 0 && (
            <View style={styles.infoRowNew}>
              <Icon name="language" size={20} color="#666" />
              <Text style={styles.infoText}>
                {hostDetail.spokenLanguages.filter(Boolean).join(' • ') ||
                  'Tiếng Việt'}
              </Text>
            </View>
          )}

        {/* Địa điểm */}
        {hostDetail?.location && (
          <View style={styles.infoRowNew}>
            <Icon name="location-on" size={20} color="#666" />
            <Text style={styles.infoText}>{hostDetail.location}</Text>
          </View>
        )}

        {/* Nghề nghiệp */}
        {hostDetail?.work && (
          <View style={styles.infoRowNew}>
            <Icon name="work" size={20} color="#666" />
            <Text style={styles.infoText}>{hostDetail.work}</Text>
          </View>
        )}

        {/* Học vấn */}
        {hostDetail?.education && (
          <View style={styles.infoRowNew}>
            <Icon name="school" size={20} color="#666" />
            <Text style={styles.infoText}>{hostDetail.education}</Text>
          </View>
        )}

        {/* Fun fact */}
        {hostDetail?.funFact && (
          <View style={styles.infoRowNew}>
            <Icon name="emoji-emotions" size={20} color="#666" />
            <Text style={styles.infoText}>{hostDetail.funFact}</Text>
          </View>
        )}

        {/* Sở thích */}
        {hostDetail?.topicsOfInterest &&
          hostDetail.topicsOfInterest.length > 0 && (
            <View style={styles.infoRowNew}>
              <Icon name="favorite" size={20} color="#666" />
              <Text style={styles.infoText}>
                {hostDetail.topicsOfInterest.join(' • ')}
              </Text>
            </View>
          )}

        {/* Phong cách tiếp đón */}
        {hostDetail?.desiredHostingStyle && (
          <View style={styles.infoRowNew}>
            <Icon name="people" size={20} color="#666" />
            <Text style={styles.infoText}>
              <Text style={{ fontWeight: '600' }}>Phong cách: </Text>
              {hostDetail.desiredHostingStyle}
            </Text>
          </View>
        )}

        {/* Mạng xã hội */}
        {(hostDetail?.facebookUrl ||
          hostDetail?.instagramUrl ||
          hostDetail?.linkedInUrl) && (
          <View style={styles.socialContainer}>
            <Text style={styles.socialLabel}>Kết nối với tôi</Text>
            <View style={styles.socialIcons}>
              {hostDetail.facebookUrl && (
                <Icon
                  name="facebook"
                  size={32}
                  color="#1877F2"
                  onPress={() => Linking.openURL(hostDetail.facebookUrl!)}
                  style={styles.socialIcon}
                />
              )}
              {hostDetail.instagramUrl && (
                <Icon
                  name="instagram"
                  size={32}
                  color="#E4405F"
                  onPress={() => Linking.openURL(hostDetail.instagramUrl!)}
                  style={styles.socialIcon}
                />
              )}
              {hostDetail.linkedInUrl && (
                <Icon
                  name="linkedin"
                  size={32}
                  color="#0A66C2"
                  onPress={() => Linking.openURL(hostDetail.linkedInUrl!)}
                  style={styles.socialIcon}
                />
              )}
            </View>
          </View>
        )}
      </View>

      {/* Reviews Section */}
      <Text style={styles.sectionTitle}>Đánh giá của khách</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewRow}
      >
        {reviews.slice(0, 4).map(item => (
          <ReviewCard key={item.id} {...item} />
        ))}
      </ScrollView>
      <CustomButton
        title="Hiển thị thêm đánh giá "
        style={styles.button}
        textStyle={{ fontSize: 16 }}
        onPress={() => setShowModalReview(true)}
      />

      {/* Tours Section 
      <Text style={styles.sectionTitle}>Trải nghiệm của Trần Hải Nam</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
         {suggestData.map(tour => ( 
           <TourCard key={tour.id} {...tour} />
         ))}
        
      </ScrollView>
        */}
      <ReviewModal
        reviews={reviews}
        onClose={() => setShowModalReview(false)}
        quantityReview={quantityReview}
        visible={showModalReview}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },

  /** Profile Card **/
  profileContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingBottom: 12,
  },

  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  hostRole: {
    color: '#888',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoLabel: {
    color: '#666',
    marginTop: 4,
  },
  starIcon: {
    marginLeft: 4,
  },
  introText: {
    marginHorizontal: 16,
    marginTop: 8,
    color: '#444',
    lineHeight: 20,
    fontSize: 15,
  },

  /** Section styles **/
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  reviewRow: {
    paddingLeft: 16,
    paddingBottom: 25,
  },
  cardRow: {
    paddingHorizontal: 10,
    paddingBottom: 25,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  extraStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 15, fontWeight: '600' },
  statLabel: { fontSize: 13, color: '#666', marginTop: 3 },
  aboutCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  verifiedText: {
    marginLeft: 6,
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 14,
  },

  infoRowNew: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },

  socialContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  socialLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialIcon: {
    padding: 4,
  },
});

export default ProviderScreen;
