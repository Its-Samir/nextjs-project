import classes from './MainNavigation.module.css';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';

function MainNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
        <ul className={`${classes.List} ${showMenu && classes.ShowMenu}`}>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      <RxHamburgerMenu onClick={() => setShowMenu((prevValue) => !prevValue)} className={classes.MenuIcon} />
    </header>
  );
}

export default MainNavigation;
