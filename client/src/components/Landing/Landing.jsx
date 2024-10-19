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
    <>
    <div className="landing-container">














    <Footer />
    </div>
  </>
  );
}

export default Landing;
