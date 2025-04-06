import React, {createContext, useContext, useState} from 'react';

// ✅ 사용자 정보 타입
export interface User {
  userId: number;
  userName: string;
  email: string;
  profileImage: string | null;
}

// ✅ Context에 사용할 타입
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// ✅ Context 생성 (초기값 undefined로 사용 금지)
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// ✅ Provider 컴포넌트
export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null); // 👉 로그인 안 된 기본 상태

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ 커스텀 훅
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser는 반드시 UserProvider 안에서 사용해야 합니다!');
  }
  return context;
};
