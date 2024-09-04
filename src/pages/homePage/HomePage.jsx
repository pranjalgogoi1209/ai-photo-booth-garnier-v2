import React, { useEffect } from "react";
import styles from "./homePage.module.css";

import { Link } from "react-router-dom";

import homePageArr from "../../utils/home";

import logo from "./../../assets/header/logo-white.png";

import one from "./../../assets/home/card01.jpeg";
import two from "./../../assets/home/card02.jpeg";
import three from "./../../assets/home/card03.jpeg";
import four from "./../../assets/home/card04.jpeg";
import Header from "../../components/header/Header";

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
        {homePageArr?.map((item, idx) => (
          <div
            key={idx}
            className={`flex-row-center ${styles.singleImg}  ${
              isHoriImg(idx) ? `${styles.horiImg}` : ""
            }`}
          >
            <img src={item} alt="avatar" />
          </div>
        ))}
      </div>

      <Link to={"/gender"}>
        <button className={`btn1 ${styles.startBtn}`}>START</button>
      </Link>
    </div>
  );
}
