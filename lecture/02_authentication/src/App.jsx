import { auth } from './firebase/config'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import UserProfile from './components/UserProfile'
import { useState } from 'react'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'


function App() {

  // 인증된 사용자 정보를 저장하는 state
  const [user, setUser] = useState(null);
  useEffect(() => {
    // 인증 상태 변경이 감지될때마다 현재 그 사용자정보 user로 반영
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('인증 관련 상태가 변경되었습니다.');
      setUser(currentUser);
    })
    // 클린업함수
    return () => unsubscribe();
  }, [])

  return (
    <div>
      
      {/* 로그인후(auth.currentUser에 사용자객체가 있음) - UserProfile 컴포넌트 */}
      {/* 로그인전(auth.currentUser에 null) - LoginForm, SignupForm 컨포넌트 */}

      {
        //auth.currentUser
        user ? (
          <UserProfile />
        ) : (
          <>
            <h2>회원가입</h2>
            <SignupForm />
            <h2>로그인</h2>
            <LoginForm />
          </>
        )
      }

    </div>
  )
}

export default App
