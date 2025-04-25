import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f5f1;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 2rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(135deg, #8d6e63, #a1887f);
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #5d4037;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: "Georgia", serif;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #6d4c41;
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
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  background-color: white;
  position: relative;
  border: 1px solid #e0e0e0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: #bcaaa4;
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
  border-top: 4px solid #8d6e63;
`;

const PropertyTitle = styled.h3`
  margin-top: 0;
  color: #3e2723;
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Georgia", serif;
`;

const PropertyPrice = styled.div`
  font-weight: 700;
  color: #5d4037;
  font-size: 1.4rem;
  margin: 0.5rem 0;
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
  margin-top: 1.2rem;
  color: #6d4c41;
  font-size: 0.95rem;
  border-top: 1px solid #eee;
  padding-top: 1.2rem;
`;

const PropertyDetail = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    color: #8d6e63;
  }
`;

const BackButton = styled.button`
  background: #efebe9;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #5d4037;
  transition: all 0.2s ease;

  &:hover {
    background: #d7ccc8;
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
  background: ${(props) => props.color || "rgba(93, 64, 55, 0.85)"};
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const Byndoor = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      title: "Rustic Farmhouse with Fruit Orchard",
      price: "1.3 Cr",
      image:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3800 sq ft",
      badge: "Farmhouse",
      badgeColor: "rgba(121, 85, 72, 0.85)",
    },
    {
      id: 2,
      title: "Riverside Plantation Home",
      price: "1.6 Cr",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 5,
      baths: 4,
      area: "4200 sq ft",
      badge: "Riverside",
      badgeColor: "rgba(33, 150, 243, 0.85)",
    },
    {
      id: 3,
      title: "Beach View Cottage in Coastal Area",
      price: "98 Lakhs",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "2100 sq ft",
      badge: "Beach View",
      badgeColor: "rgba(0, 150, 136, 0.85)",
    },
    {
      id: 4,
      title: "Heritage Home with Coconut Grove",
      price: "1.4 Cr",
      image:
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3500 sq ft",
      badge: "Heritage",
      badgeColor: "rgba(156, 39, 176, 0.85)",
    },
    {
      id: 5,
      title: "Traditional Home in Town Center",
      price: "85 Lakhs",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "2200 sq ft",
    },
    {
      id: 6,
      title: "Modern Country House with Garden",
      price: "1.2 Cr",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3100 sq ft",
      badge: "Garden",
      badgeColor: "rgba(76, 175, 80, 0.85)",
    },
    {
      id: 7,
      title: "Hill View Property with 2 Acres Land",
      price: "1.9 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 5,
      baths: 4,
      area: "4000 sq ft",
      badge: "Acreage",
      badgeColor: "rgba(121, 85, 72, 0.85)",
    },
    {
      id: 8,
      title: "Eco-friendly Home near Someshwara Temple",
      price: "1.1 Cr",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "2600 sq ft",
      badge: "Eco-friendly",
      badgeColor: "rgba(76, 175, 80, 0.85)",
    },
    {
      id: 9,
      title: "Coastal Retreat Near Ottinene Beach",
      price: "1.3 Cr",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 3,
      area: "2800 sq ft",
      badge: "Beach Access",
      badgeColor: "rgba(0, 150, 136, 0.85)",
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
        <Title>Properties in Byndoor</Title>
        <Description>
          Experience the rustic charm of Byndoor, a serene coastal town offering
          the perfect blend of natural beauty and traditional living. Discover
          properties nestled amidst lush greenery, with easy access to pristine
          beaches and scenic backwaters.
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

export default Byndoor;
