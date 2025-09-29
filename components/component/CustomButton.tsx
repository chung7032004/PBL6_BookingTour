import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void; // Hàm xử lý khi bấm
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const CustomButton = (props: ButtonProps) => {
  const { title = 'Button', onPress, style, textStyle } = props;
  return (
    <TouchableOpacity style={[styles.touchButton, style]} onPress={onPress}>
      <Text style={[styles.touchText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  touchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default CustomButton;
