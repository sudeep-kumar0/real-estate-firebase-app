import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 3rem;
  background-color: #f8f9fa;
  min-height: 100vh;
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
    height: 3px;
    background: linear-gradient(135deg, #43a047, #66bb6a);
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2e7d32;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #455a64;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin: 4rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1b5e20;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Paragraph = styled.p`
  color: #455a64;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const FounderSection = styled.div`
  padding: 3rem 2rem;
  background: linear-gradient(to right, #e8f5e9, #c8e6c9);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
`;

const FounderImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 2rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: #2e7d32;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FounderName = styled.h3`
  font-size: 2rem;
  color: #1b5e20;
  margin-bottom: 0.5rem;
`;

const FounderTitle = styled.p`
  font-size: 1.2rem;
  color: #455a64;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
`;

const ValueCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h4`
  font-size: 1.3rem;
  color: #1b5e20;
  margin-bottom: 0.8rem;
`;

const ValueDescription = styled.p`
  color: #546e7a;
  line-height: 1.6;
`;

const StatsSection = styled.div`
  background: linear-gradient(to right, #2e7d32, #43a047);
  padding: 3rem 2rem;
  border-radius: 1rem;
  margin: 4rem 0;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const About = () => {
  return (
    <AboutContainer>
      <Header>
        <Title>About Homzy</Title>
        <Subtitle>
          Turning houses into homes with trust and excellence since 2010
        </Subtitle>
      </Header>

      <ContentSection>
        <TextContent>
          <SectionTitle>
            <span role="img" aria-label="house">
              🏡
            </span>{" "}
            Our Story
          </SectionTitle>
          <Paragraph>
            Homzy was founded in 2010 with a simple yet powerful vision: to
            transform the real estate experience for everyone involved. What
            began as a small operation has grown into one of the most trusted
            real estate companies in the region, with a portfolio spanning
            residential, commercial, and luxury properties.
          </Paragraph>
          <Paragraph>
            Our journey has been marked by a relentless commitment to quality,
            transparency, and customer satisfaction. We understand that real
            estate isn't just about properties—it's about finding perfect spaces
            where memories are made and dreams are realized.
          </Paragraph>
          <SectionTitle>
            <span role="img" aria-label="mission">
              🎯
            </span>{" "}
            Our Mission
          </SectionTitle>
          <Paragraph>
            At Homzy, we are dedicated to providing exceptional real estate
            services that exceed client expectations. We strive to make the
            process of buying, selling, and investing in property as smooth and
            rewarding as possible, guided by integrity and expertise every step
            of the way.
          </Paragraph>
        </TextContent>

        <FounderSection>
          <FounderImage>
            <span role="img" aria-label="person">
              👨‍💼
            </span>
          </FounderImage>
          <FounderName>Sudeep Kumar</FounderName>
          <FounderTitle>Founder & CEO</FounderTitle>
          <Paragraph>
            With over 15 years of experience in real estate, Sudeep Kumar has
            established himself as a visionary leader in the industry. His
            passion for architecture, deep understanding of market trends, and
            commitment to ethical business practices have been the cornerstone
            of Homzy's success.
          </Paragraph>
          <Paragraph>
            Sudeep believes that a home is the most important investment in
            one's life, and is dedicated to helping clients find properties that
            not only meet their needs but exceed their expectations.
          </Paragraph>
        </FounderSection>
      </ContentSection>

      <SectionTitle style={{ textAlign: "center" }}>
        <span role="img" aria-label="values">
          💎
        </span>{" "}
        Our Core Values
      </SectionTitle>

      <ValuesGrid>
        <ValueCard>
          <ValueIcon>
            <span role="img" aria-label="integrity">
              🤝
            </span>
          </ValueIcon>
          <ValueTitle>Integrity</ValueTitle>
          <ValueDescription>
            We conduct all business with unwavering honesty and transparency,
            building trust that lasts beyond transactions.
          </ValueDescription>
        </ValueCard>

        <ValueCard>
          <ValueIcon>
            <span role="img" aria-label="excellence">
              ✨
            </span>
          </ValueIcon>
          <ValueTitle>Excellence</ValueTitle>
          <ValueDescription>
            We strive for excellence in every aspect of our service, constantly
            raising the bar for what clients can expect.
          </ValueDescription>
        </ValueCard>

        <ValueCard>
          <ValueIcon>
            <span role="img" aria-label="innovation">
              💡
            </span>
          </ValueIcon>
          <ValueTitle>Innovation</ValueTitle>
          <ValueDescription>
            We embrace new technologies and ideas to provide cutting-edge
            solutions for modern real estate challenges.
          </ValueDescription>
        </ValueCard>

        <ValueCard>
          <ValueIcon>
            <span role="img" aria-label="community">
              🌱
            </span>
          </ValueIcon>
          <ValueTitle>Community</ValueTitle>
          <ValueDescription>
            We are committed to giving back to the communities we serve,
            supporting local initiatives and sustainable development.
          </ValueDescription>
        </ValueCard>
      </ValuesGrid>

      <StatsSection>
        <SectionTitle
          style={{
            color: "white",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <span role="img" aria-label="chart">
            📊
          </span>{" "}
          Our Impact
        </SectionTitle>

        <StatsGrid>
          <StatItem>
            <StatNumber>1000+</StatNumber>
            <StatLabel>Properties Sold</StatLabel>
          </StatItem>

          <StatItem>
            <StatNumber>98%</StatNumber>
            <StatLabel>Client Satisfaction</StatLabel>
          </StatItem>

          <StatItem>
            <StatNumber>15</StatNumber>
            <StatLabel>Years Experience</StatLabel>
          </StatItem>

          <StatItem>
            <StatNumber>20+</StatNumber>
            <StatLabel>Expert Agents</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <TextContent>
        <SectionTitle>
          <span role="img" aria-label="approach">
            🔍
          </span>{" "}
          Our Approach
        </SectionTitle>
        <Paragraph>
          At Homzy, we take pride in our personalized approach to real estate.
          We understand that each client has unique needs and preferences, which
          is why we take the time to listen and understand before recommending
          properties or strategies.
        </Paragraph>
        <Paragraph>
          Our team of expert agents combines deep local knowledge with industry
          expertise to provide guidance that's both practical and visionary.
          Whether you're a first-time homebuyer, seasoned investor, or looking
          to sell your property, we have the tools and know-how to help you
          achieve your goals.
        </Paragraph>
        <Paragraph>
          We leverage cutting-edge technology and market analytics to ensure our
          clients always have access to the best opportunities and make
          decisions based on solid data and insights.
        </Paragraph>
        <SectionTitle>
          <span role="img" aria-label="join">
            🤗
          </span>{" "}
          Join the Homzy Family
        </SectionTitle>
        <Paragraph>
          We're more than just a real estate company – we're a community of
          homeowners, investors, and professionals united by a passion for
          extraordinary spaces and experiences. When you work with Homzy, you
          don't just get a service provider; you get a long-term partner
          committed to your real estate success.
        </Paragraph>
        <Paragraph>
          Reach out today to discover the Homzy difference and let us help you
          find your perfect property match!
        </Paragraph>
      </TextContent>
    </AboutContainer>
  );
};

export default About;
