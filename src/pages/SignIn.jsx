import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import styled from "styled-components";
import OAuth from "../components/OAuth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInContainer = styled.div`
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

const SignInForm = styled.form`
  width: 400px;
  height: 550px; /* Increase this from 500px to 520px */
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const SignInHeader = styled.header`
  margin: 40px 0 20px;
  width: 100%;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: #333;
`;

const SignInInputGrp = styled.div`
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

const SingInPasswordWrapper = styled.div`
  width: 100%;
  font-size: 1rem;
  border-radius: 8px;
  position: relative;

  input {
    position: relative;
    width: 100%;
  }
`;

const SingInVisibilityImg = styled.img`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 10px;
  padding: 0.5rem;
`;

const SignInButton = styled.button`
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
  margin: 15px 0;
  padding: 10px 0;
  text-decoration: none;
  display: block;
  position: relative;

  &:hover {
    color: #ad34eb;
  }
`;
const SignUpBackIcon = styled(Link)`
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

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <SignInContainer>
      <SignInForm onSubmit={handleSubmit}>
        <SignInHeader>Welcome Back</SignInHeader>

        <SignInInputGrp>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
        </SignInInputGrp>

        <SignInInputGrp>
          <SingInPasswordWrapper>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={handleChange}
              required
            />

            <SingInVisibilityImg
              src={visibilityIcon}
              alt="show password"
              title="Show"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </SingInPasswordWrapper>
        </SignInInputGrp>

        <SignInInputGrp>
          <SignInButton type="submit">
            {loading ? "Please wait..." : "Sign In"}
          </SignInButton>
        </SignInInputGrp>

        <OrDivider>
          <span>OR</span>
        </OrDivider>

        <OAuth />

        <SignInInputGrp>
          <RedirectSignIn to={"/sign-up"}>
            Don't have an account? Sign Up
          </RedirectSignIn>
        </SignInInputGrp>
      </SignInForm>
      <SignUpBackIcon to={"/"}>×</SignUpBackIcon>
    </SignInContainer>
  );
};

export default SignIn;
