import {
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ProfileEditScreen = () => {
  return (
    <ScrollView>
      <View>
        <Image source={require('../images/account.jpg')} />
        <Text>Tên của ban</Text>
        <TextInput
          placeholder="Chúng tôi biết về bạn"
          placeholderTextColor="#888"
        ></TextInput>
      </View>
      <View>
        <View>
          <Text>Dữ liệu cá nhân</Text>
          <TouchableOpacity>
            <Text>Hủy</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Tên đầy đủ</Text>
          <TextInput
            placeholder="Tên của bạn"
            placeholderTextColor="#888"
          ></TextInput>
        </View>
        <View>
          <View>
            <Text>Ngày sinh</Text>
            <Text>Date</Text>
          </View>
          <View>
            <Text>Giới tính</Text>
            <Text>Nam</Text>
          </View>
        </View>
        <View>
          <Text>Địa chỉ</Text>
          <TextInput
            placeholder="Địa chỉ của bạn"
            placeholderTextColor="#888"
          ></TextInput>
        </View>
        <Button title="Lưu" />
      </View>
      <View>
        <Text>Số điện thoại</Text>
        <TouchableOpacity>
          <Text>Thêm</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Số điện thoại của bạn"
          placeholderTextColor="#888"
        ></TextInput>
        <TouchableOpacity>
          <Text>Hủy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileEditScreen;
