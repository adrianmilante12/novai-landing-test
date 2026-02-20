export default function Bsheet() {
  return (
    <div className="bottom-sheet" id="bottomSheet">
      {/* Close / Grab Button */}
      <div className="grab-btn" id="grabBtn"></div>

      {/* Logo */}
      <div className="sheet-logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>

      {/* Links */}
      <div className="sheet-content">
        <a href="#features">About</a>
        <a href="showcase.html">Template</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>

      <a href="#get-started" className="btn-primary bottom-start">Get Started</a>
    </div>
  );
}
