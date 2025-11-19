import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../types/route';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderNotificationIcon = ({ count = 0 }) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('notice');
      }}
      style={{ marginRight: 15 }}
    >
      <Icon name="notifications" size={26} color="black" />
      {count > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count > 9 ? '9+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HeaderNotificationIcon;
const styles = StyleSheet.create({
  countContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
