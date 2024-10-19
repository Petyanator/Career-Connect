import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// import "./Landing.scss";
import Footer from '../Footer/Footer'

function Landing() {
  const reviewsWrapperRef = useRef(null);

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
    <div className="landing-container">
      {/* User Reviews Section */}
      <div className="user-reviews-section">
        <div className="d-flex justify-content-between align-items-center">
          {/* Left Arrow */}
          <button className="btn btn-primary reviews-scroll-arrow" onClick={scrollLeft}>
            &#8592;
          </button>

          {/* Reviews Wrapper */}
          <div className="reviews-container overflow-hidden" ref={reviewsWrapperRef}>
            <div className="d-flex">
              {[
                "Career Connect helped me land my dream job!",
                "A fantastic platform for connecting professionals.",
                "I love the simple interface.",
                "Their resources helped me sharpen my resume.",
                "Great customer support and easy-to-use platform!",
              ].map((review, index) => (
                <div className="review-card p-3 m-2 border" key={index}>
                  <p>{review}</p>
                  <p>-User {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button className="btn btn-primary reviews-scroll-arrow" onClick={scrollRight}>
            &#8594;
          </button>
        </div>
      </div>

  <Footer />
  </div>
  );
}

export default Landing;
