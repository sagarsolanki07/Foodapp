import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAj59EuB1SXwxLJSBa6ZBDEuX5wotwmZTY',
  authDomain: 'food-1818.firebaseapp.com',
  projectId: 'food-1818',
  storageBucket: 'food-1818.appspot.com',
  messagingSenderId: '322472359409',
  appId: '1:322472359409:android:760e2e2999ff090965c050',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
