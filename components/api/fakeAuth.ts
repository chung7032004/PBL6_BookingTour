import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  email: string;
  name: string;
  password: string;
}

// Giả lập dữ liệu user đã "đăng ký"
let users: User[] = [
  {
    email: 'test@gmail.com',
    name: 'Nguyen Van A',
    password: '123456',
  },
];

//login
export async function login(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const user = users.find(u => {
      return u.email === email && u.password === password;
    });
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user)); // lưu
      return user;
    }
    return null;
  } catch (e) {
    console.log('Login error', e);
    return null;
  }
}

//lấy user hiện tại
export async function getCurrentUser(): Promise<User | null> {
  const data = await AsyncStorage.getItem('user'); // đọc
  return data ? JSON.parse(data) : null;
}

// Đăng xuất
export async function logout() {
  await AsyncStorage.removeItem('user'); // xóa
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const exists = users.some(u => u.email === email);
  return exists;
}
// Đăng kí
export async function signup(
  email: string,
  password: string,
  name: string,
): Promise<User | null> {
  if (await checkEmailExists(email)) {
    console.log('Signup error: Email already exists.');
    return null;
  }
  const newUser = {
    email,
    name,
    password,
  };
  users.push(newUser);
  try {
    console.log('User signed up successfully. Manual login is required.');
    return newUser;
  } catch (e) {
    console.log('Signup error', e);
    return null;
  }
}
