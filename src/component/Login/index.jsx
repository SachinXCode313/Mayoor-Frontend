import Wrapper from "./style";
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
// import { requestNotificationPermission } from "../../Helper/firebase";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "../../Helper/firebase";
import axios from "axios";
// import Home from "../Home/";
import Logo from './Logo.png';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const allowedDomains = ["gitjaipur.com"];
// const WS_URL = "http://localhost:5000"

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Start with null to avoid flicker
  const [error, setError] = useState("");
  const [ws, setWs] = useState(null);
  const [notification, setNotification] = useState({ title: "", body: "" });

  const loginInProgress = useRef(false); // Track if login is in progress

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "admin") {
      navigate("/admin");
    } else if (storedRole === "teacher") {
      navigate("/user");
    } else {
      navigate("/")
    }
  }, []);


  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // ✅ Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };

        // ✅ Store user in localStorage
        localStorage.setItem("firebaseUser", JSON.stringify(userData));
        setUser(userData);
      } else {
        localStorage.removeItem("firebaseUser");
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // useEffect(() => {
  //   const token = requestNotificationPermission();

  //   onMessage(messaging, (payload) => {
  //     console.log("Received foreground message:", payload);
  //     const { title, body } = payload.notification || {};

  //     new Notification({ title, body });


  //   });
  // }, []);

  // useEffect(() => {
  //   const websocket = new WebSocket(WS_URL);

  //   websocket.onopen = () => {
  //     console.log('✅ Connected to WebSocket server');
  //   };

  //   websocket.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       localStorage.setItem('teachers', JSON.stringify(data));
  //       window.dispatchEvent(new Event('teachersUpdated'));
  //     } catch (err) {
  //       console.error('❌ Error parsing WebSocket message:', err);
  //     }
  //   };

  //   websocket.onclose = () => {
  //     console.log('🔴 WebSocket connection closed');
  //   };

  //   websocket.onerror = (err) => {
  //     console.error('❌ WebSocket error:', err);
  //   };

  //   setWs(websocket);

  //   return () => {
  //     websocket.close();
  //   };
  // }, []);

  // const handleJoin = () => {
  //   if (teacher && ws) {
  //     const userData = JSON.stringify({ teacherName: teacher.displayName, email: teacher.email });
  //     console.log("Sending data to WebSocket server:", userData);  // Log the data before sending
  //     ws.send(userData);
  //     setTeacher(null); // Clear after sending
  //   }
  // };


  const handleLogin = async () => {
    if (loginInProgress.current) return; // Prevent multiple login attempts
    loginInProgress.current = true;

    try {
      await setPersistence(auth, browserLocalPersistence);
      // Force fresh sign-in flow
      await signOut(auth);
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in successful:", result);

      const idToken = await result.user.getIdToken();
      console.log("ID Token retrieved:", idToken);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-user`, {
          token: idToken,
        });
        const data = response.data

        if (response.status === 200) {
          setError("");
          console.log(response.data)
          const user = {
            teacherId: data.teacherId,
            role: data.role,
            uid: data.user.uid,
            name: data.user.name,
            email: data.user.email,
            image: data.user.picture,
            allocation: data.allocations
          };

          // if (ws) {
          //   const userData = JSON.stringify({ name: user.name, email: user.email });
          //   ws.send(userData);
          //   console.log("Sending data to WebSocket server:", userData);  // Log the data before sending
          // }

          console.log("user authenticated successfully:", user);
          // ✅ Store user in localStorage
          localStorage.setItem("token", idToken);
          localStorage.setItem("role", user.role);
          localStorage.setItem("User", JSON.stringify(user));

          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
          setUser(user);
        } else {
          setError("Authentication failed: " + response.data.message);
        }
      } catch (err) {
        console.error("Error during token verification:", err.response?.data || err.message || err);
        setError("This email isn’t registered. Please try again with a registered email.");
      }
    } catch (err) {
      console.error("Error during login:", err.code, err.message);
      setError("An error occurred during login please try again");
      await signOut(auth); // Ensure we clean up invalid credentials
    } finally {
      loginInProgress.current = false;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("firebaseUser"); // ✅ Remove user from localStorage
    setUser(null);
  };

  console.log(user);

  return (
    <Wrapper>
      <div className="homePage">
        {/* {user ? (
          <Home user={user?.displayName} onLogout={handleLogout} />
        ) : ( */}
        <div className="container">
          <div>
            <img id="logo" src={Logo} alt="Logo" /><br />
            <h1 id="appName">Mayoor School Jaipur</h1>
            <p id="tagline">In Collaboration With Mayo College General Council</p>
          </div>

          <input id="SignIn" type="button" value="Sign in with Google" onClick={handleLogin} />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        {/* )} */}
      </div>
    </Wrapper>
  );
};

export default Login;

