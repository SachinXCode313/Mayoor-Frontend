// import { getToken } from "firebase/messaging";
// import { VAPID_KEY, messaging } from "./firebase";
// export const requestNotificationPermission = async () => {
//   if ("Notification" in window) {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//       const token = await getToken(messaging, { vapidKey: VAPID_KEY });
//       console.log("+++ token", token);
//     } else if (permission === "denied") {
//       alert('permission === "denied"');
//     }
//   }
// };

import { getToken } from "firebase/messaging";
import { VAPID_KEY, messaging } from "./firebase";
import axios from "axios";


const requestNotificationPermission = async () => {
    if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("Notification permission granted.");
            const token = await getToken(messaging, { vapidKey: VAPID_KEY });
            console.log("+++ token", token);

            if (token) {
                console.log("Token retrieved:", token);
                try {
                    await axios.post(`${process.env.REACT_APP_API_URL}/api/save-token`, { token });
                    console.log("Token sent to server successfully.");
                } catch (error) {
                    console.error("Error saving token:", error);
                }
            } else {
                console.log("No token available.");
            }
            console.log("token saved in database");
        } else if (permission === "denied") {
            console.warn("Notification permission denied.");
        }
    } else {
        console.error("Notifications are not supported in this browser.");
    }
};

export default requestNotificationPermission;


