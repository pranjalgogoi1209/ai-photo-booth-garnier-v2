import React, { useEffect } from "react";
import styles from "./homePage.module.css";

import { Link } from "react-router-dom";

// import homePageArr from "../../utils/home";

import logo from "./../../assets/header/logo-white.png";

import Header from "../../components/header/Header";
import homeCard from '../../assets/home/homeImage.png'

export default function HomePage({ setGender }) {
  const horiImgsIdx = [3, 4, 5, 6];

  const isHoriImg = (idx) => {
    return horiImgsIdx.includes(idx);
  };

  useEffect(() => {
    setGender("");
  }, []);

  return (
    <div className={`flex-col-center ${styles.HomePage}`}>
      <Header />
      <div className={`flex-col-center ${styles.avatarContainer}  `}>
        {/* {homePageArr?.map((item, idx) => (
          <div
            key={idx}
            className={`flex-row-center ${styles.singleImg}  ${
              isHoriImg(idx) ? `${styles.horiImg}` : ""
            }`}
          >
            <img src={item} alt="avatar" />
          </div>
        ))} */}
        <div className={`flex-row-center ${styles.singleImg}`}>
          <img src={homeCard} alt="" />
        </div>

        <div className={`flex-col-center ${styles.homeTxt}`}>
          <h2>CLICK TO TRANSFORM INTO YOUR AVATAR!</h2>
        </div>
        
      </div>

      <div className={`flex-col-center ${styles.footerBtn}`}>
      <Link to={"/gender"}>
        <button className={`btn1 ${styles.startBtn}`}>START NOW</button>
      </Link>
      <h2>
        #DARETOGORED
      </h2>
      </div>
    </div>
  );
}
