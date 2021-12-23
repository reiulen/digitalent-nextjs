// import { getApps, initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";

const { getApps, initializeApp } = require("firebase/app");
const { getMessaging, getToken } = require("firebase/messaging");

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

const firebaseCloudMessaging = {
  init: async function () {
    if (!getApps().length) {
      initializeApp(firebaseConfig);

      const messaging = getMessaging();
      getToken(messaging, { vapidKey: process.env.FB_FCM_KEY_PAIR })
        .then((currentToken) => {
          console.log("masuk sini");
          return currentToken;
          if (currentToken) {
          } else {
            console.log("tidak ada registrasi token");
          }
        })
        .catch((err) => {
          console.log("error waktu generate token. ", err);
          return null;
        });
    }
  },
};
export { firebaseCloudMessaging };
// importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");
// import localforage from "localforage";

// const firebaseCloudMessaging = {
//   //checking whether token is available in indexed DB
//   tokenInlocalforage: async () => {
//     return localforage.getItem("fcm_token");
//   },
//   //initializing firebase app
//   init: async function () {
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         messagingSenderId: "38242238576",
//       });
//       try {
//         const messaging = firebase.messaging();
//         const tokenInLocalForage = await this.tokenInlocalforage();
//         //if FCM token is already there just return the token
//         if (tokenInLocalForage !== null) {
//           return tokenInLocalForage;
//         }
//         //requesting notification permission from browser
//         const status = await Notification.requestPermission();
//         if (status && status === "granted") {
//           //getting token from FCM
//           const fcm_token = await messaging.getToken();
//           if (fcm_token) {
//             //setting FCM token in indexed db using localforage
//             localforage.setItem("fcm_token", token);
//             console.log("fcm token", token);
//             //return the FCM token after saving it
//             return token;
//           }
//         }
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     }
//   },
// };
// export { firebaseCloudMessaging };
