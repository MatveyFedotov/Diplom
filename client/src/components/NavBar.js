import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import {
    REGISTRATION_ROUTE,
    MAIN_ROUTE,
    SMARTPHONE_ROUTE,
    NEWS_ROUTE
  } from '../utils/consts';

const NavBar = () => {
    const { user } = useContext(Context);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={MAIN_ROUTE}>Мой сайт</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to={MAIN_ROUTE}>Главная</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={SMARTPHONE_ROUTE}>Смартфоны</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={NEWS_ROUTE}>Новости</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={REGISTRATION_ROUTE}>Регистрация</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default NavBar;
