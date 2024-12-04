import React from 'react';
import { Link } from 'react-router-dom';

const Encabezado = () => {
  return (
    <nav
      className="custom-navbar navbar navbar-expand-lg navbar-dark fixed-top"
      data-spy="affix"
      data-offset-top="10"
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="#home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#gallery">
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#book-table">
              Book Table
            </Link>
          </li>
        </ul>
        <Link className="navbar-brand m-auto" to="#">
          <img src="../../foodhut/public_html/assets/imgs/logo.svg" className="brand-img" alt="Food Hut Logo" />
          <span className="brand-txt">Food Hut</span>
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="#blog">
              Blog<span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#testmonial">
              Reviews
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#contact">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="components.html" className="btn btn-primary ml-xl-4">
              Components
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Encabezado;
