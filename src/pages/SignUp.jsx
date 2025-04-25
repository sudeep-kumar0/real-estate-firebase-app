import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import styled from "styled-components";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80");
  background-size: cover;
  background-position: center;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SignUpForm = styled.form`
  width: 400px;
  height: 580px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const SignUpHeader = styled.header`
  margin: 40px 0 20px;
  width: 100%;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: #333;
`;

const SignUpInputGrp = styled.div`
  width: 85%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 100%;
    border: 1px solid #ccc;
    font-size: 1rem;
    padding: 12px 15px;
    border-radius: 8px;
    transition: border 0.3s ease;

    &:focus {
      outline: none;
      border: 1px solid #ad34eb;
    }
  }
`;

const SignInPasswordWrapper = styled.div`
  width: 100%;
  font-size: 1rem;
  border-radius: 8px;
  position: relative;

  input {
    position: relative;
    width: 100%;
  }
`;

const SignInVisibilityImg = styled.img`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 10px;
  padding: 0.5rem;
`;

const SignUpButton = styled.button`
  width: 100%;
  background-color: #ad34eb;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9428cc;
  }
`;

const RedirectSignIn = styled(Link)`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: #555;
  margin-top: 12px;
  text-decoration: none;

  &:hover {
    color: #ad34eb;
  }
`;

const SignInBackIcon = styled(Link)`
  position: absolute;
  font-size: 2rem;
  top: 15px;
  right: 25px;
  color: #fff;
  text-decoration: none;
  font-weight: 900;

  &:hover {
    color: #ad34eb;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  margin: 10px 0;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
  }

  span {
    margin: 0 10px;
    color: #777;
    font-size: 0.9rem;
  }
`;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "This email is already registered"
          : "Something went wrong with registration";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <SignUpHeader>Create Account</SignUpHeader>

        <SignUpInputGrp>
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
        </SignUpInputGrp>

        <SignUpInputGrp>
          <input
            type="email"
            placeholder="Email Address"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
        </SignUpInputGrp>

        <SignUpInputGrp>
          <SignInPasswordWrapper>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={handleChange}
              required
              minLength="6"
            />

            <SignInVisibilityImg
              src={visibilityIcon}
              alt="show password"
              title="Show"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </SignInPasswordWrapper>
        </SignUpInputGrp>

        <SignUpInputGrp>
          <SignUpButton type="submit">
            {loading ? "Creating Account..." : "Sign Up"}
          </SignUpButton>
        </SignUpInputGrp>

        <OrDivider>
          <span>OR</span>
        </OrDivider>

        <OAuth />

        <SignUpInputGrp>
          <RedirectSignIn to={"/sign-in"}>
            Already have an account? Sign In
          </RedirectSignIn>
        </SignUpInputGrp>
      </SignUpForm>
      <SignInBackIcon to={"/"}>×</SignInBackIcon>
    </SignUpContainer>
  );
};

export default SignUp;
