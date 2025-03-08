import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #0a6cad;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 2rem;
`;

const PropertyCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const PropertyImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
`;

const PropertyInfo = styled.div`
  padding: 1.5rem;
`;

const PropertyTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

const PropertyPrice = styled.div`
  font-weight: bold;
  color: #0a6cad;
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  color: #666;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #0a6cad, #08a3df);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: linear-gradient(135deg, #08a3df, #0a6cad);
  }
`;

const BackButton = styled.button`
  background: #f0f0f0;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #e0e0e0;
  }
`;

const Mangalore = () => {
  const navigate = useNavigate();

  // Sample property data - in a real app, this would come from an API
  const properties = [
    {
      id: 1,
      title: "Modern Villa in Kadri",
      price: "₹1.2 Cr",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 4,
      baths: 3,
      area: "3200 sq ft",
    },
    {
      id: 2,
      title: "Seaview Apartment in Surathkal",
      price: "₹85 Lakhs",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "1800 sq ft",
    },
    {
      id: 3,
      title: "Luxury Flat in City Centre",
      price: "₹95 Lakhs",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 3,
      baths: 2,
      area: "2000 sq ft",
    },
    {
      id: 4,
      title: "Family Home in Bejai",
      price: "₹1.5 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      beds: 5,
      baths: 4,
      area: "4000 sq ft",
    },
  ];

  return (
    <PageContainer>
      <BackButton onClick={() => navigate("/")}>← Back to Locations</BackButton>

      <Header>
        <Title>Properties in Mangalore</Title>
        <Description>
          Discover your dream home in Mangalore, a coastal gem known for its
          beautiful beaches, rich culture, and growing real estate market.
        </Description>
      </Header>

      <PropertyGrid>
        {properties.map((property) => (
          <PropertyCard key={property.id}>
            <PropertyImage
              style={{ backgroundImage: `url(${property.image})` }}
            />
            <PropertyInfo>
              <PropertyTitle>{property.title}</PropertyTitle>
              <PropertyPrice>{property.price}</PropertyPrice>
              <PropertyDetails>
                <span>{property.beds} Beds</span>
                <span>{property.baths} Baths</span>
                <span>{property.area}</span>
              </PropertyDetails>
              <Button onClick={() => navigate(`/house/${property.id}`)}>
                View Details
              </Button>
            </PropertyInfo>
          </PropertyCard>
        ))}
      </PropertyGrid>
    </PageContainer>
  );
};

export default Mangalore;
