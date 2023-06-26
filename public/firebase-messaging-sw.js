importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAtEu70lYFkzUjnaxznybd-17eaFSY1dO4",
  authDomain: "tryandsave-23a2e.firebaseapp.com",
  projectId: "tryandsave-23a2e",
  storageBucket: "tryandsave-23a2e.appspot.com",
  messagingSenderId: "402229947308",
  appId: "1:402229947308:web:2288609c5d7b9c55906809",
  measurementId: "G-6C7RQ244JE",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
