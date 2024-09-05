import React, { useEffect, useState } from "react";
import styles from "./avatarPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { maleCardsArr, femaleCardsArr } from "../../utils/avatar/cards";
import {
  maleOriginalArr,
  femaleOriginalArr,
} from "../../utils/avatar/originalImages";

import select from "./../../assets/gender/selectGender.png";

export default function AvatarPage({ gender, setSelectedAvatar }) {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (gender.toLowerCase() === "female") {
      setCards(femaleCardsArr);
    } else if (gender.toLowerCase() === "male") {
      setCards(maleCardsArr);
    }
  }, [gender]);

  // toast options
  const toastOptions = {
    position: "top-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // filtering card image with actual image
  const filterOriginalImg = (index) => {
    if (gender.toLowerCase() === "female") {
      console.log("female");
      const filteredActualImgArr = femaleOriginalArr.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      console.log(filteredActualImgArr[0]);

      return filteredActualImgArr[0];
    } else if (gender.toLowerCase() === "male") {
      console.log("male");
      const filteredActualImgArr = maleOriginalArr.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      // console.log(filteredActualImgArr[0]);
      return filteredActualImgArr[0];
    }
  };

  // handle submit
  const handleSubmit = () => {
    if (selectedImageIndex >= 0) {
      navigate("/camera");
    }
  };

  return (
    <div className={`flex-col-center ${styles.AvatarPage}`}>
      <h1>
        SELECT YOUR <br /> AVATAR
      </h1>

      <main className={`flex-row-center ${styles.main}`}>
        {cards?.map((img, index) => (
          <div
            key={index}
            className={`flex-row-center ${styles.singleImageContainer}`}
            onClick={() => {
              setSelectedImageIndex(index);
              const originalImg = filterOriginalImg(index);
              setSelectedAvatar(originalImg);
            }}
          >
            <div className={`${styles.imgContainer}`}>
              <img src={img} alt="avatar" />
            </div>

            <div
              className={`${styles.hoverContainer} ${
                selectedImageIndex === index ? styles.showHoverContainer : ""
              }`}
            >
              <div className={`${styles.selectIcon}`}>
                <img src={select} alt="selected" />
              </div>
            </div>
          </div>
        ))}
      </main>

      <button
        onClick={handleSubmit}
        className={`btn1`}
        disabled={selectedImageIndex >= 0 ? false : true}
      >
        SUBMIT
      </button>

      <ToastContainer />
    </div>
  );
}
