import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.scss"; // Assuming you are using Sass files

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

      {/* Companies Section */}
      <div className="partner-companies-section text-center mt-5">
        <h2 className="mb-4">Companies we have worked with:</h2>
        <div className="d-flex justify-content-around">
          {["Google", "Amazon", "Facebook", "Microsoft"].map((company, index) => (
            <div className="company-logo p-3 border" key={index}>
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
