import React, { useEffect, useState } from 'react'
import { createPost, updatePost } from '../../services/postService'
import { Navigate, useNavigate } from 'react-router-dom'
/*
  게시글 폼 컴포넌트
  1) 등록폼일 경우
    - 사용자에게 제목, 내용 입력받을 수 있는 폼 UI 제공
    - 등록 버튼 클릭시 사용자 입력값 유효성 검사 후 게시글 등록 처리 (createPost)
    - 등록 완료 후 게시글 목록 페이지 이동
  2) 수정폼일 경우
    - 사용자에게 제목, 내용 입력받을 수 있는 폼 UI 제공
    - 초기에는 기존게시글의 제목, 내용을 폼에 미리 표시
    - 수정 버튼 클릭시 사용자 입력값 유효성 검사 후 게시글 수정 처리 (updatePost)
    - 수정 완료 후 게시글 상세 페이지로 이동

  prop 정의
  {
    mode: string    // 'create' | 'edit'
    initialData?: { // 수정폼일때 기존게시글 객체
      id: string,
      title: string,
      content: string
      createAt: Timestamp
    } 
  }
*/
function PostForm({mode, initialData}) {

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  const navigate = useNavigate();

  useEffect(() => {
    if(initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content
      }) 
    }
  }, [initialData]) // initialData 값이 변경되면 useEffect 실행

  const handleFormDateChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if(!formData.title || !formData.content){
      alert('입력값이 누락되었습니다.')
      return;
    }

    if(mode === 'create'){
      await createPost(formData);
      navigate('/posts')
    }else if(mode === 'edit'){
      await updatePost(initialData.id, formData)
      navigate(`/posts/${initialData.id}`);
    }

  }

  return (
    <form onSubmit={handlePostSubmit}>
      <input 
        type="text" 
        id="title"
        placeholder="제목"
        value={formData.title}
        onChange={handleFormDateChange}
      />
      <br />
      <textarea id="content" value={formData.content} placeholder="내용" onChange={handleFormDateChange} />
      <br />
      <button type="submit">{mode === 'create' ? '등록하기' : '수정하기'}</button>
    </form>
  )
}

export default PostForm