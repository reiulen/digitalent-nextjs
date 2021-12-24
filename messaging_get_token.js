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
          console.log("masuk sini", currentToken);
          if (currentToken) {
            return currentToken;
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
