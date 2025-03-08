import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div style={styles.container}>
      <div style={styles.contactBox}>
        <h2 style={styles.title}>Contact Us</h2>
        <div style={styles.grid}>
          {/* Contact Details */}
          <div style={styles.details}>
            <p style={styles.item}>
              <FaMapMarkerAlt style={{ color: "#007bff", marginRight: 10 }} />{" "}
              123 Real Estate St, Your City
            </p>
            <p style={styles.item}>
              <FaPhone style={{ color: "#28a745", marginRight: 10 }} /> +123 456
              7890
            </p>
            <p style={styles.item}>
              <FaEnvelope style={{ color: "#dc3545", marginRight: 10 }} />{" "}
              contact@realestate.com
            </p>
            <div style={styles.socialIcons}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.icon, color: "#e1306c" }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.icon, color: "#007bff" }}
              >
                <FaFacebook />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.icon, color: "#25d366" }}
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
          {/* Contact Form */}
          <form style={styles.form}>
            <input
              type="text"
              placeholder="Your Name"
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              style={styles.input}
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              style={{ ...styles.input, resize: "none" }}
              required
            ></textarea>
            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background:
      "url('https://saihqarc1.salvationarmy.org/assets/img/green-and-blue-background.jpeg') no-repeat center center/cover",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  contactBox: {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "800px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    color: "#555",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  icon: {
    fontSize: "24px",
    transition: "transform 0.3s",
    textDecoration: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    background: "#007bff",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },
  "@media (max-width: 768px)": {
    grid: {
      gridTemplateColumns: "1fr",
    },
  },
};

export default Contact;
