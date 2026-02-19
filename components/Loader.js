export default function Loader() {
  return (
    <div id="loading-screen">
      <canvas id="particles"></canvas>
      <div className="loader-content">
        <img src="/images/logo.png" alt="Logo" className="logos" /> {/* Replace with your logo file */}
        <p className="loading-text">Welcome to Your Premium Experience</p>
      </div>
    </div>
  );
}
