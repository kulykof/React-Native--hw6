import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAFWhcN-5TfD3pWouBUZ4uoXo8oUx199d8',
  authDomain: 'react-native-hw-01.firebaseapp.com',
  projectId: 'react-native-hw-01',
  storageBucket: 'react-native-hw-01.appspot.com',
  messagingSenderId: '124065534649',
  appId: '1:124065534649:web:cf78e0a929d1adafe74168',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
