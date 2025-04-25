import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f0f8ff;
  background-image: linear-gradient(to bottom, #f0f8ff, #e6f3ff);
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
    left: 0;
    right: 0;
    height: 6px;
    background: url("data:image/svg+xml,%3Csvg width='100' height='6' viewBox='0 0 100 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 3 Q 25 0, 50 3 T 100 3' stroke='%231e88e5' fill='none' stroke-width='2'/%3E%3C/svg%3E")
      repeat-x;
    background-size: 100px 6px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #1e88e5;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #455a64;
  max-width: 850px;
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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(30, 136, 229, 0.1);
  transition: all 0.3s ease;
  background-color: white;
  position: relative;
  border: 1px solid rgba(30, 136, 229, 0.1);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 30px rgba(30, 136, 229, 0.2);
  }
`;

const PropertyImage = styled.div`
  height: 230px;
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
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const PropertyInfo = styled.div`
  padding: 1.8rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 1.8rem;
    right: 1.8rem;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(30, 136, 229, 0.3),
      transparent
    );
  }
`;

const PropertyTitle = styled.h3`
  margin-top: 0;
  color: #1e3a5f;
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PropertyPrice = styled.div`
  font-weight: 700;
  color: #1e88e5;
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
  color: #546e7a;
  font-size: 0.95rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(30, 136, 229, 0.1);
`;

const PropertyDetail = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: #1e88e5;
  }
`;

const BackButton = styled.button`
  background: rgba(30, 136, 229, 0.1);
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  color: #1e3a5f;

  &:hover {
    background: rgba(30, 136, 229, 0.2);
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
  background: ${(props) => props.color || "rgba(30, 136, 229, 0.85)"};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Malpe = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      title: "Beachfront Villa on St. Mary's Island",
      price: "2.4 Cr",
      image:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 5,
      baths: 4,
      area: "4200 sq ft",
      badge: "Beachfront",
      badgeColor: "rgba(30, 136, 229, 0.85)",
    },
    {
      id: 2,
      title: "Modern Beach House in Malpe Shore",
      price: "1.8 Cr",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3200 sq ft",
      badge: "Sea View",
      badgeColor: "rgba(25, 118, 210, 0.85)",
    },
    {
      id: 3,
      title: "Fishing Village Cottage",
      price: "95 Lakhs",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "2100 sq ft",
      badge: "Authentic",
      badgeColor: "rgba(245, 124, 0, 0.85)",
    },
    {
      id: 4,
      title: "Luxury Resort Villa with Private Pool",
      price: "3.5 Cr",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 6,
      baths: 5,
      area: "5200 sq ft",
      badge: "Luxury",
      badgeColor: "rgba(156, 39, 176, 0.85)",
    },
    {
      id: 5,
      title: "Modern Apartment with Harbor View",
      price: "1.1 Cr",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "1850 sq ft",
      badge: "Harbor View",
      badgeColor: "rgba(25, 118, 210, 0.85)",
    },
    {
      id: 6,
      title: "Cozy Beach Cabin",
      price: "78 Lakhs",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 2,
      baths: 1,
      area: "1200 sq ft",
    },
    {
      id: 7,
      title: "Fisherman's Wharf Penthouse",
      price: "1.6 Cr",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "2800 sq ft",
    },
    {
      id: 8,
      title: "Coastal Retreat with Garden",
      price: "1.4 Cr",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 3,
      area: "2600 sq ft",
      badge: "Garden",
      badgeColor: "rgba(76, 175, 80, 0.85)",
    },
    {
      id: 9,
      title: "Vacation Home near Delta Beach",
      price: "1.2 Cr",
      image:
        "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "2300 sq ft",
      badge: "Vacation",
      badgeColor: "rgba(255, 152, 0, 0.85)",
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
        <Title>Properties in Malpe</Title>
        <Description>
          Discover breathtaking coastal properties in Malpe, a pristine beach
          destination famous for its clear waters, golden sands, and stunning
          St. Mary's Island. Enjoy the perfect blend of seaside tranquility and
          vibrant local culture.
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

export default Malpe;
