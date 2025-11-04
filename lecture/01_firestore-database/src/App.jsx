// /              메인페이지 (MainPage)
// /posts         게시글목록페이지 (PostListPage)     - 게시글상세item 다수
// /posts/:id     게시글상세페이지 (PostDetailPage)   - 게시글상세item
// /posts/new     게시글등록페이지 (PostRegistPage)   - 게시글form(기재된값이없는) 
// /post/:id/edit 게시글수정페이지 (PostEditPage)     - 게시글 form(기존게시글정보가 기재된채로)

import { Link, Route, Routes } from "react-router-dom"
import MainPage from './pages/MainPage'
import PostListPage from './pages/post/PostListPage'
import PostDetailPage from './pages/post/PostDetailPage'
import PostRegistPage from './pages/post/PostRegistPage'
import PostEditPage from './pages/post/PostEditPage'

function App() {

  return (
    <>
      <nav>
        <Link to="/">홈</Link> | <Link to="/posts">게시글목록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/posts" element={<PostListPage />}></Route>
        <Route path="/posts/:id" element={<PostDetailPage />}></Route>
        <Route path="/posts/new" element={<PostRegistPage />}></Route>
        <Route path="/posts/:id/edit" element={<PostEditPage />}></Route>
      </Routes>
    </>
  )
}

export default App
