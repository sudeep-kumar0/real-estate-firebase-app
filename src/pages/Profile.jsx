import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import ProfileHouseItem from "../components/ProfileHouseItem";
import { FaUser, FaEdit, FaHome, FaEnvelope, FaPlus } from "react-icons/fa";

// Color palette
const colors = {
  primary: "#2C3E50",
  secondary: "#3498DB",
  accent: "#1ABC9C",
  light: "#ECF0F1",
  dark: "#34495E",
  purple: "#9B59B6",
  lightGray: "#F8F9FA",
  mediumGray: "#E9ECEF",
  darkGray: "#6C757D",
  white: "#FFFFFF",
};

const ProfileContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(
            135deg,
            rgba(41, 128, 185, 0.15) 0%,
            rgba(142, 68, 173, 0.15) 100%
        ),
        url("https://img.freepik.com/free-photo/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product_1258-108224.jpg?t=st=1745010780~exp=1745014380~hmac=dd3773bd1338e7c1f9b258887a25680fc1be6beaee591d61a75c7f0194abfc3f&w=1380");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    padding: 80px 0 40px; /* Added top padding to fix nav bar overlap */
    position: relative;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`;

const ProfileWrapper = styled.div`
  padding: 0 25px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 992px) {
    width: 90%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ProfileSection = styled.div`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  margin-bottom: 40px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #9b59b6, #3498db);
  }
`;

const ProfileAvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  background-image: linear-gradient(to right, #2c3e50, #4a69bd);
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
    z-index: 1;
    pointer-events: none;
  }
`;

const ProfileAvatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid ${colors.white};
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  color: ${colors.white};
  margin-top: 15px;
  font-size: 1.6rem;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProfileEmail = styled.p`
  color: ${colors.lightGray};
  font-size: 1rem;
  margin-top: 5px;
  opacity: 0.9;
`;

const ProfileAccountHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid ${colors.mediumGray};

  h2 {
    font-weight: 600;
    font-size: 1.2rem;
    color: ${colors.primary};
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
      color: ${colors.purple};
    }
  }
`;

const ProfileEditBtn = styled.button`
  padding: 10px 24px;
  background: linear-gradient(to right, #9b59b6, #8e44ad);
  color: ${colors.white};
  border: none;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(to right, #8e44ad, #9b59b6);
  }

  svg {
    margin-right: 8px;
  }
`;

const ProfileAccountForm = styled.form`
  padding: 25px;
  width: 100%;
`;

const ProfileInputGrp = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;

  label {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 8px;
    color: ${colors.darkGray};
    font-weight: 500;
  }

  input {
    width: 100%;
    border: 1px solid ${colors.mediumGray};
    font-size: 1rem;
    padding: 12px 15px 12px 42px;
    border-radius: 8px;
    background-color: ${(props) =>
      props.disabled ? colors.lightGray : colors.white};
    color: ${colors.primary};
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:focus {
      border-color: ${colors.purple};
      outline: none;
      box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
    }

    &:disabled {
      color: ${colors.darkGray};
      cursor: not-allowed;
    }
  }
`;

const InputIcon = styled.div`
  position: absolute;
  top: 38px;
  left: 14px;
  color: ${colors.darkGray};
`;

const CreateAdButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 40px;
`;

const ProfileCreateBtn = styled(Link)`
  padding: 14px 32px;
  background: linear-gradient(to right, #3498db, #1abc9c);
  color: ${colors.white};
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 15px rgba(52, 152, 219, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 20px rgba(52, 152, 219, 0.4);
  }

  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const ProfileCurrentAds = styled.div`
  width: 100%;
  padding: 0 25px 25px;
`;

const NoAdsMessage = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
  color: ${colors.darkGray};
  font-size: 1.1rem;

  p {
    margin-bottom: 20px;
  }
`;

const PropertiesSectionHeader = styled.div`
  padding: 30px 25px 10px;
  text-align: center;

  h3 {
    font-size: 1.4rem;
    color: ${colors.primary};
    font-weight: 600;
    margin-bottom: 15px;
    position: relative;
    display: inline-block;

    &:after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, #3498db, #1abc9c);
      border-radius: 3px;
    }
  }

  p {
    color: ${colors.darkGray};
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;


const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-left-color: ${colors.secondary};
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  // Generate a consistent cartoon avatar based on email
  const cartoonAvatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${email}`;

  const [changeInfo, setChangeInfo] = useState(false);

  useEffect(() => {
    const fetchUserHouses = async () => {
      const housesRef = collection(db, "houses");
      const q = query(
        housesRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);

      let houses = [];

      querySnap.forEach((doc) => {
        return houses.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setHouses(houses);
      setLoading(false);
    };

    fetchUserHouses();
  }, [auth.currentUser.uid]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update displayName in Firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in Firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });

        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onDelete = async (houseId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "houses", houseId));
      const updatedHouses = houses.filter((house) => {
        return house.id !== houseId;
      });
      setHouses(updatedHouses);
      toast.success("Successfully deleted house");
    }
  };

  const onEdit = (houseId) => navigate(`/edit/${houseId}`);

  return (
    <ProfileContainer>
      <ProfileWrapper>
        <ProfileSection>
          <ProfileAvatarSection>
            <ProfileAvatar>
              <AvatarImage src={cartoonAvatar} alt="User Avatar" />
            </ProfileAvatar>
            <ProfileName>{name || "User"}</ProfileName>
            <ProfileEmail>{email}</ProfileEmail>
          </ProfileAvatarSection>

          <ProfileAccountHeader>
            <h2>
              <FaUser /> Account Details
            </h2>
            <ProfileEditBtn
              onClick={() => {
                changeInfo && handleSubmit();
                setChangeInfo((prevState) => !prevState);
              }}
            >
              <FaEdit /> {changeInfo ? "Save" : "Edit"}
            </ProfileEditBtn>
          </ProfileAccountHeader>

          <ProfileAccountForm>
            <ProfileInputGrp>
              <label htmlFor="name">Full Name</label>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeInfo}
                onChange={handleChange}
              />
            </ProfileInputGrp>
            <ProfileInputGrp disabled>
              <label htmlFor="email">Email Address</label>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <input
                type="email"
                id="email"
                value={email}
                disabled={true}
                onChange={handleChange}
              />
            </ProfileInputGrp>
          </ProfileAccountForm>
        </ProfileSection>

        <CreateAdButtonContainer>
          <ProfileCreateBtn to={"/create-ad"}>
            <FaPlus /> List Your Property
          </ProfileCreateBtn>
        </CreateAdButtonContainer>

        <ProfileSection>
          <ProfileAccountHeader>
            <h2>
              <FaHome /> Your Properties
            </h2>
          </ProfileAccountHeader>

          <PropertiesSectionHeader>
            <h3>Your Property Portfolio</h3>
            <p>Manage all your property listings in one place</p>
          </PropertiesSectionHeader>

          <ProfileCurrentAds>
            {loading ? (
              <LoadingSpinner>
                <div className="spinner"></div>
              </LoadingSpinner>
            ) : houses?.length > 0 ? (
              houses.map((house) => (
                <ProfileHouseItem
                  key={house.id}
                  house={house.data}
                  id={house.id}
                  onDelete={() => onDelete(house.id)}
                  onEdit={() => onEdit(house.id)}
                />
              ))
            ) : (
              <NoAdsMessage>
                <p>You don't have any properties listed yet.</p>
                <ProfileCreateBtn to={"/create-ad"}>
                  <FaPlus /> Create your first listing
                </ProfileCreateBtn>
              </NoAdsMessage>
            )}
          </ProfileCurrentAds>
        </ProfileSection>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default Profile;
