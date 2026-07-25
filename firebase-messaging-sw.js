importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBJTf85XSHSMGZOZCXonjiHgpD4dEFzxvc",
  authDomain: "football-world-9e60e.firebaseapp.com",
  projectId: "football-world-9e60e",
  storageBucket: "football-world-9e60e.firebasestorage.app",
  messagingSenderId: "325667990931",
  appId: "1:325667990931:web:a9173864b82b8c65f80c66"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  self.registration.showNotification(payload.notification.title, {

    body: payload.notification.body,

    icon: "/assets/icon.png"

  });

});