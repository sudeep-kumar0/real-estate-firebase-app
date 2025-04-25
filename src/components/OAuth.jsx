import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import GoogleIcon from "../assets/svg/googleIcon.svg";
import styled from "styled-components";

const GoogleButtonContainer = styled.div`
  margin: 10px 0;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px 15px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const GoogleIconImg = styled.img`
  width: 24px;
  height: 24px;
`;

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignUp = location.pathname === "/sign-up";

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // If user doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      // Silent error handling - removed toast.error
      console.log("Google auth error:", error);
      // Optionally still navigate home
      // navigate("/")
    }
  };

  return (
    <GoogleButtonContainer>
      <GoogleButton onClick={onGoogleClick} type="button">
        <GoogleIconImg src={GoogleIcon} alt="google" />
        Sign {isSignUp ? "up" : "in"} with Google
      </GoogleButton>
    </GoogleButtonContainer>
  );
};

export default OAuth;
