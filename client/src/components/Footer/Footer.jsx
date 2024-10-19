import "./Footer.scss"; // Assuming you are using Sass

function Footer() {
  return (
  <>
    <div className="footer-container">
        <h4>Copyright © Career Connect 2024</h4>
        <i className="bi bi-github">GitHub</i>
        <div className="footer-use-terms">
          <h4>Privacy Policy</h4>
          <h4>Terms of Use</h4>
        </div>
    </div>
  </>
  );
}

export default Footer;
