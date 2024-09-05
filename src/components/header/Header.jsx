import React from "react";
import styles from "./header.module.css";

import logo from "./../../assets/header/logo.png";

export default function Header() {
  return (
    <div className={`flex-col-center ${styles.Header}`}>
      <div className={`flex-row-center ${styles.imgContainer}`}>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}
