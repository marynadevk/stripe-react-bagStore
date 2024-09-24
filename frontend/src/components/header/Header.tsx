import { Link } from 'react-router-dom';
import './header.styles.scss';
import CartIcon from '../cart-icon/CartIcon';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/sign-in', label: 'Sign In' },
  { path: '/sign-out', label: 'Sign Out', isLink: false },
  { path: '/sign-up', label: 'Sign Up' },
];

const Header = () => {
  return (
    <nav className="nav-menu container">
      <div className="logo">
        <Link to="/">BagGO</Link>
      </div>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.isLink === false ? (
              item.label
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
      <CartIcon />
    </nav>
  );
};

export default Header;