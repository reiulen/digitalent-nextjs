importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCE2YL39cNc47v0eSzmecyaAOhAKYlGjxQ",
    authDomain: "dts-kominfo.firebaseapp.com",
    projectId: "dts-kominfo",
    storageBucket: "dts-kominfo.appspot.com",
    messagingSenderId: "38242238576",
    appId: "1:38242238576:web:8043a0824ce6e1e42134b5",
    measurementId: "G-Z43DV3R59G",
  });
  firebase.messaging();
  //background notifications will be received here
  firebase
    .messaging()
    .setBackgroundMessageHandler((payload) => console.log("payload", payload));
}
