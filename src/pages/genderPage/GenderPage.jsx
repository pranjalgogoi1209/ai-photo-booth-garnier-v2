import React from "react";
import styles from "./genderPage.module.css";
import { useNavigate } from "react-router-dom";

import maleIcon from "./../../assets/gender/male_icon.png";
import femaleIcon from "./../../assets/gender/female_icon.png";
import selectGender from "./../../assets/gender/selectGender.png";

export default function GenderPage({ setGender, gender }) {
  const navigate = useNavigate();

  return (
    <div className={`flex-col-center ${styles.GenderPage}`}>
      <h1>
        SELECT YOUR <br /> GENDER
      </h1>

      <div className={`flex-row-center ${styles.genderContainer}`}>
        <div className={`flex-col-center ${styles.maleContainer}`}>
          <div
            className={`flex-row-center ${styles.imgContainer}`}
            onClick={() => setGender("male")}
          >
            <img src={maleIcon} alt="maleIcon" />
            {gender == "male" && (
              <div className={`${styles.select}`}>
                <img src={selectGender} alt="select" />
              </div>
            )}
          </div>

          <p className={styles.gender}>MALE</p>
        </div>

        <div className={`flex-col-center ${styles.femaleContainer}`}>
          <div
            className={`flex-row-center ${styles.imgContainer} ${styles.femaleImg}`}
            onClick={() => setGender("female")}
          >
            {gender == "female" && (
              <div className={`${styles.select}`}>
                <img src={selectGender} alt="" />
              </div>
            )}
            <img src={femaleIcon} alt="" />
          </div>
          <p className={styles.gender}>FEMALE</p>
        </div>
      </div>

      <button
        className={`btn1 ${styles.nxtBtn}`}
        onClick={() => navigate("/avatar")}
      >
        NEXT
      </button>
    </div>
  );
}
