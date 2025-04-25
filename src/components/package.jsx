import React from "react";
import { Link } from "react-router-dom";

const PackagePage = () => {
  return (
    <div className="package-page-wrapper">
      <div className="package-container">
        <div className="package-header">
          <div className="company-logo">
            <span className="logo-text">Homzy</span>{" "}
            <span className="logo-icon">🏡</span>
          </div>
          <h1>Our Premium Real Estate Packages</h1>
          <p>
            Discover your dream home with our exclusive real estate services
          </p>
        </div>

        <div className="package-card-container">
          <div className="package-card premium">
            <div className="package-banner">BEST VALUE</div>
            <h2>Elite Property Package</h2>
            <div className="price">
              <span className="amount">₹5,000</span>
              <span className="period">one-time fee</span>
            </div>

            <div className="package-description">
              <p>
                Access our premium collection of houses and lots with
                personalized guidance from our expert agents. 🌟
              </p>
            </div>

            <div className="features-list">
              <h3>Package Includes: 📋</h3>
              <ul>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>
                    Exclusive access to our premium property collection 🏘️
                  </span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Personalized property matching service 🔍</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>In-depth neighborhood analysis 📊</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Private property tours 🚗</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Negotiation assistance 🤝</span>
                </li>
              </ul>
            </div>

            <div className="bonus-features">
              <h3>Bonus Features: 🎁</h3>
              <ul>
                <li>
                  <span className="bonus-icon">★</span>
                  <span>Free property inspection report 📝</span>
                </li>
                <li>
                  <span className="bonus-icon">★</span>
                  <span>Legal documentation assistance ⚖️</span>
                </li>
                <li>
                  <span className="bonus-icon">★</span>
                  <span>Post-purchase support (30 days) 📞</span>
                </li>
              </ul>
            </div>

            <div className="guarantee">
              <p>
                💯 We guarantee to find you the perfect home that matches your
                requirements and budget!
              </p>
            </div>

            <div className="contact-info">
              <p>
                Contact us today to unlock our exclusive property collection 🔑
              </p>
              <p className="phone">📱 Call: +91 (XXX) XXX-XXXX</p>
              <p className="email">✉️ Email: premium@homzy.com</p>
            </div>

            <Link to="/Contact" className="contact-button">
              Contact Us Now 📩
            </Link>
          </div>
        </div>

        <div className="testimonials-section">
          <h2>What Our Clients Say 💬</h2>
          <div className="testimonial-container">
            <div className="testimonial">
              <div className="quote-icon">❝</div>
              <p>
                The premium package was worth every rupee. We found our dream
                home within two weeks!
              </p>
              <div className="client-details">
                <div className="client-avatar">👨‍👩‍👧</div>
                <p className="client-name">- Rahul & Priya</p>
              </div>
            </div>
            <div className="testimonial">
              <div className="quote-icon">❝</div>
              <p>
                Their collection of properties was impressive. The personalized
                service made all the difference.
              </p>
              <div className="client-details">
                <div className="client-avatar">👩</div>
                <p className="client-name">- Anjali M.</p>
              </div>
            </div>
            <div className="testimonial">
              <div className="quote-icon">❝</div>
              <p>
                Homzy found us our perfect home in just days! The 5000₹ package
                was the best investment ever.
              </p>
              <div className="client-details">
                <div className="client-avatar">👨</div>
                <p className="client-name">- Vikram S.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .package-page-wrapper {
          background-image: url("https://wallpaperaccess.com/full/2089158.jpg");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
          padding-top: 80px; /* Added space for navbar */
        }

        .package-container {
          font-family: "Poppins", Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #333;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .company-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
        }

        .logo-text {
          font-size: 38px;
          font-weight: 800;
          color: #e74c3c;
          letter-spacing: 1px;
        }

        .logo-icon {
          font-size: 38px;
          margin-left: 8px;
        }

        .package-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
        }

        .package-header:after {
          content: "";
          display: block;
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, #e74c3c, #f39c12);
          margin: 20px auto 0;
          border-radius: 2px;
        }

        .package-header h1 {
          font-size: 36px;
          color: #2c3e50;
          margin-bottom: 15px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        }

        .package-header p {
          font-size: 18px;
          color: #7f8c8d;
        }

        .package-card-container {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
        }

        .package-card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          padding: 40px 30px;
          width: 100%;
          max-width: 650px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .package-card.premium {
          border: 3px solid #e74c3c;
        }

        .package-banner {
          position: absolute;
          top: 25px;
          right: -40px;
          background: #e74c3c;
          color: white;
          font-weight: bold;
          padding: 8px 50px;
          transform: rotate(45deg);
          font-size: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .package-card h2 {
          font-size: 30px;
          margin-bottom: 25px;
          color: #2c3e50;
          text-align: center;
          position: relative;
          padding-bottom: 15px;
        }

        .package-card h2:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: #e74c3c;
          border-radius: 3px;
        }

        .price {
          text-align: center;
          margin-bottom: 30px;
          padding: 15px 0;
          background: linear-gradient(45deg, #f3f4f6, #ffffff);
          border-radius: 10px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
        }

        .amount {
          font-size: 48px;
          font-weight: bold;
          color: #e74c3c;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        }

        .period {
          font-size: 18px;
          color: #7f8c8d;
          margin-left: 8px;
        }

        .package-description {
          text-align: center;
          margin-bottom: 35px;
          font-size: 17px;
          line-height: 1.7;
          color: #34495e;
          padding: 0 15px;
        }

        .features-list,
        .bonus-features {
          margin-bottom: 30px;
          background: #f8f9fa;
          padding: 25px;
          border-radius: 12px;
        }

        .features-list h3,
        .bonus-features h3 {
          font-size: 22px;
          margin-bottom: 20px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .features-list ul,
        .bonus-features ul {
          list-style: none;
          padding: 0;
        }

        .features-list li,
        .bonus-features li {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          font-size: 16px;
          padding-bottom: 15px;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
        }

        .features-list li:last-child,
        .bonus-features li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .feature-icon,
        .bonus-icon {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 15px;
          flex-shrink: 0;
          font-size: 14px;
        }

        .feature-icon {
          background: #27ae60;
          color: white;
          font-weight: bold;
        }

        .bonus-icon {
          background: #f39c12;
          color: white;
        }

        .guarantee {
          background: rgba(231, 76, 60, 0.1);
          border-left: 4px solid #e74c3c;
          padding: 20px;
          margin-bottom: 30px;
          font-size: 17px;
          color: #c0392b;
          border-radius: 8px;
          font-weight: 500;
        }

        .contact-info {
          text-align: center;
          padding: 25px 0;
          border-top: 1px solid #eee;
          margin-bottom: 25px;
        }

        .contact-info p {
          margin-bottom: 12px;
          font-size: 16px;
        }

        .phone,
        .email {
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .contact-button {
          display: block;
          background: linear-gradient(45deg, #e74c3c, #f39c12);
          color: white;
          text-decoration: none;
          padding: 18px 30px;
          border-radius: 50px;
          text-align: center;
          font-weight: bold;
          font-size: 18px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
          cursor: pointer;
          margin-top: 30px;
        }

        .contact-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(231, 76, 60, 0.4);
          background: linear-gradient(45deg, #c0392b, #d35400);
        }

        .testimonials-section {
          margin-top: 70px;
          padding-top: 50px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .testimonials-section:before {
          content: "⭐⭐⭐⭐⭐";
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 0 20px;
          color: #f39c12;
          letter-spacing: 5px;
        }

        .testimonials-section h2 {
          text-align: center;
          font-size: 30px;
          margin-bottom: 40px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .testimonial-container {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
        }

        .testimonial {
          background: white;
          border-radius: 15px;
          padding: 30px 25px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 350px;
          position: relative;
          transition: transform 0.3s ease;
        }

        .testimonial:hover {
          transform: translateY(-5px);
        }

        .quote-icon {
          font-size: 48px;
          color: rgba(231, 76, 60, 0.2);
          position: absolute;
          top: 10px;
          left: 15px;
          line-height: 1;
        }

        .testimonial p {
          font-style: italic;
          margin-bottom: 20px;
          color: #34495e;
          font-size: 16px;
          line-height: 1.7;
          position: relative;
          z-index: 1;
          padding-left: 10px;
          padding-top: 15px;
        }

        .client-details {
          display: flex;
          align-items: center;
          margin-top: 20px;
        }

        .client-avatar {
          font-size: 30px;
          margin-right: 15px;
        }

        .client-name {
          font-weight: bold;
          color: #e74c3c !important;
          margin: 0 !important;
        }

        @media (max-width: 768px) {
          .package-page-wrapper {
            padding-top: 60px;
          }

          .package-container {
            padding: 30px 15px;
            margin: 0 15px;
          }

          .package-header h1 {
            font-size: 28px;
          }

          .logo-text,
          .logo-icon {
            font-size: 32px;
          }

          .package-card {
            padding: 30px 20px;
          }

          .amount {
            font-size: 36px;
          }

          .testimonial-container {
            flex-direction: column;
            align-items: center;
          }

          .package-banner {
            font-size: 14px;
            right: -45px;
            top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PackagePage;
