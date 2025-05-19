// src/context/UserContext.tsx

import React, {createContext, useContext, useState} from 'react';

// ✅ 사용자 정보 타입 (email은 optional로 변경)
export interface User {
  userId: number;
  userName: string;
  profileImage: string | null;
  email?: string; // ✅ 로그인 응답에 email이 없기 때문에 optional 처리
    token?: string; // ✅ 이 줄 추가!

}

// ✅ Context에서 사용할 타입
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// ✅ Context 생성 (초기값 undefined → 타입 강제 체크 유도)
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// ✅ Provider 컴포넌트
export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null); // 🔒 로그인 전엔 null

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Context 접근을 위한 커스텀 훅
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser는 반드시 UserProvider 안에서 사용해야 합니다!');
  }
  return context;
};
