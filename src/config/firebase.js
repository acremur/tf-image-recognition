import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBXmlURL3TpS3_6tVmHQZnn_mvi6EHtZbc",
    authDomain: "tf-img-recognition.firebaseapp.com",
    databaseURL: "https://tf-img-recognition.firebaseio.com",
    projectId: "tf-img-recognition",
    storageBucket: "tf-img-recognition.appspot.com",
    messagingSenderId: "477938018826",
    appId: "1:477938018826:web:86af9a5b17369bfb340df3"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase