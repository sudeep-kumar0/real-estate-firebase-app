import Spinner from "../components/Spinner";
import Slider from "../components/Slider";
import { BsFillShareFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { IoIosBed } from "react-icons/io";
import { MdBathtub } from "react-icons/md";

import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";

import styled from "styled-components";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  background-color: #f7f7f7;
`;

const Wrapper = styled.div`
  padding: 25px;
  max-width: 1200px;
  margin: 60px auto;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a3a3a;
  color: white;
  border-radius: 10px;
  padding: 15px 25px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
`;

const ShareButton = styled.div`
  background-color: ${({ copied }) => (copied ? "#ad34eb" : "#fff")};
  color: ${({ copied }) => (copied ? "#fff" : "#3a3a3a")};
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${({ copied }) => (copied ? "#ad34eb" : "#eee")};
  }
`;

const Address = styled.p`
  font-size: 1.2rem;
  color: #777;
  margin: 20px 0;
`;

const PriceSection = styled.div`
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: ${({ color }) => color || "#333"};
  font-weight: bold;
`;

const Rooms = styled.div`
  display: flex;
  gap: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 15px 0;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 25px 0;
`;

const Tag = styled(Link)`
  background-color: ${({ color }) => color || "#333"};
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  text-transform: capitalize;
`;

const ContactAgent = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  background-color: #ad34eb;
  color: white;
  padding: 10px 25px;
  border-radius: 20px;
  font-size: 1rem;
  text-align: center;
  width: fit-content;
`;

const MapSection = styled.div`
  margin-top: 40px;

  h2 {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }

  .map-wrapper {
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const HouseDetails = () => {
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const { houseId } = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const docRef = doc(db, "houses", houseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHouse(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
      setLoading(false);
    };

    fetchHouse();
  }, [houseId]);

  if (loading) return <Spinner />;

  return (
    <Container>
      {house && <Slider imgUrls={house.imgUrls} />}
      <Wrapper>
        <TopBar>
          <Title>{house?.name}</Title>
          <ShareButton
            copied={shareLinkCopied}
            title={shareLinkCopied ? "Link Copied" : "Copy Link"}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setShareLinkCopied(true);
              setTimeout(() => setShareLinkCopied(false), 3000);
            }}
          >
            {shareLinkCopied ? <GiCheckMark /> : <BsFillShareFill />}
          </ShareButton>
        </TopBar>

        <Address>{house?.location}</Address>

        <PriceSection>
          <Price>Price: ${house?.regularPrice.toLocaleString()}</Price>
          {house?.offer && (
            <>
              <Price color="#c30707">
                Discount: ${house?.regularPrice - house?.discountedPrice}
              </Price>
              <Price color="#ad34eb">
                Discounted: ${house?.discountedPrice.toLocaleString()}
              </Price>
            </>
          )}
        </PriceSection>

        <Rooms>
          <div>
            <IoIosBed />
            {house?.bedrooms > 1 ? `${house.bedrooms} Bedrooms` : "1 Bedroom"}
          </div>
          <div>
            <MdBathtub />
            {house?.bathrooms > 1
              ? `${house.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </div>
        </Rooms>

        <Tags>
          <Tag to={`/for-${house?.forType}`}>For {house?.forType}</Tag>
          <Tag color="#ad34eb" to={`/type/${house?.type}`}>
            {house?.type}
          </Tag>
          {house?.offer && (
            <Tag color="#842b2b" to="#">
              Offer
            </Tag>
          )}
          {house?.furnished && (
            <Tag color="#006321" to="#">
              Furnished
            </Tag>
          )}
        </Tags>

        {auth?.currentUser?.uid !== house?.userRef && (
          <ContactAgent
            to={`/contact/${house?.userRef}?listingName=${house?.name}`}
          >
            Contact Agent
          </ContactAgent>
        )}

        {house?.latitude && house?.longitude && (
          <MapSection>
            <h2>Location</h2>
            <div className="map-wrapper">
              <MapContainer
                center={[house.latitude, house.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                />
                <Marker position={[house.latitude, house.longitude]}>
                  <Popup>{house.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </MapSection>
        )}
      </Wrapper>
    </Container>
  );
};

export default HouseDetails;
