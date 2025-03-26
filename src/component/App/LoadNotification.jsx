// import React from 'react'
// import { useEffect } from 'react';
// import { onMessage } from 'firebase/messaging';
// import { messaging} from '../../Helper/firebase';
// import requestNotificationPermission from '../../Helper/push';


// const LoadNotification = () => {
//     useEffect(() => {
//   requestNotificationPermission();

//   onMessage(messaging, (payload) => {
//     console.log("Received foreground message:", payload);
//     const { title, body } = payload.notification || {};

//     new Notification(title,{
//       body: body || "Foreground body",
//     })
    
//   });
// }, []);

// return

// }

// export default LoadNotification