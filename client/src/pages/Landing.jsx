import "./Landing.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const reviewsWrapperRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    const cardWidth = reviewsWrapperRef.current.children[0].offsetWidth;
    const scrollDistance = cardWidth * 3;
    reviewsWrapperRef.current.scrollBy({
      left: -scrollDistance,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const cardWidth = reviewsWrapperRef.current.children[0].offsetWidth;
    const scrollDistance = cardWidth * 3;
    reviewsWrapperRef.current.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="landing-page-container">
        <img
          src={"./src/components/pictures/banner2.jpg"}
          alt="Career Connect Banner"
          className="landing-banner"
        />
        <div className="landing-overlay">
          <h1 className="landing-title">Career Connect</h1>
          <button
            className="landing-start-now-button"
            onClick={() => navigate("/register")}
          >
            Start Now
          </button>
        </div>
      </div>

      <div className="user-reviews-section">
        {/* Left Arrow */}
        <div className="reviews-arrow-container">
          <button
            className="reviews-scroll-arrow left-arrow"
            onClick={scrollLeft}
          >
            &#8592; {/* Left Arrow */}
          </button>

          {/* Reviews Wrapper */}
          <div className="reviews-container" ref={reviewsWrapperRef}>
            {/* Review Cards */}
            {[
              "Career Connect helped me land my dream job!",
              "A fantastic platform for connecting professionals.",
              "I love the simple interface.",
              "Their resources helped me sharpen my resume.",
              "Great customer support and easy-to-use platform!",
            ].map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-text">
                  <p>{review}</p>
                  <p>-User {index + 1}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className="reviews-scroll-arrow right-arrow"
            onClick={scrollRight}
          >
            &#8594; {/* Right Arrow */}
          </button>
        </div>
      </div>

      {/* Companies Section */}
      <div className="partner-companies-section">
        <h2 className="partner-companies-title">
          Companies we have worked with:
        </h2>
        <div className="companies-logos-container">
          {["Google", "Amazon", "Facebook", "Microsoft"].map(
            (company, index) => (
              <div className="company-logo" key={index}>
                {company}
              </div>
            )
          )}
        </div>
      </div>

      {/* Site Map / Footer */}
      <div className="footer-site-map">
        <div className="footer-legal-list">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-list">
            <li className="footer-list-item">Privacy</li>
            <li className="footer-list-item">Consumer Health Data</li>
            <li className="footer-list-item">Privacy Policy</li>
            <li className="footer-list-item">Terms</li>
            <li className="footer-list-item">Intellectual Property</li>
          </ul>
        </div>
        <div className="footer-careers-list">
          <h3 className="footer-title">Careers</h3>
          <ul className="footer-list">
            <li className="footer-list-item">Career Portal</li>
            <li className="footer-list-item">Tech Blog</li>
          </ul>
        </div>
        <div className="footer-faq-list">
          <h3 className="footer-title">FAQ</h3>
          <ul className="footer-list">
            <li className="footer-list-item">Frequently Asked</li>
            <li className="footer-list-item">Contact</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Landing;
