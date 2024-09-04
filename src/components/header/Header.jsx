import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

import amazonLogo from "./../../assets/header/logo-white.png";
import header from "./../../assets/header/header.png";
import circleLogo from "./../../assets/header/pay-icon.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  return location.pathname === "/" ? (
    <div className={`flex-col-center ${styles.Header}`}>
      <div className={`flex-row-center ${styles.imgContainer}`}>
        <img src={amazonLogo} alt="logo" />
      </div>
      <div className={`flex-col-center ${styles.titleImage}`}>
        <img src={header} alt="" />
      </div>
    </div>
  ) : (
    <div className={`flex-col-center ${styles.componentHeader}`}>
      <Link to={"/"} className={`flex-col-center ${styles.logo}`}>
        <img src={circleLogo} alt="" />
      </Link>
    </div>
  );
}
