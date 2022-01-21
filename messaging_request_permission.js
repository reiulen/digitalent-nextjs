const firebaseRequestPermission = {
  init: async function () {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // console.log("Notification permission granted.");
      } else {
        // console.log("Unable to get permission to notify.");
      }
    });
  },
};

export { firebaseRequestPermission };
