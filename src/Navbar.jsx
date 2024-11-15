import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/home">MyApp</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/admin">Admin</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/customer">Customer</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/all-customers">All Customers</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/management">Management Database</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/new-order">New Order</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user-account">User Account</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
