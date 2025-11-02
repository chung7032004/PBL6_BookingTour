import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../images';

// fake data
export interface Tour {
  id: number;
  title: string;
  rating: number;
  price: number;
  image: string;
  popular?: boolean;
}
export interface TourDetail extends Tour {
  description: string;
  itinerary: string[];
  duration: string;
  departure: string;
  availableSlots: number;
  gallery: string[];
}

let tours: Tour[] = [
  {
    id: 1,
    title: 'Street Food Motorbike Tour',
    rating: 4.98,
    price: 730000,
    popular: true,
    image:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Hue City Tour - Imperial Capital',
    rating: 4.91,
    price: 650000,
    image:
      'https://images.unsplash.com/photo-1494475673543-6a6a27143b64?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Ha Long Bay Cruise',
    rating: 5.0,
    price: 1000000,
    popular: true,
    image:
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Hoi An Lantern Town - Night Tour',
    rating: 4.95,
    price: 850000,
    image:
      'https://images.unsplash.com/photo-1559114474-f6a5d7b2de6b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Mekong Delta Boat Tour',
    rating: 4.92,
    price: 700000,
    image:
      'https://images.unsplash.com/photo-1592309907962-552ec7a69970?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Sapa Mountain Trekking',
    rating: 4.97,
    price: 1200000,
    popular: true,
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Da Lat - City of Flowers Tour',
    rating: 4.9,
    price: 600000,
    image:
      'https://images.unsplash.com/photo-1585128792020-8157fcdba36a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Phong Nha Cave Adventure',
    rating: 5.0,
    price: 1400000,
    image:
      'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Da Nang City Tour',
    rating: 4.88,
    price: 550000,
    image:
      'https://images.unsplash.com/photo-1586326385790-1cff834e6e19?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: 'Phu Quoc Island Snorkeling',
    rating: 4.93,
    price: 950000,
    popular: true,
    image:
      'https://images.unsplash.com/photo-1519817914152-22f90e1308e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    title: 'Nha Trang Island Tour',
    rating: 4.9,
    price: 800000,
    image:
      'https://images.unsplash.com/photo-1505731133876-aa653d6b90de?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 12,
    title: 'Cu Chi Tunnel Discovery',
    rating: 4.85,
    price: 500000,
    image:
      'https://images.unsplash.com/photo-1506463019137-933c3e4d1cfa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 13,
    title: 'Ho Chi Minh Night Food Tour',
    rating: 4.99,
    price: 780000,
    popular: true,
    image:
      'https://images.unsplash.com/photo-1555939594-c833c0c63b53?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 14,
    title: 'Con Dao Island Tour',
    rating: 4.9,
    price: 1300000,
    image:
      'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 15,
    title: 'Ban Gioc Waterfall Tour',
    rating: 5.0,
    price: 1600000,
    image:
      'https://images.unsplash.com/photo-1562599932-64fe4ba16859?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 16,
    title: 'Mui Ne Sand Dunes Jeep Tour',
    rating: 4.91,
    price: 620000,
    image:
      'https://images.unsplash.com/photo-1541410965318-4545a0d074a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 17,
    title: 'Saigon City Landmarks Tour',
    rating: 4.87,
    price: 550000,
    image:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 18,
    title: 'Bai Dinh – Trang An Boat Tour',
    rating: 4.95,
    price: 900000,
    image:
      'https://images.unsplash.com/photo-1535743686920-55b58e6e9642?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 19,
    title: 'Fansipan Mountain Railway + Trek',
    rating: 5.0,
    price: 1500000,
    popular: true,
    image:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 20,
    title: 'Cham Islands Diving Tour',
    rating: 4.92,
    price: 980000,
    image:
      'https://images.unsplash.com/photo-1566977775536-afaaa712cb92?auto=format&fit=crop&w=800&q=80',
  },
];

export default tours;

// Lấy toàn bộ tour
export async function getTours(): Promise<Tour[]> {
  return tours;
}

// Lọc top rate
export async function getTopRated(): Promise<Tour[]> {
  return tours.sort((a, b) => b.rating - a.rating).slice(0, 5);
}

// Lọc tour hot (popular)
export async function getHot(): Promise<Tour[]> {
  return tours.filter(t => t.popular);
}

// Giả lập đặt tour
export async function createBooking(
  tourId: number,
  name: string,
  phone: string,
  date: string,
  quantity: number,
) {
  const booking = {
    id: Date.now(),
    tourId,
    name,
    phone,
    date,
    quantity,
  };

  // Lưu local
  let stored = await AsyncStorage.getItem('bookings');
  let list = stored ? JSON.parse(stored) : [];
  list.push(booking);
  await AsyncStorage.setItem('bookings', JSON.stringify(list));

  return booking;
}

