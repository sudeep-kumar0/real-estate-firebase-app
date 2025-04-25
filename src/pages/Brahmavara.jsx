import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f7fa;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
  padding-bottom: 2.5rem;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 3px;
    background: linear-gradient(135deg, #43a047, #66bb6a);
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(135deg, #66bb6a, #81c784);
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  color: #2e7d32;
  margin-bottom: 1.2rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #455a64;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 2rem;
`;

const PropertyCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  background-color: white;
  position: relative;

  &:hover {
    transform: translateY(-12px) scale(1.01);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const PropertyImage = styled.div`
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
  }
`;

const PropertyInfo = styled.div`
  padding: 2rem;
  position: relative;
`;

const PropertyTitle = styled.h3`
  margin-top: 0;
  color: #1b5e20;
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PropertyPrice = styled.div`
  font-weight: 700;
  color: #2e7d32;
  font-size: 1.5rem;
  margin: 0.6rem 0;
  display: flex;
  align-items: center;

  &:before {
    content: "₹";
    margin-right: 4px;
    font-size: 0.9em;
  }
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.4rem;
  color: #546e7a;
  font-size: 0.95rem;
  border-top: 1px solid #e0f2f1;
  padding-top: 1.4rem;
`;

const PropertyDetail = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: #43a047;
  }
`;

const BackButton = styled.button`
  background: #e8f5e9;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #2e7d32;
  transition: all 0.2s ease;

  &:hover {
    background: #c8e6c9;
    transform: translateX(-5px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${(props) => props.color || "rgba(46, 125, 50, 0.85)"};
  color: white;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const Brahamvara = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      title: "Waterfront Villa with Paddy Field View",
      price: "1.5 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3800 sq ft",
      badge: "Waterfront",
      badgeColor: "rgba(3, 155, 229, 0.85)",
    },
    {
      id: 2,
      title: "Heritage Home with Spice Garden",
      price: "1.8 Cr",
      image:
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 5,
      baths: 4,
      area: "4200 sq ft",
      badge: "Heritage",
      badgeColor: "rgba(121, 85, 72, 0.85)",
    },
    {
      id: 3,
      title: "Modern Family House near Temple",
      price: "1.1 Cr",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 3,
      area: "2900 sq ft",
      badge: "Temple View",
      badgeColor: "rgba(175, 180, 43, 0.85)",
    },
    {
      id: 4,
      title: "Lakeside Property with Garden",
      price: "1.4 Cr",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3400 sq ft",
      badge: "Lakeside",
      badgeColor: "rgba(3, 155, 229, 0.85)",
    },
    {
      id: 5,
      title: "Compact Home in Town Center",
      price: "85 Lakhs",
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "1800 sq ft",
      badge: "Central",
      badgeColor: "rgba(121, 85, 72, 0.85)",
    },
    {
      id: 6,
      title: "Luxury Villa with Coconut Grove",
      price: "1.7 Cr",
      image:
        "https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 4,
      area: "3900 sq ft",
      badge: "Premium",
      badgeColor: "rgba(46, 125, 50, 0.85)",
    },
    {
      id: 7,
      title: "Traditional Bungalow with Courtyard",
      price: "1.3 Cr",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3100 sq ft",
      badge: "Traditional",
      badgeColor: "rgba(121, 85, 72, 0.85)",
    },
    {
      id: 8,
      title: "Riverfront Property with Boat Access",
      price: "1.6 Cr",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3600 sq ft",
      badge: "Riverfront",
      badgeColor: "rgba(3, 155, 229, 0.85)",
    },
    {
      id: 9,
      title: "Solar-Powered Eco Home",
      price: "1.2 Cr",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 3,
      area: "2800 sq ft",
      badge: "Eco-friendly",
      badgeColor: "rgba(46, 125, 50, 0.85)",
    },
  ];

  return (
    <PageContainer>
      <BackButton onClick={() => navigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
        Back to Locations
      </BackButton>

      <Header>
        <Title>Properties in Brahamavara</Title>
        <Description>
          Explore tranquil living spaces in Brahamavara, a cultural gem of
          coastal Karnataka featuring ancient temples, scenic backwaters, and
          verdant landscapes. Experience the perfect blend of traditional
          coastal charm and contemporary comfort in this serene locale.
        </Description>
      </Header>

      <PropertyGrid>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            onClick={() => navigate(`/house/${property.id}`)}
          >
            {property.badge && (
              <Badge color={property.badgeColor}>{property.badge}</Badge>
            )}
            <PropertyImage
              style={{ backgroundImage: `url(${property.image})` }}
            />
            <PropertyInfo>
              <PropertyTitle>{property.title}</PropertyTitle>
              <PropertyPrice>{property.price}</PropertyPrice>
              <PropertyDetails>
                <PropertyDetail>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                    <path d="M9 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                  {property.beds} Beds
                </PropertyDetail>
                <PropertyDetail>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm-7 7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  </svg>
                  {property.baths} Baths
                </PropertyDetail>
                <PropertyDetail>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                  {property.area}
                </PropertyDetail>
              </PropertyDetails>
            </PropertyInfo>
          </PropertyCard>
        ))}
      </PropertyGrid>
    </PageContainer>
  );
};

export default Brahamvara;
