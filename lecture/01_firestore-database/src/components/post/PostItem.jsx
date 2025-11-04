import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../services/postService';

/*
  props 정의
  {
    post: {
      id: string,
      title: string,
      content: string,
      createAt: Timestamp
    }
    mode: string  // 'list' | 'detail'
  }
*/
function PostItem({ post, mode }) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    if(mode === 'list') {
      navigate(`/post/${post.id}`)
    }
  }

  const handlePostDeleteClick = async () => {
    if(confirm('정말 삭제하시겠습니까?')){
      // 게시글 삭제 후 목록페이지 이동
      await deletePost(post.id);
      navigate('/posts');
    }
  }

  return (
    <div style={{border: '1px solid black', margin: '10px', padding: '10px', cursor: mode === 'list' ? 'pointer' : 'default'}} onClick={handlePostClick}>
      { post.title } 
      
      { mode === 'list' && `(${post.createAt.toDate().toLocaleString()})` } {/* ~일때만 && */}
       
      { mode === 'detail' && (
        <>
          <p>{ post.content }</p>
          <button>수정</button>
          <button onClick={handlePostDeleteClick}>삭제</button>
        </>
      ) }
    </div>
  )
}

export default PostItem