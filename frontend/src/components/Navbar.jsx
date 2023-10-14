import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TRIPL
            {/* <i className='fab fa-typo3' /> */}
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/explore' className='nav-links' onClick={closeMobileMenu}>
                Explore
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/planner'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Planner
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/sign-in'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Masuk
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Daftar
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>Daftar</Button>}
        </div>
      </nav>
    </>
  );
}

