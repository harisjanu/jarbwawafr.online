import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAtEu70lYFkzUjnaxznybd-17eaFSY1dO4",
  authDomain: "tryandsave-23a2e.firebaseapp.com",
  projectId: "tryandsave-23a2e",
  storageBucket: "tryandsave-23a2e.appspot.com",
  messagingSenderId: "402229947308",
  appId: "1:402229947308:web:2288609c5d7b9c55906809",
  measurementId: "G-6C7RQ244JE",
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }

    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BLIr0sUp_Z4GPhJ2VCA0qr3Ntb7s6uv2c8WnGDtkI7P7w723XP-TwP2BOJD5G9Gr5dO1iybYg4GpxkkXw45gSyY",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
