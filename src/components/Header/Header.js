import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MdLock, MdLockOpen } from 'react-icons/md'
import { IoGlassesOutline } from 'react-icons/io5'
import "./Header.css";

function Header() {
  const [lock, setLock] = useState(false)
  const { pathname } = useLocation();

  const handleClick = () => setLock(prevState => !prevState)
  return (
    <>
      <header className={lock ? 'header header-locked' : 'header'}>

        <span className='header-title'>Reading Companion</span>
        <ul>
          <li><NavLink activeClassName='header__active-link' to='/home' isActive={() => ['/', '/home'].includes(pathname)}>Home</NavLink></li>
          <li><NavLink activeClassName='header__active-link' to='/my-readings'>My Readings</NavLink></li>
          {/* <li><NavLink activeClassName='header__active-link' to='/add-book'>Add THE Book</NavLink></li> */}
          {/* <li><NavLink activeClassName='header__active-link' to='/add-comment'>Add Comment</NavLink></li> */}
          <li className={lock ? "header__lock header__lock-locked" : "header__lock"} onClick={handleClick}>{lock ? <MdLock /> : <MdLockOpen />}</li>
        </ul>
        <IoGlassesOutline className="header-glasses" />
      </header>
    </>
  )
}

export default Header
