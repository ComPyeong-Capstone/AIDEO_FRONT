// src/context/UserContext.tsx
import React, {createContext, useContext, useState} from 'react';

// ✅ User 인터페이스
export interface User {
  userId: number;
  userName: string;
  email: string;
  profileImage: string | null;
}

// ✅ Context 타입 정의
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// ✅ Context 생성 (초기값은 undefined)
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
); // 🔥 export 추가!

// ✅ Provider 컴포넌트
export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Context 사용 커스텀 훅
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser는 반드시 UserProvider 안에서 사용해야 합니다!');
  }
  return context;
};
