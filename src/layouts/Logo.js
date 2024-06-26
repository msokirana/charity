import LogoDark from "../assets/images/logos/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      {/* <LogoDark /> */}
      <img src={LogoDark} alt="logo" style={{width: 100, height: 50}} />
    </Link>
  );
};

export default Logo;
