import React from "react";
import {
  Link,
} from 'react-router-dom';
const Navbar = (props) => {
  
  return (
    <React.Fragment>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <Link className="nav-link active" aria-current="page" to='/HomePage'>Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <Link className="nav-link" to='/App'>Products</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to='/CartPage' >Cart</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </React.Fragment>
  );
};
export default Navbar;