//  Lấy danh sách booking
export async function getBookings() {
  const data = await AsyncStorage.getItem('bookings');
  return data ? JSON.parse(data) : [];
}
export const tourDetails: TourDetail[] = [
  {
    ...tours[0],
    description:
      'Khám phá 10 món street food nổi tiếng nhất Sài Gòn bằng xe máy cùng hướng dẫn viên địa phương.',
    duration: '4 giờ (18:00 - 22:00)',
    departure: 'Quận 1, TP.HCM',
    availableSlots: 12,
    itinerary: [
      'Đón khách tại khách sạn',
      'Thưởng thức bánh tráng nướng, phá lấu, bún thịt nướng',
      'Tham quan chợ đêm và khu phố đèn lồng',
      'Kết thúc và đưa khách về tận nơi',
    ],
    gallery: [
      tours[0].image,
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514516345957-b8f70d2f7d39?auto=format&fit=crop&w=800&q=80',
    ],
  },

  {
    ...tours[1],
    description:
      'Tham quan Đại Nội, chùa Thiên Mụ, lăng Khải Định và thưởng thức cơm cung đình Huế.',
    duration: '6 giờ',
    departure: 'Trung tâm thành phố Huế',
    availableSlots: 10,
    itinerary: [
      'Đón khách bằng xe du lịch',
      'Tham quan Đại Nội & Hoàng Thành',
      'Trải nghiệm chè Huế, cơm cung đình',
      'Đi thuyền trên sông Hương',
    ],
    gallery: [
      tours[1].image,
      'https://images.unsplash.com/photo-1556012018-75c6a85f27b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533185932582-e7e9c9b0d1c4?auto=format&fit=crop&w=800&q=80',
    ],
  },

  {
    ...tours[2],
    description:
      'Hành trình du ngoạn vịnh Hạ Long trên du thuyền, tham quan hang Sửng Sốt và chèo kayak.',
    duration: '8 giờ',
    departure: 'Bến cảng Tuần Châu, Quảng Ninh',
    availableSlots: 18,
    itinerary: [
      'Đón khách lên du thuyền',
      'Tham quan hang Sửng Sốt',
      'Chèo kayak tại làng chài',
      'Tiệc buffet trên tàu',
    ],
    gallery: [
      tours[2].image,
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=80',
    ],
  },

  {
    ...tours[3],
    description:
      'Dạo phố cổ Hội An buổi tối, ngắm đèn lồng, thả hoa đăng và thưởng thức món ăn địa phương.',
    duration: '3 giờ',
    departure: 'Phố cổ Hội An',
    availableSlots: 14,
    itinerary: [
      'Đi bộ tham quan phố cổ',
      'Thả đèn hoa đăng trên sông Hoài',
      'Chụp ảnh đèn lồng',
      'Thưởng thức cao lầu, bánh mì Hội An',
    ],
    gallery: [
      tours[3].image,
      'https://images.unsplash.com/photo-1474073705359-5da2d90e8a87?auto=format&fit=crop&w=800&q=80',
    ],
  },

  {
    ...tours[4],
    description:
      'Khám phá đời sống miền Tây sông nước bằng thuyền tại Mỹ Tho – Bến Tre.',
    duration: '7 giờ',
    departure: 'Bến tàu Mỹ Tho',
    availableSlots: 20,
    itinerary: [
      'Đi xuồng ba lá dọc kênh rạch',
      'Tham quan lò kẹo dừa',
      'Ăn trái cây miệt vườn',
      'Đờn ca tài tử',
    ],
    gallery: [
      tours[4].image,
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80',
    ],
  },

  {
    ...tours[5],
    description:
      'Trekking chinh phục đỉnh Fansipan thu nhỏ tại Sapa, băng qua thung lũng Mường Hoa.',
    duration: '2 ngày 1 đêm',
    departure: 'Thị trấn Sapa, Lào Cai',
    availableSlots: 8,
    itinerary: [
      'Leo núi cùng porter bản địa',
      'Cắm trại ngủ trong rừng',
      'Ngắm bình minh trên đỉnh núi',
      'Ăn BBQ ngoài trời',
    ],
    gallery: [
      tours[5].image,
      'https://images.unsplash.com/photo-1508264165352-a5655e3f8881?auto=format&fit=crop&w=800&q=80',
    ],
  },

  {
    ...tours[6],
    description:
      'Tham quan các điểm nổi tiếng Đà Lạt: vườn hoa, hồ Xuân Hương, chợ đêm.',
    duration: '1 ngày',
    departure: 'Trung tâm Đà Lạt',
    availableSlots: 17,
    itinerary: ['Vườn hoa thành phố', 'Đồi chè Cầu Đất', 'Chợ đêm Đà Lạt'],
    gallery: [tours[6].image],
  },

  {
    ...tours[7],
    description: 'Khám phá động Phong Nha bằng thuyền + trekking trong hang.',
    duration: '6 giờ',
    departure: 'Phong Nha – Kẻ Bàng, Quảng Bình',
    availableSlots: 9,
    itinerary: [
      'Đi thuyền sông Son',
      'Khám phá động Phong Nha',
      'Chụp ảnh nhũ đá',
    ],
    gallery: [tours[7].image],
  },

  {
    ...tours[8],
    description:
      'Tham quan biểu tượng Đà Nẵng: cầu Rồng, Ngũ Hành Sơn, bán đảo Sơn Trà.',
    duration: '5 giờ',
    departure: 'Đà Nẵng',
    availableSlots: 16,
    itinerary: ['Cầu Rồng', 'Chùa Linh Ứng', 'Ngũ Hành Sơn'],
    gallery: [tours[8].image],
  },

  {
    ...tours[9],
    description: 'Lặn biển ngắm san hô Phú Quốc, ăn hải sản trên tàu.',
    duration: '6 giờ',
    departure: 'Cảng An Thới – Phú Quốc',
    availableSlots: 13,
    itinerary: ['Lặn snorkeling', 'Tắm biển', 'BBQ hải sản'],
    gallery: [tours[9].image],
  },

  {
    ...tours[10],
    description:
      'Du ngoạn 4 đảo Nha Trang bằng ca nô, tắm biển & lặn ngắm san hô.',
    duration: '1 ngày',
    departure: 'Cảng Cầu Đá – Nha Trang',
    availableSlots: 22,
    itinerary: ['Hòn Mun', 'Hòn Tằm', 'Bãi Tranh'],
    gallery: [tours[10].image],
  },

  {
    ...tours[11],
    description:
      'Khám phá địa đạo Củ Chi – chứng tích lịch sử chiến tranh Việt Nam.',
    duration: '5 giờ',
    departure: 'TP.HCM',
    availableSlots: 30,
    itinerary: ['Chui hầm địa đạo', 'Bắn súng', 'Uống trà bí đao'],
    gallery: [tours[11].image],
  },

  {
    ...tours[12],
    description: 'Food tour Sài Gòn buổi tối với hơn 8 món ăn đường phố.',
    duration: '4 giờ',
    departure: 'TP.HCM',
    availableSlots: 15,
    itinerary: ['Bánh xèo', 'Bún bò', 'Chợ đêm'],
    gallery: [tours[12].image],
  },

  {
    ...tours[13],
    description: 'Tour nghỉ dưỡng và khám phá rừng nguyên sinh Côn Đảo.',
    duration: '2 ngày 1 đêm',
    departure: 'Côn Đảo',
    availableSlots: 10,
    itinerary: ['Cầu tàu 914', 'Bãi Đầm Trầu', 'Nhà tù Côn Đảo'],
    gallery: [tours[13].image],
  },

  {
    ...tours[14],
    description:
      'Ngắm thác Bản Giốc hùng vĩ – một trong những thác đẹp nhất Đông Nam Á.',
    duration: '1 ngày',
    departure: 'Cao Bằng',
    availableSlots: 12,
    itinerary: ['Thác chính', 'Đò tham quan biên giới', 'Chụp ảnh flycam'],
    gallery: [tours[14].image],
  },

  {
    ...tours[15],
    description: 'Trượt cát jeep tại đồi cát Mũi Né, ngắm bình minh sa mạc.',
    duration: '4 giờ',
    departure: 'Mũi Né',
    availableSlots: 18,
    itinerary: ['Jeep trên đồi cát', 'Trượt ván cát', 'Chụp ảnh sống ảo'],
    gallery: [tours[15].image],
  },

  {
    ...tours[16],
    description: 'Tham quan các địa danh biểu tượng Sài Gòn trong 1 buổi.',
    duration: '4 giờ',
    departure: 'Quận 1 – TP.HCM',
    availableSlots: 25,
    itinerary: ['Nhà thờ Đức Bà', 'Bưu điện', 'Phố đi bộ Nguyễn Huệ'],
    gallery: [tours[16].image],
  },

  {
    ...tours[17],
    description: 'Đi thuyền dọc Tràng An, tham quan hang động & chùa cổ.',
    duration: '6 giờ',
    departure: 'Ninh Bình',
    availableSlots: 20,
    itinerary: ['Hang Tối', 'Hang Sáng', 'Chùa Bái Đính'],
    gallery: [tours[17].image],
  },

  {
    ...tours[18],
    description:
      'Đi tàu hoả Fansipan + trekking lên đỉnh núi cao nhất Việt Nam.',
    duration: '1 ngày',
    departure: 'Sapa',
    availableSlots: 7,
    itinerary: ['Tàu hoả núi', 'Leo 600 bậc thang', 'Check-in đỉnh Fansipan'],
    gallery: [tours[18].image],
  },

  {
    ...tours[19],
    description: 'Lặn biển tại Cù Lao Chàm ngắm san hô & cá nhiệt đới.',
    duration: '5 giờ',
    departure: 'Hội An',
    availableSlots: 14,
    itinerary: ['Lặn snorkeling', 'Ăn trưa hải sản', 'Tắm bãi Chồng'],
    gallery: [tours[19].image],
  },
];

export async function getTourDetail(id: number) {
  const t = tourDetails.find(t => t.id === id);
  return t || null;
}
