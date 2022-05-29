import React, { useEffect } from 'react';
import "./navbar.css";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { IoLogOut } from 'react-icons/io5'


const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  let x = ['navbar'];
  if (scrolled) {
    x.push('scrolled');
  }
  return (
    <div className="navbar">
      <div class="navvcontainer">
        <div id="navst-box">
          <h1>Tweet App</h1>
        </div>
        <div id="navnd-box">
          
        </div>

        <div id="navrd-box">
          <nav className="navigation">
            <ul>
              <li>
                <NavLink to="/home"><AiFillHome />Home</NavLink>
              </li>
              <li>
                <NavLink to="/viewMyTweet">My Tweets</NavLink>
              </li>

              <li>
                <NavLink to="/AllUsers">View Users</NavLink>
              </li>
              <li>
                <NavLink to="/logout"><IoLogOut />Logout</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
};

export default Navbar;