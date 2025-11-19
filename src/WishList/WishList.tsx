import { useState } from 'react';
import { View } from 'react-native';
import CustomTabs from '../components/CustomTabs';
import WishListScreen from './WishListScreen';
import PersonalScheduleScreen from './PersonalScheduleScreen';

const WishList = () => {
  const [activeTab, setActiveTab] = useState<
    'wishListScreen' | 'personalScheduleScreen'
  >('wishListScreen');

  const tabs = [
    { key: 'wishListScreen', label: 'Yêu thích' },
    { key: 'personalScheduleScreen', label: 'Lịch trình cá nhân' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onChangeTab={key =>
          setActiveTab(key as 'wishListScreen' | 'personalScheduleScreen')
        }
      />

      {activeTab === 'wishListScreen' ? (
        <WishListScreen />
      ) : (
        <PersonalScheduleScreen />
      )}
    </View>
  );
};

export default WishList;
