import logo from '../../Assets/Images/logo.svg';

import "../../Assets/Styles/header.css";

function Header() {
  return (
  <header className="header">
    <img className="header__logo" src={logo} />
  </header>
  );
}

export default Header;
