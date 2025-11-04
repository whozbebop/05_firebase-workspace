/*
  게시글 CRUD

  posts [
    {
      title: 'xxxx',
      content: 'xxxxxx',
      createAt: Timestamp
    },
    ...
  ]
*/

import { db } from '../firebase/config.js'
import { 
  collection,  doc,
  addDoc, updateDoc, deleteDoc,
  getDocs, getDoc,
  serverTimestamp,
  query,
  orderBy,
 } from 'firebase/firestore'

// 현재 서비스의 컬렉션명을 상수화
const COLLECTION_NAME = 'posts';

// 각 기능별 함수 정의

/**
 * 신규 게시글을 등록하는 함수
 * @param {Object} postData - 등록할 게시글 데이터 {title, content}
 * @returns {string} 생성된 게시글 고유 ID 
 */
const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...postData,
      createAt: serverTimestamp()
    })
    console.log(docRef.id)
    return docRef.id;

  }catch(error) {
    console.log('게시물 등록 오류')
    throw error;
  }
}

// 테스트 실행
// createPost({
//   title: '게시글1',
//   content: '내용1'
// });
// createPost({
//   title: '게시글2',
//   content: '내용2'
// });

/**
 * 전체 게시글 목록을 조회하는 함수
 * @returns {Array} 조회된 게식르 배열 (각 게시글 객체에 ID 포함)
 */
const getPosts = async () => {
  
  try {

    // 조회
    //const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))

    // 쿼리생성
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createAt', 'desc')
    )

    // 정렬, 쿼리 객체 추가
    const querySnapshot = await getDocs( q )

    // 조회결과 가공
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    //가공된 데이터 반환
    return posts;
      
  } catch (error) {
    console.log('게시글 목록 조회 오류');
    throw error;
  }

}

// 테스트 실행
// 비동기 작업 전에 콘솔로그 출력됨 => await로 출력
//console.log(await getPosts())

/**
 * @param {string} postId - 조회할 게시글 고유 ID
 * @returns {null | Object} 게시글 객체(ID 포함) 또는 null
 */
const getPost = async (postId) => {
  try {
    const docSnapshot = await getDoc(doc(db, COLLECTION_NAME, postId))

    if(!docSnapshot.exists()) {
      return null;
    }

    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    }

  } catch (error) {
      console.log('게시글 조회 오류');
      throw error;
  }
}

//console.log(await getPost('xaVjjNslIoZrIZXbgXIR'))

/**
 * 
 * @param {string} postId - 수정할 게시글 고유 ID 
 * @param {Object} postData - 수정할 게시글 데이터 {title, content}
 */
const updatePost = async (postId, postData) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, postId), {
      ...postData
    });
    console.log('게시글이 수정되었습니다.')
  } catch (error) {
    console.log('게시글 수정 오류');
    throw error;
  }
}

// 테스트 실행
// updatePost('xaVjjNslIoZrIZXbgXIR', {
//   title: '게시글111',
//   content: '내용1111'
// })

/**
 * 특정 게시글을 삭제하는 함수
 * @param {string} postId  - 삭제할 게시글 고유 ID
 */
const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, postId));
    console.log('게시글이 삭제되었습니다.');
  } catch (error) {
      console.log('게시글 삭제 오류')
      throw error;
  }
}

//deletePost('xaVjjNslIoZrIZXbgXIR');

export {createPost, getPosts, getPost, updatePost, deletePost};