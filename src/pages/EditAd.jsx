import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import your Navbar component

// Styled Components with improved professional styling
const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url("https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?t=st=1745009972~exp=1745013572~hmac=3ae77274ce7e1dd7102b8747df4a5493ba336047ef752af73da9b36f748b5715&w=1380");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 0 0 4rem 0;
`;

const EditContainer = styled.div`
  padding: 2rem;
  margin-top: 1rem;
`;

const EditWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const SectionTitle = styled.h3`
  color: #34495e;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const EditInputGrp = styled.div`
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const EditInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const EditInputButton = styled.button`
  background-color: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.active ? "#ffffff" : "#7f8c8d")};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    background-color: ${(props) => (props.active ? "#2980b9" : "#bdc3c7")};
  }
`;

const EditInputSelect = styled.select`
  padding: 0.75rem;
  width: 100%;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  background-color: #f5f6fa;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const EditInputText = styled.input`
  padding: 0.75rem;
  width: 100%;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  background-color: #f5f6fa;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const EditInputNumber = styled(EditInputText).attrs({ type: "number" })``;

const InputFileWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;
`;

const EditInputFile = styled.input`
  padding: 0.75rem;
  width: 100%;
  background-color: #f5f6fa;
  border: 2px dashed #dcdde1;
  border-radius: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const EditInputSelectedFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const EditInputSelectedImageWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
`;

const EditInputSelectedImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ImageTitle = styled.p`
  text-align: center;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  color: #34495e;
`;

const TwoColumnLayout = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ColumnHalf = styled.div`
  flex: 1;
