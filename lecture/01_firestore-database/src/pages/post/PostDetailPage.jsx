import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../../services/postService';
import PostItem from '../../components/post/PostItem';

function PostDetailPage() {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true)
  const {id} = useParams() // {id: xx}
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      const post = await getPost(id);
      setPost(post)
      setLoading(false)
    }
    fetchPost();
  }, [id])

  return (
    <div>
      <h2>게시글 상세</h2>
      <button onClick={() => navigate('/posts')}>목록으로</button>

      {loading ? (
        <div>로딩중...</div>
      ) : (
        <PostItem post={post} mode="detail" />
      )}
      
    </div>
  )
}

export default PostDetailPage