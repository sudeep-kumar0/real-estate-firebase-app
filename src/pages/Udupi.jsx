import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f9fc;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
  padding-bottom: 2.5rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(135deg, #0b548e, #107ab3);
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #0b548e;
  margin-bottom: 1.2rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 2rem;
`;

const PropertyCard = styled.div`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  background-color: white;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
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
    height: 70px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  }
`;

const PropertyInfo = styled.div`
  padding: 1.8rem;
`;

const PropertyTitle = styled.h3`
  margin-top: 0;
  color: #222;
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PropertyPrice = styled.div`
  font-weight: 700;
  color: #0b548e;
  font-size: 1.4rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;

  &:before {
    content: "₹";
    margin-right: 2px;
    font-size: 0.9em;
  }
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
  color: #666;
  font-size: 0.95rem;
  border-top: 1px solid #eee;
  padding-top: 1.2rem;
`;

const PropertyDetail = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    color: #0b548e;
  }
`;

const BackButton = styled.button`
  background: #eef4f8;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  color: #333;

  &:hover {
    background: #dce7f0;
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
  background: ${(props) => props.color || "rgba(11, 84, 142, 0.85)"};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const Udupi = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      title: "Heritage Home near Sri Krishna Temple",
      price: "1.3 Cr",
      image:
        "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3100 sq ft",
      badge: "Heritage",
      badgeColor: "rgba(133, 77, 14, 0.85)",
    },
    {
      id: 2,
      title: "Modern Villa in Manipal Hills",
      price: "1.6 Cr",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 4,
      area: "3500 sq ft",
      badge: "Premium",
      badgeColor: "rgba(11, 84, 142, 0.85)",
    },
    {
      id: 3,
      title: "Student Apartment near Manipal University",
      price: "65 Lakhs",
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 2,
      baths: 2,
      area: "1200 sq ft",
      badge: "Students",
      badgeColor: "rgba(13, 110, 253, 0.85)",
    },
    {
      id: 4,
      title: "Riverside Bungalow in Kalyanpur",
      price: "1.8 Cr",
      image:
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3800 sq ft",
      badge: "Waterfront",
      badgeColor: "rgba(25, 135, 84, 0.85)",
    },
    {
      id: 5,
      title: "Contemporary House in Bannanje",
      price: "1.4 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 3,
      area: "2900 sq ft",
    },
    {
      id: 6,
      title: "Luxury Apartment in Town Center",
      price: "90 Lakhs",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "1800 sq ft",
    },
    {
      id: 7,
      title: "Eco-friendly Villa in Katapady",
      price: "1.9 Cr",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 4,
      area: "3700 sq ft",
      badge: "Eco-friendly",
      badgeColor: "rgba(25, 135, 84, 0.85)",
    },
    {
      id: 8,
      title: "Spacious Family Home in Brahmavar",
      price: "1.2 Cr",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3200 sq ft",
    },
    {
      id: 9,
      title: "Compact Flat in Kunjibettu",
      price: "58 Lakhs",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 2,
      baths: 1,
      area: "1150 sq ft",
      badge: "Best Value",
      badgeColor: "rgba(220, 53, 69, 0.85)",
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
        <Title>Properties in Udupi</Title>
        <Description>
          Explore premium real estate in Udupi, a charming coastal town renowned
          for its temples, educational institutions, and scenic landscapes. From
          heritage homes near the iconic Sri Krishna Temple to modern apartments
          near Manipal University.
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

export default Udupi;
