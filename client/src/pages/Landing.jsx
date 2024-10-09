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
      <div className="landing-container">
        <img src={"./src/components/pictures/banner2.jpg"} alt="Banner" />
        <div className="landing-overlay">
          <h1>Career Connect</h1>
          <button
            className="start-now-btn"
            onClick={() => navigate("/register")}
          >
            Start Now
          </button>
        </div>
      </div>

      <div className="user-reviews">
        {/* Left Arrow */}
        <div className="arrow-container">
          <button className="scroll-arrow left-arrow" onClick={scrollLeft}>
            &#8592;
          </button>

          {/* Reviews Wrapper */}
          <div className="reviews-wrapper" ref={reviewsWrapperRef}>
            <div className="review-card">
              <div className="review">
                <p>{"Career Connect helped me land my dream job!"}</p>
                <p>-John Doe</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"A fantastic platform for connecting professionals."}</p>
                <p>-Jane Smith</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"I love the simple interface."}</p>
                <p>-Michael Lee</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"Their resources helped me sharpen my resume."}</p>
                <p>-Sarah Connor</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"Great customer support and easy-to-use platform!"}</p>
                <p>-David Kim</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"Career Connect helped me land my dream job!"}</p>
                <p>-John Doe</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"A fantastic platform for connecting professionals."}</p>
                <p>-Jane Smith</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"I love the simple interface."}</p>
                <p>-Michael Lee</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"Their resources helped me sharpen my resume."}</p>
                <p>-Sarah Connor</p>
              </div>
            </div>
            <div className="review-card">
              <div className="review">
                <p>{"Great customer support and easy-to-use platform!"}</p>
                <p>-David Kim</p>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button className="scroll-arrow right-arrow" onClick={scrollRight}>
            &#8594;
          </button>
        </div>
      </div>
      {/* Companies Section */}
      <div className="companies">
        <h2>Companies we have worked with:</h2>
        <div className="logos-container">
          <div className="companies-logo">Google</div>
          <div className="companies-logo">Amazon</div>
          <div className="companies-logo">Facebook</div>
          <div className="companies-logo">Microsoft</div>
        </div>
      </div>

      {/* Site Map / Footer */}
      <div className="site-map">
        <div className="legal-list">
          <h3>Legal</h3>
          <ul>
            <li>Privacy</li>
            <li>Consumer Health Data</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>Intellectual Property</li>
          </ul>
        </div>
        <div className="career-list">
          <h3>Careers</h3>
          <ul>
            <li>Career Portal</li>
            <li>Tech Blog</li>
          </ul>
        </div>
        <div className="faq-list">
          <h3>FAQ</h3>
          <ul>
            <li>Frequently Asked</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Landing;
