export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div>
          <div className="footer-logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <p>Building premium digital experiences with modern design and performance.</p>
          <div className="footer-socials">
            <a
              href="#"
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                padding: '7px',
                background: 'linear-gradient(135deg, #764ba2 0%, #933e67 100%)',
                borderRadius: '50%',
                color: '#ffffff',
                textDecoration: 'none'
              }}
            >
              <svg
                className="niftybutton-facebook"
                data-donate="true"
                data-tag="fac"
                data-name="Facebook"
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
                width="36px"
                height="36px"
                style={{ width: '36px', height: '36px', display: 'block', fill: '#ffffff' }}
              >
                <title>Facebook social icon</title>
                <path
                  d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"
                  fill="#ffffff"
                ></path>
              </svg>
            </a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>

        <div>
          <h3>Company</h3>
          <p><a href="#">About Us</a></p>
          <p><a href="#">Services</a></p>
          <p><a href="#">Careers</a></p>
          <p><a href="#">Contact</a></p>
        </div>

        <div>
          <h3>Resources</h3>
          <p><a href="#">Blog</a></p>
          <p><a href="#">Help Center</a></p>
          <p><a href="#">Privacy Policy</a></p>
          <p><a href="#">Terms</a></p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Novai. All rights reserved
      </div>
    </footer>
  );
}
