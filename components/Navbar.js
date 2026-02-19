export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-content">
        
        <div className="logo">
          <a href="#"><img src="/images/logo.png" alt="Logo" /></a>
        </div>

        <a href="#get-started" className="btn-primary nav-right">Get Started</a>

        {/* Centered menu links for desktop */}
        <div className="nav-menu">
          <a href="#features">Features</a>
          <a href="showcase.html">Template</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="nav-actions">
          <div className="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

      </div>
    </header>
  );
}
