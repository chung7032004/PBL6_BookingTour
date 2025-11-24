// // file: context/AuthContext.tsx

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Sử dụng AsyncStorage cho React Native

// // Import hàm logout từ API Client để đồng bộ hóa
// import { logout } from './login';

// // --- DEFINITIONS ---

// interface DecodedToken {
//   nameid: string; // ID người dùng
//   email: string;
//   role: 'Admin' | 'User' | 'Host'; // Thay đổi theo vai trò trong ứng dụng
//   exp: number;
//   name?: string;
//   [k: string]: any;
// }

// interface User {
//   id: string;
//   email: string;
//   role: 'Admin' | 'User' | 'Host';
//   name: string;
// }

// export interface AuthContextProps {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (token: string) => void;
//   logout: () => void;
//   getAccessToken: () => Promise<string | null>;
// }

// const AuthContext = createContext<AuthContextProps | null>(null);

// // --- PROVIDER COMPONENT ---

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setAuthenticated] = useState(false);
//   const [isLoading, setLoading] = useState(true);

//   const decodeAndSetUser = (token: string) => {
//     const decoded = jwtDecode<DecodedToken>(token);

//     setUser({
//       id: decoded.nameid,
//       email: decoded.email,
//       role: decoded.role,
//       name: decoded.name || decoded.email.split('@')[0],
//     });

//     setAuthenticated(true);
//   };

//   const login = async (token: string) => {
//     await AsyncStorage.setItem('accessToken', token);
//     decodeAndSetUser(token);
//   };

//   const performLogout = async () => {
//     await logout(); // Gọi hàm logout từ API client để xóa token
//     setUser(null);
//     setAuthenticated(false);
//     // Lưu ý: Trong React Native, bạn sẽ cần điều hướng (navigation) ở đây
//     // Ví dụ: navigation.navigate('Login');
//   };

//   const getAccessToken = () => AsyncStorage.getItem('accessToken');

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await AsyncStorage.getItem('accessToken');
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const decoded = jwtDecode<DecodedToken>(token);
//         // Kiểm tra thời gian hết hạn (thời gian hết hạn nhỏ hơn thời gian hiện tại)
//         if (decoded.exp * 1000 < Date.now()) {
//           await performLogout();
//         } else {
//           decodeAndSetUser(token);
//         }
//       } catch {
//         await performLogout();
//       }

//       setLoading(false);
//     };

//     checkToken();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isLoading,
//         login,
//         logout: performLogout,
//         getAccessToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // --- HOOK ---

// export const useAuthContext = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
//   return ctx;
// };
