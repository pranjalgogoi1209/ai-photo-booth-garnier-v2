import React, { useEffect } from "react";
import styles from "./homePage.module.css";

import { Link } from "react-router-dom";

import homeCard from "../../assets/home/homeImage.png";

export default function HomePage({ setGender }) {
  useEffect(() => {
    setGender("");
  }, []);

  return (
    <div className={`flex-col-center ${styles.HomePage}`}>
      <div className={`flex-row-center ${styles.singleImg}`}>
        <img src={homeCard} alt="" />
      </div>

      <h1>CLICK TO TRANSFORM INTO YOUR AVATAR!</h1>

      <Link to={"/gender"}>
        <button className={`btn1`}>START NOW</button>
      </Link>
    </div>
  );
}