`;

const EditButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #2ecc71;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(46, 204, 113, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

const EditAd = () => {
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const isMounted = useRef(true);

  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState(false);
  const [formData, setFormData] = useState({
    forType: "sale",
    type: "",
    name: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    latitude: 0,
    longitude: 0,
  });

  const {
    forType,
    type,
    name,
    address,
    bedrooms,
    bathrooms,
    furnished,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  // Redirect if house is not user's
  useEffect(() => {
    if (house && house.userRef !== auth.currentUser.uid) {
      toast.error("You cannot edit this house");
      navigate("/");
    }
  });

  // Fetch house to edit
  useEffect(() => {
    setLoading(true);
    const fetchHouse = async () => {
      const docRef = doc(db, "houses", params.houseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHouse(docSnap.data());
        setFormData({ ...docSnap.data(), address: docSnap.data().location });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("House does not exist");
      }
    };

    fetchHouse();
  }, [params.houseId, navigate]);

  // Sets userRef to logged in user
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData((prevState) => ({
            ...prevState,
            userRef: user.uid,
          }));
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted, auth, navigate]);

  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmu7j8wov/image/upload",
        formData
      );
      return response.data.secure_url; // Get the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price must be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("You can upload a maximum of 6 images");
      return;
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => uploadImageToCloudinary(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      latitude,
      longitude,
      timestamp: serverTimestamp(),
    };

    formDataCopy.location = address;
    delete formDataCopy.images;
    delete formDataCopy.address;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = doc(db, "houses", params.houseId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Property listing updated successfully");
    navigate(`/`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") boolean = true;
    if (e.target.value === "false") boolean = false;

    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) return <Spinner />;

  return (
    <PageContainer>
      <Navbar /> {/* Your navigation bar component */}
      <EditContainer>
        <EditWrapper>
          <PageTitle>Edit Property Listing</PageTitle>
          <EditForm onSubmit={onSubmit}>
            {/* Property Intent Section */}
            <FormSection>
              <SectionTitle>Property Intent</SectionTitle>
              <EditInputGrp>
                <InputLabel>Do you want to sell or rent?</InputLabel>
                <EditInputWrapper>
                  <EditInputButton
                    active={forType === "sale"}
                    type="button"
                    id="forType"
                    value="sale"
                    onClick={onMutate}
                  >
                    Sell
                  </EditInputButton>
                  <EditInputButton
                    active={forType === "rent"}
                    type="button"
                    id="forType"
                    value="rent"
                    onClick={onMutate}
                  >
                    Rent
                  </EditInputButton>
                </EditInputWrapper>
              </EditInputGrp>
            </FormSection>

            {/* Property Details Section */}
            <FormSection>
              <SectionTitle>Property Details</SectionTitle>
              <EditInputGrp>
                <InputLabel>Property Type</InputLabel>
                <EditInputSelect
                  id="type"
                  value={type}
                  onChange={onMutate}
                  required
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                </EditInputSelect>
              </EditInputGrp>

              <EditInputGrp>
                <InputLabel>Property Name</InputLabel>
                <EditInputText
                  type="text"
                  id="name"
                  value={name}
                  onChange={onMutate}
                  placeholder="Enter a descriptive title for your property"
                  required
                />
              </EditInputGrp>

              <TwoColumnLayout>
                <ColumnHalf>
                  <EditInputGrp>
                    <InputLabel>Bedrooms</InputLabel>
                    <EditInputNumber
                      id="bedrooms"
                      value={bedrooms}
                      onChange={onMutate}
                      min="1"
                      required
                    />
                  </EditInputGrp>
                </ColumnHalf>
                <ColumnHalf>
                  <EditInputGrp>
                    <InputLabel>Bathrooms</InputLabel>
                    <EditInputNumber
                      id="bathrooms"
                      value={bathrooms}
                      onChange={onMutate}
                      min="1"
                      required
                    />
                  </EditInputGrp>
                </ColumnHalf>
              </TwoColumnLayout>

              <EditInputGrp>
                <InputLabel>Furnished</InputLabel>
                <EditInputWrapper>
                  <EditInputButton
                    active={furnished === true}
                    type="button"
                    id="furnished"
                    value="true"
                    onClick={onMutate}
                  >
                    Yes
                  </EditInputButton>
                  <EditInputButton
                    active={furnished === false}
                    type="button"
                    id="furnished"
                    value="false"
                    onClick={onMutate}
                  >
                    No
                  </EditInputButton>
                </EditInputWrapper>
              </EditInputGrp>
            </FormSection>

            {/* Location Section */}
            <FormSection>
              <SectionTitle>Location</SectionTitle>
              <EditInputGrp>
                <InputLabel>Address</InputLabel>
                <EditInputText
                  type="text"
                  id="address"
                  value={address}
                  onChange={onMutate}
                  placeholder="Enter the full property address"
                  required
                />
              </EditInputGrp>

              <TwoColumnLayout>
                <ColumnHalf>
                  <EditInputGrp>
                    <InputLabel>Latitude</InputLabel>
                    <EditInputNumber
                      id="latitude"
                      value={latitude}
                      onChange={onMutate}
                      step="0.000001"
                      required
                    />
                  </EditInputGrp>
                </ColumnHalf>
                <ColumnHalf>
                  <EditInputGrp>
                    <InputLabel>Longitude</InputLabel>
                    <EditInputNumber
                      id="longitude"
                      value={longitude}
                      onChange={onMutate}
                      step="0.000001"
                      required
                    />
                  </EditInputGrp>
                </ColumnHalf>
              </TwoColumnLayout>
            </FormSection>

            {/* Pricing Section */}
            <FormSection>
              <SectionTitle>Pricing</SectionTitle>
              <EditInputGrp>
                <InputLabel>Offer Special Discount?</InputLabel>
                <EditInputWrapper>
                  <EditInputButton
                    active={offer === true}
                    type="button"
                    id="offer"
                    value="true"
                    onClick={onMutate}
                  >
                    Yes
                  </EditInputButton>
                  <EditInputButton
                    active={offer === false}
                    type="button"
                    id="offer"
                    value="false"
                    onClick={onMutate}
                  >
                    No
                  </EditInputButton>
                </EditInputWrapper>
              </EditInputGrp>

              <EditInputGrp>
                <InputLabel>
                  Regular Price {forType === "rent" ? "($ / month)" : "($)"}
                </InputLabel>
                <EditInputNumber
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onMutate}
                  min="1"
                  required
                />
              </EditInputGrp>

              {offer && (
                <EditInputGrp>
                  <InputLabel>
                    Discounted Price{" "}
                    {forType === "rent" ? "($ / month)" : "($)"}
                  </InputLabel>
                  <EditInputNumber
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={onMutate}
                    min="1"
                    required
                  />
                </EditInputGrp>
              )}
            </FormSection>

            {/* Images Section */}
            <FormSection>
              <SectionTitle>Images</SectionTitle>
              <EditInputGrp>
                <InputLabel>Upload Property Images (Max 6)</InputLabel>
                <InputFileWrapper>
                  <EditInputFile
                    type="file"
                    id="images"
                    onChange={onMutate}
                    accept=".jpg,.png,.jpeg"
                    multiple
                  />
                </InputFileWrapper>
                <EditInputSelectedFiles>
                  {images &&
                    [...images].map((image, index) => (
                      <EditInputSelectedImageWrapper key={index}>
                        <EditInputSelectedImage
                          src={URL.createObjectURL(image)}
                          alt={`image-${index}`}
                        />
                        <ImageTitle>Image {index + 1}</ImageTitle>
                      </EditInputSelectedImageWrapper>
                    ))}
                </EditInputSelectedFiles>
              </EditInputGrp>
            </FormSection>

            <EditButton type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Property Listing"}
            </EditButton>
          </EditForm>
        </EditWrapper>
      </EditContainer>
    </PageContainer>
  );
};

export default EditAd;
