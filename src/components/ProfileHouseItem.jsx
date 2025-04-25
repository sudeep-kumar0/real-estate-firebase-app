import React from "react";
import styled from "styled-components";
import {
  MdEdit,
  MdDelete,
  MdLocationOn,
  MdHome,
  MdHotel,
  MdLocalOffer,
} from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Color palette
const colors = {
  primary: "#2C3E50",
  secondary: "#3498DB",
  accent: "#1ABC9C",
  light: "#ECF0F1",
  dark: "#34495E",
  success: "#27AE60",
  warning: "#F39C12",
  danger: "#E74C3C",
  text: "#2C3E50",
  lightGray: "#F8F9FA",
  mediumGray: "#E9ECEF",
  darkGray: "#6C757D",
};

// Styled components
const HouseItemContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #3498db, #1abc9c);
  }
`;

const HouseItemContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    width: 50%;
    height: 400px;
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PropertyInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 992px) {
    width: 50%;
    flex-direction: row;
  }
`;

const PropertyDetails = styled.div`
  flex: 1;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PropertyName = styled.h2`
  color: ${colors.primary};
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  line-height: 1.3;

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const PropertyLocation = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.darkGray};
  font-size: 1rem;
  margin-bottom: 20px;

  svg {
    margin-right: 8px;
    min-width: 18px;
    color: ${colors.secondary};
  }
`;

const PropertyPrice = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  color: ${colors.accent};
  margin-bottom: 18px;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.lightGray};
`;

const RoomsInfo = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const RoomDetail = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: ${colors.lightGray};
  border-radius: 30px;
  font-size: 0.95rem;
  color: ${colors.dark};
  font-weight: 500;

  svg {
    margin-right: 8px;
    color: ${colors.secondary};
  }

  @media screen and (max-width: 600px) {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
`;

const PropertyTags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
`;

const PropertyTag = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  border-radius: 30px;
  padding: 8px 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media screen and (max-width: 600px) {
    padding: 6px 14px;
    font-size: 0.85rem;
  }
`;

const ForTag = styled(PropertyTag)`
  background-color: ${colors.primary};
  color: white;
  text-transform: capitalize;
`;

const TypeTag = styled(PropertyTag)`
  background-color: ${colors.secondary};
  color: white;
  text-transform: capitalize;
`;

const OfferTag = styled(PropertyTag)`
  background-color: ${colors.warning};
  color: white;
`;

const FurnishedTag = styled(PropertyTag)`
  background-color: ${colors.success};
  color: white;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  padding: 15px 20px;
  border-left: 1px solid ${colors.mediumGray};

  @media screen and (max-width: 991px) {
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 25px 20px;
    border-left: none;
    border-top: 1px solid ${colors.mediumGray};
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background-color: ${colors.lightGray};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: rgba(52, 152, 219, 0.1);

  svg {
    color: ${colors.secondary};
  }

  &:hover {
    background-color: rgba(52, 152, 219, 0.2);
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: rgba(231, 76, 60, 0.1);

  svg {
    color: ${colors.danger};
  }

  &:hover {
    background-color: rgba(231, 76, 60, 0.2);
  }
`;

const LocationSection = styled.div`
  width: 100%;
  padding: 0 25px 25px;
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-top: 5px;

  h3 {
    font-size: 1.2rem;
    color: ${colors.primary};
    margin: 0;
    font-weight: 600;
  }

  svg {
    margin-right: 10px;
    color: ${colors.secondary};
  }
`;

const StyledMapContainer = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// ProfileHouseItem Component
const ProfileHouseItem = ({ house, id, onEdit, onDelete }) => {
  // Fallback image URL if house images are unavailable
  const fallbackImage = "https://example.com/default-image.jpg";

  const imgUrl =
    house.imageUrls && house.imageUrls.length > 0
      ? house.imageUrls[0]
      : fallbackImage;

  return (
    <HouseItemContainer>
      <HouseItemContent>
        <ImgWrapper>
          <PropertyImage src={imgUrl} alt={house.name} />
        </ImgWrapper>

        <PropertyInfoWrapper>
          <PropertyDetails>
            <div>
              <PropertyName>{house.name}</PropertyName>
              <PropertyLocation>
                <MdLocationOn size={18} /> {house.location}
              </PropertyLocation>

              <PropertyPrice>
                $
                {house.offer
                  ? house.discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : house.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {house.type === "rent" && " / Month"}
              </PropertyPrice>
            </div>

            <div>
              <RoomsInfo>
                <RoomDetail>
                  <FaBed size={16} />
                  {house.bedrooms > 1
                    ? `${house.bedrooms} Bedrooms`
                    : "1 Bedroom"}
                </RoomDetail>
                <RoomDetail>
                  <FaBath size={16} />
                  {house.bathrooms > 1
                    ? `${house.bathrooms} Bathrooms`
                    : "1 Bathroom"}
                </RoomDetail>
              </RoomsInfo>

              <PropertyTags>
                <ForTag to={`/for-${house.forType}`}>
                  <MdHome style={{ marginRight: "8px" }} /> For {house.forType}
                </ForTag>
                <TypeTag to={`/type/${house.type}`}>
                  <MdHotel style={{ marginRight: "8px" }} /> {house.type}
                </TypeTag>
                {house.offer && (
                  <OfferTag to={"/"}>
                    <MdLocalOffer style={{ marginRight: "8px" }} /> Offer
                  </OfferTag>
                )}
                {house.furnished && (
                  <FurnishedTag to={"/"}>Furnished</FurnishedTag>
                )}
              </PropertyTags>
            </div>
          </PropertyDetails>

          <ActionButtons>
            <EditButton onClick={() => onEdit(id)}>
              <MdEdit />
            </EditButton>
            <DeleteButton onClick={() => onDelete(id)}>
              <MdDelete />
            </DeleteButton>
          </ActionButtons>
        </PropertyInfoWrapper>
      </HouseItemContent>

      {house.latitude && house.longitude && (
        <LocationSection>
          <LocationHeader>
            <MdLocationOn size={22} />
            <h3>Location</h3>
          </LocationHeader>
          <StyledMapContainer>
            <MapContainer
              style={{ height: "100%", width: "100%" }}
              center={[house.latitude, house.longitude]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              />
              <Marker position={[house.latitude, house.longitude]}>
                <Popup>{house.location}</Popup>
              </Marker>
            </MapContainer>
          </StyledMapContainer>
        </LocationSection>
      )}
    </HouseItemContainer>
  );
};

export default ProfileHouseItem;
