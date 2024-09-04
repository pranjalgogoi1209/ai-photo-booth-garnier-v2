import React, { useEffect, useState } from "react";
import styles from "./avatarPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

import { maleCardsArr, femaleCardsArr } from "../../utils/avatar/cards";
import {
  maleOriginalArr,
  femaleOriginalArr,
} from "../../utils/avatar/originalImages";

import { base64 } from "../../utils/base64";

import select from "./../../assets/select1.png";
import Header from "../../components/header/Header";

export default function AvatarPage({
  setGeneratedImg,
  capturedImg,
  setUrl,
  gender,
}) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [originalImg, setOriginalImg] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [cards, setCards] = useState([]);

  const horiImgsIdx = [3, 4, 5, 6];
  const isHoriImg = (idx) => {
    return horiImgsIdx.includes(idx);
  };

  console.log(capturedImg);

  // console.log(cardsArr);

  //
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
      console.log("female hai");
      const filteredActualImgArr = femaleOriginalArr.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      console.log(filteredActualImgArr[0]);

      return filteredActualImgArr[0];
    } else if (gender.toLowerCase() === "male") {
      console.log("male hai");
      const filteredActualImgArr = maleOriginalArr.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      console.log(filteredActualImgArr[0]);
      return filteredActualImgArr[0];
    }
  };

  // image uploading on server
  const getUrl = (url) => {
    axios
      .post("https://analytiq4.com/aiphotobooth/aiphotobooth_gaar/upload.php", {
        img: url,
      })
      .then(function (response) {
        setUrl(response.data.url);
        // console.log("image uploaded on server");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // submitting the selected image and post request to api
  const handleSubmit = () => {
    // console.log("submitting selected avatar");

    setGeneratedImg("");
    console.log(capturedImg, selectedImageIndex);

    if (capturedImg && selectedImageIndex >= 0) {
      base64(originalImg, (base64Data) => {
        // console.log("Base64 data:", base64Data);
        setSelectedImage(base64Data);

        /*  console.log("image", capturedImg);
        console.log("choice", base64Data); */

        try {
          console.log("log on try");
          axios
            .post("https://52.56.108.15/rec", {
              image: capturedImg.split(",")[1],
              choice: base64Data.split(",")[1],
              status: "PREMIUM",
            })
            .then(function (response) {
              console.log("log while generation images");
              // console.log(response.data.result,'response data');
              // console.log('response from server')
              setGeneratedImg(`data:image/webp;base64,${response.data.result}`);
              // image uploading on server
              getUrl(response.data.result);
            })
            .catch(function (error) {
              console.log(error);
            });
          navigate("/output");
        } catch (error) {
          console.error("Error occurred during axios request:", error);
        }
      });
    } else {
      toast.error(
        "Please choose a template or capture your photo again...",
        toastOptions
      );
    }
  };

  return (
    <div className={`flex-col-center ${styles.AvatarPage}`}>
      <Header />
      <h1>CHOOSE A TEMPLATE</h1>

      <main className={`flex-col-center ${styles.main}`}>
        {cards?.map((img, index) => (
          <div
            key={index}
            className={`flex-col-center ${styles.singleImageContainer} ${
              isHoriImg(index) ? `${styles.horiImg}` : ""
            }`}
            onClick={() => {
              setSelectedImageIndex(index);
              /* setSelectedImage(filterOriginalImg(index)); */
              const originalImg = filterOriginalImg(index);
              setOriginalImg(originalImg);
            }}
          >
            <div className={styles.parent}>
              <div
                className={`${styles.imgContainer} ${index === 3 ? "" : ""}`}
              >
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
          </div>
        ))}
      </main>

      <footer
        onClick={handleSubmit}
        className={`flex-row-center ${styles.footer}`}
      >
        <button className={`btn1`}>SELECT</button>
      </footer>
      <ToastContainer />
    </div>
  );
}
