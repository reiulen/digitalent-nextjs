import { getMessaging, onMessage } from "firebase/messaging";

const firebaseReceiveMessage = {
  init: async function () {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  },
};

export { firebaseReceiveMessage };
