import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  email: string;
  name: string;
  password: string;
}
export interface UserPublic {
  email: string;
  name: string;
}

// Giả lập dữ liệu user đã "đăng ký"
export let users: User[] = [
  {
    email: 'chung27032004@gmail.com',
    name: 'Nguyen Chung',
    password: 'Password@123',
  },
  {
    email: 'test1@gmail.com',
    name: 'Nguyen Van A',
    password: '123456',
  },
  {
    email: 'test2@gmail.com',
    name: 'Nguyen Thi B',
    password: '123456',
  },
  {
    email: 'test3@gmail.com',
    name: 'Le C',
    password: '123456',
  },
];

//login
export async function login(
  email: string,
  password: string,
): Promise<UserPublic | null> {
  try {
    const user = users.find(u => {
      return u.email === email && u.password === password;
    });
    if (user) {
      const userPublicData = {
        email: user.email,
        name: user.name,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userPublicData)); // lưu
      return userPublicData;
    }
    return null;
  } catch (e) {
    console.log('Login error', e);
    return null;
  }
}

//lấy user hiện tại
export async function getCurrentUser(): Promise<UserPublic | null> {
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

const FIXED_OTP = '020316'; // Mã OTP cố định để kiểm tra

// Lưu trạng thái otp gửi (nếu bạn muốn kiểm tra "đã gửi" per-email)
let verificationCodes: Record<string, { code: string; createdAt: number }> = {};

export async function forgotPassword(
  email: string,
): Promise<{ success: boolean; message: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const found = users.find(u => u.email === email);

      if (!found) {
        resolve({
          success: false,
          message: 'Email chưa được đăng ký trong hệ thống!',
        });
      } else {
        verificationCodes[email] = {
          code: FIXED_OTP,
          createdAt: Date.now(),
        };

        console.log(`[fakeAuth] OTP for ${email}: ${FIXED_OTP}`);
        resolve({
          success: true,
          message: 'Link đặt lại mật khẩu đã được gửi!',
        });
      }
    }, 800);
  });
}

export async function verifyCode(
  email: string,
  code: string,
): Promise<{ success: boolean; message?: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const stored = verificationCodes[email];

      if (!stored) {
        resolve({
          success: false,
          message: 'Chưa gửi mã cho email này (hoặc mã hết hạn).',
        });
        return;
      }

      const isExpired = Date.now() - stored.createdAt > 60_000; // ✅ 1 phút

      if (isExpired) {
        delete verificationCodes[email];
        resolve({
          success: false,
          message: 'Mã xác nhận đã hết hạn. Vui lòng gửi lại.',
        });
        return;
      }

      if (stored.code === code) {
        delete verificationCodes[email];
        resolve({ success: true });
      } else {
        resolve({ success: false, message: 'Mã xác nhận không đúng.' });
      }
    }, 500);
  });
}

export async function resendCode(email: string): Promise<ApiResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      verificationCodes[email] = {
        code: FIXED_OTP,
        createdAt: Date.now(),
      };

      console.log(`[fakeAuth] Resent OTP for ${email}: ${FIXED_OTP}`);
      resolve({ success: true, message: 'Mã đã được gửi lại (giả lập).' });
    }, 500);
  });
}

/**
 * Đổi mật khẩu: tìm user trong usersData và cập nhật password.
 * Trả về success hoặc lỗi (nếu email không tồn tại).
 */
type ApiResult = {
  success: boolean;
  message?: string;
};
export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<ApiResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      const idx = users.findIndex(u => u.email === email);
      if (idx === -1) {
        resolve({ success: false, message: 'Email không tồn tại.' });
        return;
      }

      // Cập nhật password (giả lập)
      // Nếu usersData được export là let users: User[] thì thay đổi này sẽ tồn tại trong runtime
      users[idx].password = newPassword;

      console.log(`[fakeAuth] Password for ${email} set to: ${newPassword}`);
      resolve({ success: true, message: 'Đổi mật khẩu thành công (giả lập).' });
    }, 700);
  });
}
