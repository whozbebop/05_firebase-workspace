import { addDoc, collection, setDoc, doc, getDocs, getDoc, updateDoc, deleteField, increment, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js'

//console.log(db);

// 도서 관련 데이터 CRUD
/*
  books(컬렉션, collection) [
    문서(document) {
      title: 'xxx',         // 필드(Field)
      author: 'xxxx',       // 필드(Field)
      price: 'xx',          // 필드(Field)
      createAt: new Date()
    },
    문서(document) {
      title: 'xxx',
      author: 'xxxx',
      price: 'xx',
      createAt: new Date()
    },
    문서(document) {
      title: 'xxx',
      author: 'xxxx',
      price: 'xx',
      createAt: new Date()
    },
  ]
*/

// 1) 새로운 도서(document, 문서) 추가 (addDoc, collection)
// async function addBook() {
//   const docRef = await addDoc(collection(db, "books"), {
//     title: "firebase의 모든 것",
//     author: '모닥불',
//     price: 10000,
//     createAt: new Date()
//   }) // (어떤컬렉션, 어떤객체)를 저장 시킬건지

//   console.log('추가완료된 도서의 고유ID(식별자):', docRef.id);

// }

//addBook();

// 2) 새로운 도서(문서) 추가 (setDoc, doc)
// const addBook = async () => {
//   // 직접 고유 ID 지정하고 싶을 때
//   await setDoc(doc(db, 'books', 'bk_001'), {
//     title: 'React의 모든 것',
//     author: '김코딩',
//     price: 20000,
//     createAt: new Date()
//   })
// }

//addBook();

// 3) 문서 조회 - 전체 문서 조회
// const getBooks = async () => {
//   const querySnap = await getDocs(collection(db, 'books'))

//   // console.log('조회된 문서(도서) 개수:', querySnap.size);
//   // console.log('조회된 문서가 비어있는지:', querySnap.empty);
//   // console.log('조회된 문서 목록(배열):', querySnap.docs); // [QueryDocumentSnapshot, ...]

//   //querySnap.docs.forEach((doc) => console.log(doc.id, doc.data()));

//   const books = querySnap.docs.map((doc) => {
//     return {
//       id: doc.id,
//       ...doc.data()
//     }
//   });

//   //console.log(books);
//   console.table(books)
// }

// getBooks();

// 4) 문서 조회 - 단일 문서 가져오기 (getDoc, doc)
// const getBook = async (bookId) => {
//   const docSnap = await getDoc(doc(db, 'books', bookId))

//   if(docSnap.exists()){ // 문서 존재여부 확인
//     console.log(docSnap.id);
//     console.log(docSnap.data());
//     console.log(docSnap.get('title'))
//   }else {
//     console.log('조회결과가 없습니다. ID를 확인해주세요.')
//   }
// }

// getBook('bk_001'); // 조회할 ID

// 5) 문서 수정 (updateDoc, doc)
// const updateBook = async (bookId) => {
//   try {
//     await updateDoc(doc(db, 'books', bookId), {
//       title: '수정 테스트',
//       author: deleteField(), // 필드 삭제 원할 때
//       price: increment(5000), // 숫자 증가 원할 때
//       createAt: serverTimestamp(), // 서버 시간 설정 원할 때
//     })
//   } catch (error) {
//     console.log('문서 수정 오류', error)
//   }
// }

// updateBook('bk_002');

// 6) 문서 삭제 (deleteDoc, doc)
const deleteBook = async (bookId) => {
  await deleteDoc(doc(db, 'books', bookId));
}

deleteBook('bk_002');
