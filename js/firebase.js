import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging.js";
import {
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging.js";
const firebaseConfig = {
  apiKey: "AIzaSyBJTf85XSHSMGZOZCXonjiHgpD4dEFzxvc",
  authDomain: "football-world-9e60e.firebaseapp.com",
  projectId: "football-world-9e60e",
  storageBucket: "football-world-9e60e.firebasestorage.app",
  messagingSenderId: "325667990931",
  appId: "1:325667990931:web:a9173864b82b8c65f80c66"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

Notification.requestPermission().then(async (permission) => {

    if (permission === "granted") {

        const token = await getToken(messaging, {
           vapidKey: "BHCm8QFjEsKUnf3NaQCLtgT07-HKogs0gZMh31oOTtRz4gXlF7slHclgjv3nyqD5ic3JCrJjrlmqKPbY_BSoZ1g"
        });

        console.log("FCM Token:", token);

        localStorage.setItem("fcmToken", token);

    }

});

onMessage(messaging, (payload) => {

    alert(payload.notification.title + "\n" + payload.notification.body);

});
navigator.serviceWorker.register("/firebase-messaging-sw.js")
.then(() => {
    console.log("Service Worker Registered ✅");
})
.catch(err => {
    console.log(err);
});