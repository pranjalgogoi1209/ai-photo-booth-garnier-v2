import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png";

export default function Header() {
  return (
    <div className={`flex-col-center ${styles.Header}`}>
      <Link to={"/"} className={`flex-row-center ${styles.imgContainer}`}>
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
}
