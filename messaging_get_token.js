import { getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Cookies from "js-cookie";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export const getFirebaseToken = () => {
  const messaging = getMessaging();
  return getToken(messaging, { vapidKey: process.env.FB_FCM_KEY_PAIR })
    .then((currentToken) => {
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
        Cookies.set("fcm_token", currentToken);
        // setTokenFound(true);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // setTokenFound(false);
      }
    })
    .catch((err) => {});
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage((payload) => {
      resolve(payload);
    });
  });
