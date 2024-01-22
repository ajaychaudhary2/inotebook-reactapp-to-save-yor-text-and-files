import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {



  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          INote<span className="white">Book</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link  &{location.pathname==="/"?"active:""} `} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link  &{location.pathname==="/about"?"active:""} `} to="/about">
                About
              </Link>
            </li>

          
          </ul>
        
          <Link className="btn btnclr mx-2" to="/login" role="button">
           Login    </Link>
           <Link className="btn btnclr" to="/signup" role="button">
             Sign-up
         
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
