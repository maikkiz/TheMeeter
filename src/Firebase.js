import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDi5jLmvTNqYNtcXkoBdRSIWT0HgDZPYqg",
    authDomain: "themeetapp-96db0.firebaseapp.com",
    databaseURL: "https://themeetapp-96db0.firebaseio.com",
    projectId: "themeetapp-96db0",
    storageBucket: "themeetapp-96db0.appspot.com",
    messagingSenderId: "952912109578",
    appId: "1:952912109578:web:f605d0a2556978ff8d7ff3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
