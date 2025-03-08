import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', Arial, sans-serif;
    overflow-x: hidden;
  }
  
  * {
    box-sizing: border-box;
  }
`;

const locations = [
  {
    name: "mangalore",
    label: "Mangalore",
    desc: "Coastal charm with urban amenities",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "udupi",
    label: "Udupi",
    desc: "Temple town with pristine beaches",
    image:
      "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "malpe",
    label: "Malpe",
    desc: "Idyllic beach destination",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "kundapura",
    label: "Kundapura",
    desc: "Serene coastal living",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "byndoor",
    label: "Byndoor",
    desc: "Hidden coastal gem",
    image:
      "https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "brahmavara",
    label: "Brahmavara",
    desc: "Traditional charm with modern living",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

// Hero Section with Full-Page Slider
const SliderContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const SlideImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
`;

const SliderControls = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 10;
`;

const SliderDot = styled.button`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
  z-index: 2;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 10;
  width: 80%;
  max-width: 1000px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const HeroButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #0a6cad, #08a3df);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Section styling
const Section = styled.section`
  padding: 5rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  color: #333;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #0a6cad, #08a3df);
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #666;
  font-size: 1.1rem;
`;

// Location Section
const LocationsSection = styled(Section)`
  background-color: #f9f9f9;
`;

const LocationsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LocationCard = styled.div`
  position: relative;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.7)
    );
    z-index: 1;
  }
`;

const LocationImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;

  ${LocationCard}:hover & {
    transform: scale(1.1);
  }
`;

const LocationInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  color: white;
  z-index: 2;
`;

const LocationName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.5rem;
`;

const LocationDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

// Why Choose Us Section
const WhyChooseContainer = styled(Section)`
  background-color: white;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  border-top: 4px solid #0a6cad;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0a6cad, #08a3df);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-size: 1.8rem;
`;

const FeatureTitle = styled.h3`
  color: #333;
  margin: 0 0 15px 0;
  font-size: 1.3rem;
`;

const FeatureText = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.6;
`;

// Contact Section
const ContactSection = styled(Section)`
  background: linear-gradient(135deg, #08a3df, #0a6cad);
  color: white;
  text-align: center;
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactTitle = styled(SectionTitle)`
  color: white;

  &:after {
    background: white;
  }
`;

const ContactButton = styled.button`
  padding: 15px 30px;
  background-color: white;
  color: #0a6cad;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Category = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const handleLocationClick = (locationName) => {
    navigate(`/location/${locationName}`);
  };

  return (
    <>
      <GlobalStyle />

      {/* Hero Section with Full-Page Slider */}
      <SliderContainer>
        <HeroOverlay />
        {sliderImages.map((image, index) => (
          <SlideImage
            key={index}
            active={index === currentSlide}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        <HeroContent>
          <HeroTitle>Find Your Dream Home Today</HeroTitle>
          <HeroSubtitle>
            Discover exclusive properties in Karnataka's most sought-after
            coastal locations
          </HeroSubtitle>
          <HeroButton
            onClick={() =>
              document
                .getElementById("locations-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Locations
          </HeroButton>
        </HeroContent>

        <SliderControls>
          {sliderImages.map((_, index) => (
            <SliderDot
              key={index}
              active={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </SliderControls>
      </SliderContainer>

      {/* Locations Section */}
      <LocationsSection id="locations-section">
        <SectionTitle>Search By Nearby Places</SectionTitle>
        <SectionSubtitle>
          Explore stunning properties in these beautiful coastal destinations
        </SectionSubtitle>
        <LocationsContainer>
          {locations.map(({ name, label, desc, image }) => (
            <LocationCard key={name} onClick={() => handleLocationClick(name)}>
              <LocationImage style={{ backgroundImage: `url(${image})` }} />
              <LocationInfo>
                <LocationName>{label}</LocationName>
                <LocationDescription>{desc}</LocationDescription>
              </LocationInfo>
            </LocationCard>
          ))}
        </LocationsContainer>
      </LocationsSection>

      {/* Why Choose Us Section */}
      <WhyChooseContainer>
        <SectionTitle>Why Choose Homzy</SectionTitle>
        <SectionSubtitle>
          We're committed to helping you find the perfect home with exceptional
          service
        </SectionSubtitle>
        <FeaturesContainer>
          <FeatureCard>
            <FeatureIcon>🏠</FeatureIcon>
            <FeatureTitle>Expert Local Agents</FeatureTitle>
            <FeatureText>
              Our team has deep knowledge of local real estate markets to help
              you make informed decisions.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⭐</FeatureIcon>
            <FeatureTitle>Premium Properties</FeatureTitle>
            <FeatureText>
              We carefully curate our listings to bring you only the best
              properties in each location.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📝</FeatureIcon>
            <FeatureTitle>Hassle-Free Process</FeatureTitle>
            <FeatureText>
              From search to closing, we handle all the details to make your
              property journey smooth.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>Best Value Guarantee</FeatureTitle>
            <FeatureText>
              We ensure you get the best possible price whether you're buying,
              selling, or renting.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🤝</FeatureIcon>
            <FeatureTitle>Personalized Service</FeatureTitle>
            <FeatureText>
              We tailor our approach to your unique needs, preferences, and
              budget constraints.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Exclusive Listings</FeatureTitle>
            <FeatureText>
              Access properties not available on other platforms, giving you
              more options to find your perfect home.
            </FeatureText>
          </FeatureCard>
        </FeaturesContainer>
      </WhyChooseContainer>

      {/* Contact Section */}
      <ContactSection>
        <ContactContent>
          <ContactTitle>Ready to Find Your Dream Home?</ContactTitle>
          <p>
            Our property experts are just a call away. Get in touch today to
            start your journey.
          </p>
          <ContactButton onClick={() => navigate("/contact")}>
            Contact Us
          </ContactButton>
        </ContactContent>
      </ContactSection>
    </>
  );
};

export default Category;
