import React from 'react'
import { useState } from 'react';
import { login } from '../services/authService';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    // 로그인 요청 보내기
    try {
      await login(formData.email, formData.password)

    }catch (error) {
      let errorMsg = '로그인 중 오류가 발생했습니다.';
      switch(error.code){
        case 'auth/invalid-email':
          errorMsg = '올바른 이메일 형식이 아닙니다.';
          break;
        case 'auth/invalid-credential':
          errorMsg = '등록된 계정이 아닙니다.';
          break;
        case 'auth/too-many-requests':
          errorMsg = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
          break;
      }
      alert(errorMsg)
    }finally {
      setLoading(false);
    }

  }

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        placeholder="이메일" 
        value={formData.email} 
        onChange = {(e) => {
          setFormData({...formData, email: e.target.value})
        }} 
      />
      <br />
      <input 
        type="password" 
        placeholder='비밀번호' 
        value={formData.password}
        onChange = {(e) => {
          setFormData({...formData, password: e.target.value})
        }} 
      />  
      <br />
      <button type="submit" disabled={loading}>
        {loading ? (
          '처리중...'
        ) : (
          '로그인'
        )}
      </button>
    </form>
  )
}

export default LoginForm