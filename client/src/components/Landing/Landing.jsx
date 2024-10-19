// import "./Landing.scss";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer'
import bannerImage from "../../assets/styles/landing/banner2.jpg";
import "./Landing.scss"



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
    <div
      className="banner"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bannerImage})`,
      }}
    >
      <div className="container">
        <h1>
          Career Connect
        </h1>
        <p>Connect with your future.</p>
        <a className="btn btn-danger" href="#">
          Start Now
        </a>
      </div>
    </div>

    <div className="services-info">
        <h2>Services</h2>
      <div className="services-category">
      <div className="service-info-one">
        <h3>Service One</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
      </div>
      <div className="service-info-two">
        <h3>Service Two</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
      </div>
      <div className="service-info-three">
        <h3>Service Three</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit</p>
      </div>
      </div>
    </div>





    <Footer />
    </div>
  </>
  );
}

export default Landing;
