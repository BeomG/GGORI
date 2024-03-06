import { initializeApp } from 'firebase/app';
// 파이어 스토엉
// import { getFirestore } from 'firebase/firestore'; 
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDaJrGC1GHOm_uO1kP5LY7SNDWjQBPQM4c",
  authDomain: "test-d6fc6.firebaseapp.com",
  databaseURL: "https://test-d6fc6-default-rtdb.firebaseio.com",
  projectId: "test-d6fc6",
  storageBucket: "test-d6fc6.appspot.com",
  messagingSenderId: "534674713590",
  appId: "1:534674713590:web:188a548667a48ea2d2f5d7",
  measurementId: "G-B0MDWYPX7V"
};


const app = initializeApp(firebaseConfig);
// 파이어 스토어
// const db = getFirestore(app);
const db = getDatabase(app);

export default db;