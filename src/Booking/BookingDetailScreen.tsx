import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../images';
import ActiveCard from '../Home/ActiveCard';
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { BookingDetail } from '../../types/booking';
import { getBookingById } from '../api/experiences/booking';
import ErrorView from '../components/ErrorView';
import LoadingView from '../components/LoadingView';
import {
  formatDuration,
  getExperiencesById,
} from '../api/experiences/experiences';
import { Experience } from '../../types/experience';
import { HostDetail } from '../../types/host';
import ActiveModal from '../Home/modals/Active.modal';
import Notification from '../components/Notification';
import { formatDate, formatTimeWithoutSeconds } from '../components/FormatDate';

const BookingDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'bookingDetail'> = useRoute();
  const bookingId = route.params.bookingId;
  const [status, setStatus] = useState<
    'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  >('Completed');
  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(
    null,
  );
  const [tour, setTour] = useState<Experience | null>(null);
  const [host, setHost] = useState<HostDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorType, setErrorType] = useState<
    'NOT_LOGGED_IN' | 'FETCH_FAILED' | null
  >(null);
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const limitedItineraries = (tour?.itineraries || []).sort(
    (a, b) => a.stepNumber - b.stepNumber,
  );
  useEffect(() => {
    loadBookingDetail();
  }, []);
  const loadBookingDetail = async () => {
    setLoading(true);
    const res = await getBookingById(bookingId);
    if (!res.bookingDetail && res.errorType) {
      setErrorType(res.errorType);
      setErrorMsg(res.message);
    } else {
      setBookingDetail(res.bookingDetail);
      setStatus(res.bookingDetail ? res.bookingDetail.status : 'Completed');
      if (!res.bookingDetail?.experienceId) {
        setErrorType('FETCH_FAILED');
        setErrorMsg('ExperienceId invalid');
        setLoading(false);
        return;
      }
      const resExp = await getExperiencesById(res.bookingDetail.experienceId);
      console.log('call api thành công ');
      if (resExp.message) {
        console.log('Tải thất bại');
        setErrorMsg(res.message);
        setErrorType('FETCH_FAILED');
      }
      console.log('Tải thành công');
      setTour(resExp.experience);
      setHost(resExp.host);
    }
    setLoading(false);
  };
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'bookingTab',
      params: { screen: 'bookingDetail', booking: bookingId },
    });
  };
  const handleReview = () => {
    if (!bookingDetail || !tour) {
      setShowNotification('Booking or experience invalid');
      return;
    }
    navigation.navigate('reviewScreen', {
      experienceId: bookingDetail?.experienceId,
      image: tour?.media[0].url,
      title: tour?.title,
      date: bookingDetail?.date,
    });
  };
  const handleRebookThisExperience = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'homeTab',
            state: {
              routes: [
                { name: 'home' },
                {
                  name: 'tourDetail',
                  params: { id: bookingDetail?.experienceId },
                },
              ],
              index: 1,
            },
          },
        ],
      }),
    );
  };
  if (loading) {
    return <LoadingView message="Đang tải dữ liệu ..." />;
  }
  if (!bookingDetail) {
    if (errorType === 'FETCH_FAILED') {
      return (
        <ErrorView
          message={errorMsg}
          onPress={loadBookingDetail}
          textButton="Reload page"
        />
      );
    }
    if (errorType === 'NOT_LOGGED_IN') {
      return (
        <ErrorView
          message={errorMsg}
          onPress={handleLogin}
          textButton="Login"
        />
      );
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* ================= USER INFORMATION ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="person" size={20} color="#8E24AA" />
            <Text style={styles.sectionTitle}>User Information</Text>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>J</Text>
            </View>
            <View>
              <Text style={styles.userName}>
                {bookingDetail?.firstName} {bookingDetail?.lastName}
              </Text>
              <Text style={styles.userRole}>Traveler</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <MaterialIcons name="email" size={20} color="#666" />
            <Text style={styles.infoText}>{bookingDetail?.contactEmail}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="phone" size={20} color="#666" />
            <Text style={styles.infoText}>{bookingDetail?.contactPhone}</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialIcons name="verified" size={20} color="#4CAF50" />
            <Text style={styles.verifiedText}>Verified Account</Text>
            <MaterialIcons
              name="check-circle"
              size={18}
              color="#4CAF50"
              style={{ marginLeft: 6 }}
            />
          </View>
        </View>

        {/* ================= PAYMENT SUMMARY ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="receipt-long" size={20} color="#1976D2" />
            <Text style={styles.sectionTitle}>Payment Summary</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Experience cost</Text>
            <Text style={styles.priceValue}>
              {bookingDetail?.totalPrice.toLocaleString('VN')}₫
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Platform fee</Text>
            <Text style={styles.priceValue}>0₫</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount</Text>
            <Text style={styles.priceValue}>0₫</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalAmount}>
              {bookingDetail?.totalPrice.toLocaleString('VN')}₫
            </Text>
          </View>

          {/* Extra actions */}
          <View style={styles.extraActions}>
            <TouchableOpacity style={styles.smallBtn}>
              <MaterialIcons name="print" size={18} color="#E91E63" />
              <Text style={styles.smallBtnText}>Print Invoice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn}>
              <MaterialIcons name="share" size={18} color="#1E88E5" />
              <Text style={[styles.smallBtnText, { color: '#1E88E5' }]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= EXPERIENCE CARD (như mockup) ================= */}
        <View style={styles.experienceBigCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="explore" size={20} color="#E91E63" />
            <Text style={styles.sectionTitle}>Experience Information</Text>
          </View>

          <Image
            source={tour?.media ? { uri: tour?.media[0].url } : images.banner1}
            style={styles.expBigImage}
            resizeMode="cover"
          />

          <View style={styles.locationRow}>
            <MaterialIcons name="place" size={18} color="#E91E63" />
            <Text style={styles.locationText}>
              {tour?.address}, {tour?.distance}, {tour?.city}, {tour?.country}
            </Text>
          </View>

          <Text style={styles.expBigTitle}>{tour?.title}</Text>
          <Text style={styles.expBigDesc}>{tour?.description}</Text>

          <View style={styles.tagsRow}>
            <View style={styles.ratingTag}>
              <MaterialIcons name="star" size={16} color="#FFB300" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {formatDuration(tour?.duration ? tour.duration : 0)}
              </Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.tagText, { color: '#4CAF50' }]}>
                {tour?.category.name}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= BOOKING DETAILS ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="calendar-today" size={20} color="#7B1FA2" />
            <Text style={styles.sectionTitle}>Booking Details</Text>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <MaterialIcons name="event" size={18} color="#666" />
              <Text style={styles.gridLabel}>Booking Date</Text>
              <Text style={styles.gridValue}>
                {formatDate(bookingDetail?.date ? bookingDetail.date : '')}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialIcons name="access-time" size={18} color="#666" />
              <Text style={styles.gridLabel}>Time</Text>
              <Text style={styles.gridValue}>
                {formatTimeWithoutSeconds(
                  bookingDetail?.startTime ? bookingDetail.startTime : '',
                )}
                -
                {formatTimeWithoutSeconds(
                  bookingDetail?.endTime ? bookingDetail.endTime : '',
                )}
              </Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <MaterialIcons name="group" size={18} color="#666" />
              <Text style={styles.gridLabel}>Number of Guests</Text>
              <Text style={styles.gridValue}>
                {bookingDetail?.adults} Adult{' '}
                {bookingDetail?.adults
                  ? `-${bookingDetail.children} Children`
                  : undefined}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialIcons name="payments" size={18} color="#4CAF50" />
              <Text style={styles.gridLabel}>Payment Status</Text>
              <Text style={styles.paidText}>
                {bookingDetail?.payment?.status}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= WHAT YOU'LL DO ================= */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What you'll do</Text>

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
        </View>

        {/* ================= ACTION BUTTONS – GIỮ NGUYÊN THEO STATUS ================= */}
        <View style={styles.actionSection}>
          {/* CONFIRMED → Liên hệ hướng dẫn viên */}
          {status === 'Confirmed' && (
            <TouchableOpacity style={styles.primaryBtnV2} activeOpacity={0.8}>
              <MaterialIcons name="phone-enabled" size={24} color="#FFFFFF" />
              <Text style={styles.primaryBtnTextV2}>Contact Guide</Text>
            </TouchableOpacity>
          )}
          {/* PENDING → Hủy booking */}
          {(status === 'Confirmed' || status === 'Pending') && (
            <TouchableOpacity
              style={styles.cancelBtnV2}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('cancelBooking', { bookingId });
              }}
            >
              <MaterialIcons name="cancel" size={24} color="#FFFFFF" />
              <Text style={styles.cancelBtnTextV2}>Cancel Booking</Text>
            </TouchableOpacity>
          )}
          {/* COMPLETED → Viết đánh giá */}
          {status === 'Completed' && (
            <TouchableOpacity
              style={[styles.primaryBtnV2, { backgroundColor: '#FFB300' }]}
              activeOpacity={0.8}
              onPress={() => {
                handleReview();
              }}
            >
              <MaterialIcons name="star-rate" size={26} color="#FFFFFF" />
              <Text style={styles.primaryBtnTextV2}>Write a Review</Text>
            </TouchableOpacity>
          )}

          {/* CANCELLED → Đặt lại tour */}
          {status === 'Cancelled' && (
            <TouchableOpacity
              style={styles.rebookBtnV2}
              activeOpacity={0.8}
              onPress={() => handleRebookThisExperience()}
            >
              <MaterialIcons name="refresh" size={24} color="#1E88E5" />
              <Text style={styles.rebookBtnTextV2}>Rebook This Tour</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <ActiveModal
        visible={showActiveModal}
        onClose={() => {
          setShowActiveModal(false);
        }}
        itineraries={limitedItineraries}
      />
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type="error"
          autoClose
          position="top"
          duration={3000}
        />
      )}
    </View>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },

  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },

  experienceBigCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 6,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },

  // User Info
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  userName: { fontSize: 18, fontWeight: '700' },
  userRole: { fontSize: 14, color: '#777', marginTop: 2 },

  infoItem: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  infoText: { marginLeft: 12, fontSize: 15, color: '#555' },
  verifiedText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // Payment
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: { color: '#666', fontSize: 15 },
  priceValue: { fontWeight: '600', fontSize: 15 },

  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: 17, fontWeight: '700' },
  totalAmount: { fontSize: 22, fontWeight: '800', color: '#E91E63' },

  extraActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  smallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  smallBtnText: { marginLeft: 6, fontWeight: '600', fontSize: 14 },

  // Experience Big Card
  expBigImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 14,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  locationText: { marginLeft: 6, color: '#E91E63', fontWeight: '600' },
  expBigTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
  },
  expBigDesc: { color: '#555', lineHeight: 20, marginBottom: 14 },
  tagsRow: { flexDirection: 'row', alignItems: 'center' },
  ratingTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  ratingText: { marginLeft: 4, fontWeight: '700', color: '#FFB300' },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  tagText: { color: '#1976D2', fontWeight: '600', fontSize: 13 },

  // Booking Details Grid
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: { flex: 1, marginRight: 16 },
  gridItemLast: { marginRight: 0 },
  gridLabel: { fontSize: 13, color: '#777', marginTop: 4, marginBottom: 2 },
  gridValue: { fontWeight: '600', fontSize: 15 },
  paidText: { color: '#4CAF50', fontWeight: '700', fontSize: 15 },

  // Action Buttons – giữ nguyên logic
  actionSection: { paddingHorizontal: 16, marginTop: 20 },

  primaryFullBtn: {
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#1E88E5',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  primaryFullText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
  },

  cancelFullBtn: {
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  cancelFullText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
  },

  rebookFullBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1E88E5',
    backgroundColor: '#fff',
  },
  rebookFullText: {
    color: '#1E88E5',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
  },

  // Nút chính (xanh dương) - Confirmed & Completed
  primaryBtnV2: {
    flexDirection: 'row',
    backgroundColor: '#1E88E5',
    paddingVertical: 18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#1E88E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  primaryBtnTextV2: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },

  // Nút hủy (đỏ) - Pending
  cancelBtnV2: {
    flexDirection: 'row',
    backgroundColor: '#E53935',
    paddingVertical: 18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 10,
  },
  cancelBtnTextV2: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },

  // Nút đặt lại (viền xanh) - Cancelled
  rebookBtnV2: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: '#1E88E5',
    paddingVertical: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E88E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 8,
  },
  rebookBtnTextV2: {
    color: '#1E88E5',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },
});
