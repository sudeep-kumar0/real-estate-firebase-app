import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', Arial, sans-serif;
    overflow-x: hidden;
    color: #333;
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
  animation: ${(props) =>
    props.active ? "zoomEffect 20s infinite alternate" : "none"};

  @keyframes zoomEffect {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
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
  width: 12px;
  height: 12px;
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
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
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
  width: 90%;
  max-width: 1100px;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  letter-spacing: 1px;
  animation: fadeInDown 1s ease-out;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 2.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  font-weight: 300;
  animation: fadeInUp 1s ease-out 0.3s;
  animation-fill-mode: both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  animation: fadeIn 1s ease-out 0.6s;
  animation-fill-mode: both;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const HeroButton = styled.button`
  padding: 16px 32px;
  background: linear-gradient(135deg, #0a6cad, #08a3df);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(10, 108, 173, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(10, 108, 173, 0.3);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:before {
    left: 100%;
  }
`;

const AllHousesButton = styled(HeroButton)`
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);

  &:hover {
    box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
  }
`;

// Section styling
const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
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
  max-width: 800px;
  margin: 0 auto 3.5rem;
  color: #666;
  font-size: 1.2rem;
  line-height: 1.6;
`;

// Location Section
const LocationsSection = styled(Section)`
  background-color: #f8f9fa;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, white, transparent);
  }
`;

const LocationsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
`;

const LocationCard = styled.div`
  position: relative;
  height: 240px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
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
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.7)
    );
    z-index: 1;
    transition: all 0.4s ease;
  }

  &:hover:before {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(10, 108, 173, 0.7)
    );
  }
`;

const LocationImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s ease;

  ${LocationCard}:hover & {
    transform: scale(1.1);
  }
`;

const LocationInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 25px;
  color: white;
  z-index: 2;
  transform: translateY(10px);
  transition: transform 0.4s ease;

  ${LocationCard}:hover & {
    transform: translateY(0);
  }
`;

const LocationName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.7rem;
  font-weight: 600;
`;

const LocationDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
  max-width: 90%;
`;

// Why Choose Us Section
const WhyChooseContainer = styled(Section)`
  background-color: white;
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, #f8f9fa, transparent);
    pointer-events: none;
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  height: 500px;
  width: 500px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(10, 108, 173, 0.03),
    rgba(8, 163, 223, 0.05)
  );
  top: -200px;
  right: -200px;
  z-index: 0;
`;

const BackgroundShape2 = styled(BackgroundShape)`
  height: 400px;
  width: 400px;
  top: auto;
  right: auto;
  bottom: -150px;
  left: -150px;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.03),
    rgba(46, 125, 50, 0.05)
  );
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 35px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 35px 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border-top: 4px solid transparent;
  border-image: linear-gradient(90deg, #0a6cad, #08a3df);
  border-image-slice: 1;

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0a6cad, #08a3df);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  color: white;
  font-size: 2rem;
  box-shadow: 0 8px 20px rgba(10, 108, 173, 0.2);
  transition: transform 0.3s ease;

  ${FeatureCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const FeatureTitle = styled.h3`
  color: #333;
  margin: 0 0 15px 0;
  font-size: 1.4rem;
  position: relative;
  padding-bottom: 12px;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #0a6cad, #08a3df);
    border-radius: 1.5px;
  }
`;

const FeatureText = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.7;
  font-size: 1.05rem;
`;

// Contact Section
const ContactSection = styled(Section)`
  background: linear-gradient(135deg, #08a3df, #0a6cad);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const ContactWave = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E");
  background-size: cover;
  transform: rotate(180deg);
`;

const ContactContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
`;

const ContactTitle = styled(SectionTitle)`
  color: white;
  margin-bottom: 2rem;

  &:after {
    background: white;
  }
`;

const ContactText = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactButton = styled.button`
  padding: 16px 36px;
  background-color: white;
  color: #0a6cad;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:before {
    left: 100%;
  }
`;

// Background particles
const BackgroundParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;

  &:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 10%;
    left: 10%;
    animation: float 15s infinite alternate;
  }

  &:nth-child(2) {
    width: 60px;
    height: 60px;
    top: 20%;
    right: 15%;
    animation: float 18s infinite alternate-reverse;
  }

  &:nth-child(3) {
    width: 120px;
    height: 120px;
    bottom: 20%;
    left: 15%;
    animation: float 20s infinite alternate;
  }

  &:nth-child(4) {
    width: 50px;
    height: 50px;
    bottom: 30%;
    right: 10%;
    animation: float 12s infinite alternate-reverse;
  }

  @keyframes float {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(30px, 30px) rotate(180deg);
    }
    100% {
      transform: translate(-30px, 20px) rotate(360deg);
    }
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
          <ButtonContainer>
            <HeroButton
              onClick={() =>
                document
                  .getElementById("locations-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Locations
            </HeroButton>
            <AllHousesButton onClick={() => navigate("/all-houses")}>
              View All Houses
            </AllHousesButton>
          </ButtonContainer>
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
        <BackgroundShape />
        <BackgroundShape2 />
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
        <ContactWave />
        <BackgroundParticles>
          <Particle />
          <Particle />
          <Particle />
          <Particle />
        </BackgroundParticles>
        <ContactContent>
          <ContactTitle>Ready to Find Your Dream Home?</ContactTitle>
          <ContactText>
            Our property experts are just a call away. Get in touch today to
            start your journey towards finding your perfect coastal property.
          </ContactText>
          <ContactButton onClick={() => navigate("/contact")}>
            Contact Us
          </ContactButton>
        </ContactContent>
      </ContactSection>
    </>
  );
};

export default Category;
