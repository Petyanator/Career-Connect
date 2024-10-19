import "./Footer.scss"; // Assuming you are using Sass

function Footer() {
  return (
    <footer className="footer-container bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* Legal Section */}
          <div className="col-md-4">
            <h4>Legal</h4>
            <ul className="list-unstyled">
              <li>Privacy</li>
              <li>Consumer Health Data</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
              <li>Intellectual Property</li>
            </ul>
          </div>

          {/* Careers Section */}
          <div className="col-md-4">
            <h4>Careers</h4>
            <ul className="list-unstyled">
              <li>Career Portal</li>
              <li>Tech Blog</li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="col-md-4">
            <h4>FAQ</h4>
            <ul className="list-unstyled">
              <li>Frequently Asked</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
