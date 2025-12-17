import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoadingView from '../components/LoadingView';
import { userProfile } from '../../types/host';
import { formatENDate } from '../components/FormatDate';

interface CardProps {
  nameIcon: string;
  title: string;
  data: string;
}

const InfoCard: React.FC<CardProps> = ({ nameIcon, title, data }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name={nameIcon} size={24} color="#333" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.dataText}>{data}</Text>
      </View>
    </View>
  );
};

interface PostsScreenProps {
  myProfile: userProfile | null | undefined;
}

const PostsScreen = ({ myProfile }: PostsScreenProps) => {
  if (!myProfile) {
    return <LoadingView message="Profile data not found." />;
  }

  return (
    <ScrollView style={styles.container}>
      <InfoCard
        nameIcon="person-outline"
        title="Full Name"
        data={myProfile.fullName}
      />

      <InfoCard nameIcon="email" title="Email Address" data={myProfile.email} />

      <InfoCard
        nameIcon="phone-iphone"
        title="Phone Number"
        data={myProfile.phoneNumber || 'Not provided'}
      />

      <InfoCard
        nameIcon="transgender"
        title="Gender"
        data={myProfile.gender || 'Not provided'}
      />

      <InfoCard
        nameIcon="date-range"
        title="Date of Birth"
        data={
          myProfile.dateOfBirth
            ? formatENDate(myProfile.dateOfBirth)
            : 'Not provided'
        }
      />

      <InfoCard
        nameIcon="home"
        title="Country"
        data={myProfile.country || 'Not provided'}
      />
    </ScrollView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 70,
  } as ViewStyle,

  iconWrapper: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  } as ViewStyle,

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,

  titleText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  } as TextStyle,

  dataText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  } as TextStyle,
});
