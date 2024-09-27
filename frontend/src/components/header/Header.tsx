import { Link } from 'react-router-dom';
import './header.styles.scss';
import CartIcon from '../cart-icon/CartIcon';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { auth } from '../../firebase/firebase';

const Header = () => {
  const { user } = useContext(UserContext);
  const navItems = [
    { path: '/', label: 'Home', isVisible: true },
    { path: '/shop', label: 'Shop', isVisible: true },
    { path: '/sign-in', label: 'Sign In', isVisible: !user },
    { path: '/sign-up', label: 'Sign Up', isVisible: !user },
  ];

  return (
    <nav className="nav-menu container">
      <div className="logo">
        <Link to="/">BagGO</Link>
      </div>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.isVisible && <Link to={item.path}>{item.label}</Link>}
          </li>
        ))}
        {user && <li onClick={() => auth.signOut()}>Sign Out</li>}
      </ul>
      <CartIcon />
    </nav>
  );
};

export default Header;
