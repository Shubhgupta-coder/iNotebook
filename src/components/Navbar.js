import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let history=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history("/login");
  }
  let location = useLocation();
  // this is a part of useLocation
  useEffect(() => {
    console.log(location.pathname); // ye hm jaha pr bhi navbar pr click krte h uska path dedeta h
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNOtebook
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
              <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">
                Home
              </Link> 
            </li>
            {/* agr hamara locatioon.path o hmne locationhook ki help se nikala h agr / h mtlb hmne home pr click kia to navbarm home active ho jaarega otherwise about active ho jaarga*/}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
          <Link className="btn btn-primary mx-1"  to="/login"role="button">Login</Link>
          <Link className="btn btn-primary mx-1"  to="/signup" role="button">Signup</Link>
          </form>:
          <button onClick={handleLogout}className="btn btn-primary">Logout</button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
