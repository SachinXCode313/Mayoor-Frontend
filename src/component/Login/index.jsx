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
// const WS_URL = "ws://mayoorschoolapp.onrender.com/";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Start with null to avoid flicker
  // const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  // const [ws, setWs] = useState(null);
  const [notification, setNotification] = useState({ title: "", body: "" });

  const loginInProgress = useRef(false); // Track if login is in progress

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
  //   const socket = new WebSocket(WS_URL);
  //   setWs(socket);

  //   socket.onopen = () => console.log("✅ Connected to WebSocket server");

  //   socket.onmessage = (event) => {
  //     console.log("📥 Received data:", event.data);
  //     // setTeachers(JSON.parse(event.data));
  //   };

  //   socket.onclose = () => console.log("🔴 Disconnected from WebSocket server");

  //   return () => socket.close();
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
      // Force fresh sign-in flow
      await signOut(auth);
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in successful:", result);

      const email = result.user.email;
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
          const userData = {
            role: data.role,
            uid: data.user.uid,
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
          };
          console.log("user authenticated successfully:", userData);
          // ✅ Store user in localStorage
          localStorage.setItem("token", idToken);
          localStorage.setItem("role", userData.role);
          localStorage.setItem("firebaseUser", JSON.stringify(userData));
          if (userData.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
          setUser(userData);
        } else {
          setError("Authentication failed: " + response.data.message);
        }
      } catch (err) {
        console.error("Error during token verification:", err.response?.data || err.message || err);
        setError("Error verifying token with backend.");
      }
    } catch (err) {
      console.error("Error during login:", err.code, err.message);
      setError(`An error occurred during login: ${err.message || err}`);
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
              <h1 id="appName">Mayoor</h1>
            </div>

            <input id="SignIn" type="button" value="Sign in with Google" onClick={handleLogin} />
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          </div>
        {/* )} */}
      </div>
    </Wrapper>
  );
};

export default Login;

