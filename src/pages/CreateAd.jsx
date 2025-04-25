import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar"; // Import your Navbar component
import styled from "styled-components"; // Import styled-components

// Styled Components with improved professional styling
const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url("https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?t=st=1745009972~exp=1745013572~hmac=3ae77274ce7e1dd7102b8747df4a5493ba336047ef752af73da9b36f748b5715&w=1380");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 0 0 4rem 0;
`;

const CreateContainer = styled.div`
  padding: 2rem;
  margin-top: 1rem;
`;

const CreateWrapper = styled.div`
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

const CreateForm = styled.form`
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

const CreateInputGrp = styled.div`
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const CreateInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const CreateInputButton = styled.button`
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

const CreateInputSelect = styled.select`
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

const CreateInputText = styled.input`
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

const CreateInputNumber = styled(CreateInputText).attrs({ type: "number" })``;

const InputFileWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;
`;

const CreateInputFile = styled.input`
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

const CreateInputSelectedFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const CreateInputSelectedImageWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CreateInputSelectedImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
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

const CreateButton = styled.button`
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
`;

const CreateAd = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const isMounted = useRef(true);

  const [loading, setLoading] = useState(false);
  const [cloudinaryPreviewUrls, setCloudinaryPreviewUrls] = useState([]);
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
    images: {},
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

  useEffect(() => {
    if (isMounted.current) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData((prev) => ({ ...prev, userRef: user.uid }));
        } else {
          navigate("/sign-in");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [auth, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (discountedPrice >= regularPrice) {
      toast.error("Discounted price must be less than regular price");
      setLoading(false);
      return;
    }

    if (images.length > 6) {
      toast.error("Maximum 6 images allowed");
      setLoading(false);
      return;
    }

    try {
      const uploadedImageUrls = await Promise.all(
        [...images].map(async (image) => {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "ml_default"); // your Cloudinary unsigned preset

          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dmu7j8wov/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          const file = await res.json();

          if (!res.ok) {
            throw new Error(file?.error?.message || "Image upload failed");
          }

          return file.secure_url;
        })
      );

      // Set Cloudinary preview URLs in state
      setCloudinaryPreviewUrls(uploadedImageUrls);

      const formDataCopy = {
        ...formData,
        imageUrls: uploadedImageUrls,
        location: address,
        timestamp: serverTimestamp(),
      };

      delete formDataCopy.images;
      delete formDataCopy.address;
      !formDataCopy.offer && delete formDataCopy.discountedPrice;

      const docRef = await addDoc(collection(db, "houses"), formDataCopy);

      toast.success("Property listing created successfully!");
      navigate(`/house/${docRef.id}`);
    } catch (error) {
      toast.error("Image upload or data saving failed");
      console.error(error);
    }

    setLoading(false);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") boolean = true;
    if (e.target.value === "false") boolean = false;

    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) return <Spinner />;

  return (
    <PageContainer>
      <Navbar /> {/* Your navigation bar component */}
      <CreateContainer>
        <CreateWrapper>
          <PageTitle>List Your Property</PageTitle>
          <CreateForm onSubmit={onSubmit}>
            {/* Property Intent Section */}
            <FormSection>
              <SectionTitle>Property Intent</SectionTitle>
              <CreateInputGrp>
                <InputLabel>Do you want to sell or rent?</InputLabel>
                <CreateInputWrapper>
                  <CreateInputButton
                    active={forType === "sale"}
                    type="button"
                    id="forType"
                    value="sale"
                    onClick={onMutate}
                  >
                    Sell
                  </CreateInputButton>
                  <CreateInputButton
                    active={forType === "rent"}
                    type="button"
                    id="forType"
                    value="rent"
                    onClick={onMutate}
                  >
                    Rent
                  </CreateInputButton>
                </CreateInputWrapper>
              </CreateInputGrp>
            </FormSection>

            {/* Property Details Section */}
            <FormSection>
              <SectionTitle>Property Details</SectionTitle>
              <CreateInputGrp>
                <InputLabel>Property Type</InputLabel>
                <CreateInputSelect
                  id="type"
                  value={type}
                  onChange={onMutate}
                  required
                >
                  <option value="">--Select Property Type--</option>
                  <option value="mansion">Mansion</option>
                  <option value="family">Family Home</option>
                  <option value="condo">Condominium</option>
                  <option value="island">Private Island</option>
                  <option value="tiny-house">Tiny House</option>
                  <option value="tree-house">Tree House</option>
                </CreateInputSelect>
              </CreateInputGrp>

              <CreateInputGrp>
                <InputLabel>Property Name</InputLabel>
                <CreateInputText
                  type="text"
                  id="name"
                  value={name}
                  onChange={onMutate}
                  placeholder="Enter a descriptive title for your property"
                  required
                />
              </CreateInputGrp>

              <TwoColumnLayout>
                <ColumnHalf>
                  <CreateInputGrp>
                    <InputLabel>Bedrooms</InputLabel>
                    <CreateInputNumber
                      id="bedrooms"
                      value={bedrooms}
                      onChange={onMutate}
                      min="1"
                      required
                    />
                  </CreateInputGrp>
                </ColumnHalf>
                <ColumnHalf>
                  <CreateInputGrp>
                    <InputLabel>Bathrooms</InputLabel>
                    <CreateInputNumber
                      id="bathrooms"
                      value={bathrooms}
                      onChange={onMutate}
                      min="1"
                      required
                    />
                  </CreateInputGrp>
                </ColumnHalf>
              </TwoColumnLayout>

              <CreateInputGrp>
                <InputLabel>Furnished</InputLabel>
                <CreateInputWrapper>
                  <CreateInputButton
                    active={furnished}
                    type="button"
                    id="furnished"
                    value={true}
                    onClick={onMutate}
                  >
                    Yes
                  </CreateInputButton>
                  <CreateInputButton
                    active={!furnished}
                    type="button"
                    id="furnished"
                    value={false}
                    onClick={onMutate}
                  >
                    No
                  </CreateInputButton>
                </CreateInputWrapper>
              </CreateInputGrp>
            </FormSection>

            {/* Location Section */}
            <FormSection>
              <SectionTitle>Location</SectionTitle>
              <CreateInputGrp>
                <InputLabel>Address</InputLabel>
                <CreateInputText
                  type="text"
                  id="address"
                  value={address}
                  onChange={onMutate}
                  placeholder="Enter the full property address"
                  required
                />
              </CreateInputGrp>

              <TwoColumnLayout>
                <ColumnHalf>
                  <CreateInputGrp>
                    <InputLabel>Latitude</InputLabel>
                    <CreateInputNumber
                      id="latitude"
                      value={latitude}
                      onChange={onMutate}
                      step="0.000001"
                      required
                    />
                  </CreateInputGrp>
                </ColumnHalf>
                <ColumnHalf>
                  <CreateInputGrp>
                    <InputLabel>Longitude</InputLabel>
                    <CreateInputNumber
                      id="longitude"
                      value={longitude}
                      onChange={onMutate}
                      step="0.000001"
                      required
                    />
                  </CreateInputGrp>
                </ColumnHalf>
              </TwoColumnLayout>
            </FormSection>

            {/* Pricing Section */}
            <FormSection>
              <SectionTitle>Pricing</SectionTitle>
              <CreateInputGrp>
                <InputLabel>
                  Regular Price {forType === "rent" ? "($ / month)" : "($)"}
                </InputLabel>
                <CreateInputNumber
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onMutate}
                  min="1"
                  required
                />
              </CreateInputGrp>

              <CreateInputGrp>
                <InputLabel>Offer Special Discount?</InputLabel>
                <CreateInputWrapper>
                  <CreateInputButton
                    active={offer}
                    type="button"
                    id="offer"
                    value={true}
                    onClick={onMutate}
                  >
                    Yes
                  </CreateInputButton>
                  <CreateInputButton
                    active={!offer}
                    type="button"
                    id="offer"
                    value={false}
                    onClick={onMutate}
                  >
                    No
                  </CreateInputButton>
                </CreateInputWrapper>
              </CreateInputGrp>

              {offer && (
                <CreateInputGrp>
                  <InputLabel>
                    Discounted Price{" "}
                    {forType === "rent" ? "($ / month)" : "($)"}
                  </InputLabel>
                  <CreateInputNumber
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={onMutate}
                    min="1"
                    required
                  />
                </CreateInputGrp>
              )}
            </FormSection>

            {/* Images Section */}
            <FormSection>
              <SectionTitle>Images</SectionTitle>
              <CreateInputGrp>
                <InputLabel>Upload Property Images (Max 6)</InputLabel>
                <InputFileWrapper>
                  <CreateInputFile
                    type="file"
                    id="images"
                    onChange={onMutate}
                    accept="image/*"
                    multiple
                    required
                  />
                </InputFileWrapper>
                <CreateInputSelectedFiles>
                  {cloudinaryPreviewUrls.map((url, index) => (
                    <CreateInputSelectedImageWrapper key={index}>
                      <CreateInputSelectedImage
                        src={url}
                        alt={`uploaded-${index}`}
                      />
                    </CreateInputSelectedImageWrapper>
                  ))}
                </CreateInputSelectedFiles>
              </CreateInputGrp>
            </FormSection>

            <CreateButton type="submit">Create Property Listing</CreateButton>
          </CreateForm>
        </CreateWrapper>
      </CreateContainer>
    </PageContainer>
  );
};

export default CreateAd;
