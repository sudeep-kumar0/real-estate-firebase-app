import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url("https://imgs.search.brave.com/Gw0jF9l36Wtqifx99sTde9zIhpkilPKBLJRIXeHzK-Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzAzLzkwLzA3/LzM2MF9GXzYwMzkw/MDcwNV9nNFhKMWJj/eU80T3Q2STVyVGVz/VE9TOWllcVI1UGtR/Ni5qcGc");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  color: #fff;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #4caf50, #2d6a4f);
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  &:before,
  &:after {
    content: "🏠";
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #fff;
  font-size: 1.5rem;
`;

const ErrorContainer = styled.div`
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff6b6b;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  border-left: 5px solid #ff6b6b;
`;

const HouseListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 20px;
`;

const HouseCard = styled.div`
  border-radius: 15px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const HouseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${HouseCard}:hover & {
    transform: scale(1.05);
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 1.2rem;
`;

const HouseDetails = styled.div`
  padding: 20px;
`;

const HouseTagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const HouseTag = styled.span`
  background-color: ${(props) => props.color || "#e9ecef"};
  color: ${(props) => props.textColor || "#212529"};
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const HouseName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #333;
`;

const HouseLocation = styled.div`
  color: #666;
  font-size: 1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;
`;

const LocationText = styled.div`
  flex: 1;
`;

const MapBox = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;
`;

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
`;

const NoLocationMap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  padding: 5px;
`;

const HousePrice = styled.div`
  color: #2d6a4f;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 5px;

  &:before {
    content: "💰";
    font-size: 1.3rem;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  margin: 15px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.span`
  font-weight: 600;
  color: #555;
  font-size: 0.95rem;
`;

const Value = styled.span`
  color: #666;
  background-color: #f8f9fa;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.95rem;
`;

const AllHouses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "houses"));
        const housesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHouses(housesList);
      } catch (err) {
        setError("Failed to load houses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  // Function to determine property type tag color
  const getTypeTagColor = (type) => {
    const typeColors = {
      apartment: { bg: "#e6f7ff", text: "#0072b5" },
      house: { bg: "#e6ffe6", text: "#008000" },
      villa: { bg: "#fff2e6", text: "#d86000" },
      condo: { bg: "#f5e6ff", text: "#6f00ff" },
      farmhouse: { bg: "#f5ffe6", text: "#5c8a00" },
      bungalow: { bg: "#ffe6e6", text: "#c00000" },
      penthouse: { bg: "#e6e6ff", text: "#0000a0" },
    };

    return (
      typeColors[type?.toLowerCase()] || { bg: "#e9ecef", text: "#495057" }
    );
  };

  // Function to determine for type tag color
  const getForTypeTagColor = (forType) => {
    const forTypeColors = {
      rent: { bg: "#fff2cc", text: "#8a6d00" },
      sale: { bg: "#d1e7dd", text: "#146c43" },
    };

    return (
      forTypeColors[forType?.toLowerCase()] || {
        bg: "#e9ecef",
        text: "#495057",
      }
    );
  };

  // Function to get emoji for property type
  const getTypeEmoji = (type) => {
    const typeEmojis = {
      apartment: "🏢",
      house: "🏠",
      villa: "🏘️",
      condo: "🏙️",
      farmhouse: "🏡",
      bungalow: "🏚️",
      penthouse: "🏨",
    };

    return typeEmojis[type?.toLowerCase()] || "🏠";
  };

  if (loading)
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingContainer>
            <span>Loading houses... 🔍</span>
          </LoadingContainer>
        </ContentWrapper>
      </PageContainer>
    );

  if (error)
    return (
      <PageContainer>
        <ContentWrapper>
          <PageHeader>
            <PageTitle>All Houses</PageTitle>
          </PageHeader>
          <ErrorContainer>
            <span role="img" aria-label="Error">
              ⚠️
            </span>{" "}
            {error}
          </ErrorContainer>
        </ContentWrapper>
      </PageContainer>
    );

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <PageTitle>All Houses</PageTitle>
        </PageHeader>

        <HouseListContainer>
          {houses.map((house) => (
            <HouseCard key={house.id}>
              <ImageContainer>
                {house.imageUrls?.length > 0 ? (
                  <HouseImage
                    src={house.imageUrls[0]}
                    alt={house.name || "House"}
                  />
                ) : (
                  <NoImage>
                    <span role="img" aria-label="No Image">
                      🖼️
                    </span>{" "}
                    No image available
                  </NoImage>
                )}
              </ImageContainer>

              <HouseDetails>
                <HouseTagsContainer>
                  {house.type && (
                    <HouseTag
                      color={getTypeTagColor(house.type).bg}
                      textColor={getTypeTagColor(house.type).text}
                    >
                      {getTypeEmoji(house.type)} {house.type}
                    </HouseTag>
                  )}

                  {house.forType && (
                    <HouseTag
                      color={getForTypeTagColor(house.forType).bg}
                      textColor={getForTypeTagColor(house.forType).text}
                    >
                      {house.forType === "rent" ? "🔄 For Rent" : "🏷️ For Sale"}
                    </HouseTag>
                  )}

                  {house.furnished && (
                    <HouseTag color="#e0f2f1" textColor="#00695c">
                      🪑 Furnished
                    </HouseTag>
                  )}
                </HouseTagsContainer>

                <HouseName>{house.name || "Unnamed House"}</HouseName>

                <LocationContainer>
                  <LocationText>
                    <HouseLocation>
                      📍 {house.location || "Unknown Location"}
                    </HouseLocation>
                  </LocationText>

                  {house.latitude && house.longitude ? (
                    <MapBox>
                      <StyledMapContainer
                        center={[house.latitude, house.longitude]}
                        zoom={13}
                        scrollWheelZoom={false}
                        zoomControl={false}
                        attributionControl={false}
                        dragging={false}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[house.latitude, house.longitude]} />
                      </StyledMapContainer>
                    </MapBox>
                  ) : (
                    <MapBox>
                      <NoLocationMap>
                        <span role="img" aria-label="Map">
                          🗺️
                        </span>{" "}
                        No map data
                      </NoLocationMap>
                    </MapBox>
                  )}
                </LocationContainer>

                <HousePrice>
                  ₹
                  {house.regularPrice
                    ? Number(house.regularPrice).toLocaleString("en-IN")
                    : "N/A"}
                  {house.offer && (
                    <HouseTag color="#ffebee" textColor="#c62828">
                      🔥 Offer!
                    </HouseTag>
                  )}
                </HousePrice>

                <Divider />

                <InfoGrid>
                  <InfoItem>
                    <Label>🛏️ Bedrooms:</Label>
                    <Value>{house.bedrooms ?? "N/A"}</Value>
                  </InfoItem>

                  <InfoItem>
                    <Label>🚿 Bathrooms:</Label>
                    <Value>{house.bathrooms ?? "N/A"}</Value>
                  </InfoItem>

                  {house.area && (
                    <InfoItem>
                      <Label>📐 Area:</Label>
                      <Value>{house.area} sq.ft</Value>
                    </InfoItem>
                  )}

                  {house.parking !== undefined && (
                    <InfoItem>
                      <Label>🚗 Parking:</Label>
                      <Value>{house.parking ? "Available" : "No"}</Value>
                    </InfoItem>
                  )}
                </InfoGrid>
              </HouseDetails>
            </HouseCard>
          ))}
        </HouseListContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AllHouses;
