import cttLogo from "../../assets/ctt-logo.png";
import "./Navbar.style.scss";

function Navbar() {
  return (
    <nav className="navbar-container">
      <img src={cttLogo} className="navbar-image" />
    </nav>
  );
}

export default Navbar;
