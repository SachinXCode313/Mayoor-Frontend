// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken,onMessage } from "firebase/messaging";
// import axios from "axios";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);
// const VAPID_KEY = process.env.REACT_APP_FIREBASE_VAPID_KEY;

// // Request Notification Permission and Get Token
// export const requestNotificationPermission = async () => {
//     try {
//         const permission = await Notification.requestPermission();
//         if (permission === "granted") {
//             console.log("Notification permission granted.");

//             const token = await getToken(messaging, { vapidKey: VAPID_KEY });
//             if (token) {
//                 console.log("Token retrieved:", token);
//                 try {
//                     await axios.post(`${process.env.REACT_APP_API_URL}/api/save-token`, { token });
//                     console.log("Token sent to server successfully.");
//                 } catch (error) {
//                     console.error("Error saving token:", error);
//                 }
//             } else {
//                 console.log("No token available.");
//             }
//         } else if (permission === "denied") {
//         }
//     } catch (error) {
//         console.error("Error requesting notification permission:", error);
//     }
// };


import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// export let messaging = typeof window !== "undefined" ? getMessaging(app) : null;
// if (process.browser) {
//   // because I'm getting error "Navigator not defined"
//   messaging = getMessaging(app);
// }
export const VAPID_KEY = process.env.REACT_APP_FIREBASE_VAPID_KEY;










