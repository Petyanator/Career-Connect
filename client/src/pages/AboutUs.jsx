import "./AboutUs.css";
import DevelopersSection from "./DevelopersSection.jsx";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        At <span className="company-name">Career Connect</span>, we believe in
        bridging the gap between talented professionals and the opportunities
        they deserve. Founded with a vision to simplify the job search process,
        our platform is designed to connect job seekers with top employers
        across various industries. Whether you’re a fresh graduate looking for
        your first opportunity or a seasoned professional seeking your next big
        move,
        <span className="company-name"> Career Connect</span> is here to make
        the process easier, faster, and more effective.
      </p>
      <p>
        Our <span className="buzzword">mission</span> is to empower individuals
        by providing a user-friendly platform where candidates can find jobs
        that match their skills, values, and career aspirations. With
        personalized job recommendations, expert resources, and a focus on{" "}
        <span className="buzzword">transparency</span>, we are committed to
        helping you navigate the competitive job market with confidence.{"\n"}
      </p>
      <p>
        For employers, <span className="company-name">Career Connect</span>{" "}
        offers a seamless recruitment experience, providing access to a diverse
        pool of qualified candidates. We understand the challenges of finding
        the right fit, which is why we’ve built advanced tools to help you
        discover, engage, and hire top talent effortlessly.
      </p>
      <p>
        Join <span className="company-name">Career Connect</span> today—where
        <span className="buzzword"> ambition</span> meets{" "}
        <span className="buzzword"> opportunity</span>, and{" "}
        <span className="buzzword"> success stories </span>
        are written every day.
      </p>
      <DevelopersSection></DevelopersSection>
      <div className="start-now-btn-container">
        <button className="start-now-btn" onClick={() => navigate("/register")}>
          Start Now
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
