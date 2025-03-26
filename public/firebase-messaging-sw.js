importScripts(
    "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
  );
  
importScripts(
    "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
  );
  firebase.initializeApp({
    apiKey: "AIzaSyDbbdGp0p19Bx5RxFWzZ2BP_ADzNnh3dU0",
    authDomain: "mayur-app-77f32.firebaseapp.com",
    projectId: "mayur-app-77f32",
    storageBucket: "mayur-app-77f32.firebasestorage.app",
    messagingSenderId: "114595171096",
    appId: "1:114595171096:web:67e945996857ea0debac6d",
    measurementId: "G-M8ZM87JKMG"
  });
  const isSupported = firebase.messaging.isSupported();
  if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        // icon: payload.notification.icon,
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
      console.log("background");
    });
  }
  
  
  
  
  
  
  
  
  
  