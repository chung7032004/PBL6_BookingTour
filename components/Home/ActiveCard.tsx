import { Image, StyleSheet, Text, View } from 'react-native';
import images from '../../images';

interface ActiveCardProps {
  image: any;
  title: string;
  description: string;
}
const ActiveCard = (props: ActiveCardProps) => {
  const { image = images.banner3, title, description } = props;
  return (
    <View style={styles.activityCard}>
      <Image source={image} style={styles.activityImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDesc}>{description}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  activityImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  activityDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
});

export default ActiveCard;
