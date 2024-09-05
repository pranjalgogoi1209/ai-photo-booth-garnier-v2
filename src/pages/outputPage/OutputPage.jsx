import React, { useState, useRef, useEffect } from "react";
import styles from "./outputPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import Qr from "../../components/qr/Qr";
import Email from "../../components/email/Email";
import Loader from "../../components/loader/Loader";
import { base64 } from "../../utils/base64";
import axios from "axios";


export default function OutputPage({
  generatedImg,
  url,
  setGeneratedImg,
  setUrl,
  selectedAvatar,
  capturedImg,
}) {
  const printRef = useRef();
  const [showQr, setShowQr] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const navigate = useNavigate();

  // handle print
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const navigateToHome=()=>{
    setGeneratedImg("");
    navigate('/')
  }
  console.log(generatedImg);

  const getUrl = (url) => {
    axios
      .post("https://analytiq4.com/aiphotobooth/aiphotobooth_gaar/upload.php", {
        img: url,
      })
      .then(function (response) {
        setUrl(response.data.url);
        console.log("image uploaded on server");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (capturedImg && selectedAvatar) {
      base64(selectedAvatar, (base64Data) => {
        console.log("base 64 data", base64Data);
        try {
          console.log("log on try");
          axios
            .post("https://52.56.108.15/rec", {
              image: capturedImg.split(",")[1],
              choice: base64Data.split(",")[1],
              status: "PREMIUM",
            })
            .then((res) => {
              console.log(res.data.result);
              setGeneratedImg(`data:image/webp;base64,${res.data.result}`);
              getUrl(res.data.result);
            })
            .catch((error) => {
              console.log(error);
            });
          // console.log(capturedImg.split(",")[1])
          // console.log(base64Data.split(",")[1])
        } catch (error) {
          console.log(error);
        }
      });
    } else {
    }
    // base 64 => selectedAvatar
    // ai server api call Varun bhai
    // response => seGeneratedImg("response")
    //SIR()
  }, []);

  return (
    <div className={`flex-col-center ${styles.OutputPage}`}>
      <div className={`flex-col-center ${styles.outputPageWrapper}`}>
        <h1>
          {generatedImg ? (
            <>
              READY TO <span style={{ display: "block" }}>DOWNLOAD</span>
            </>
          ) : (
            <>
            GENERATING <span style={{ display: "block" }}>YOUR AVATAR</span>
          </>
            
          )}
        </h1>

        {generatedImg ? (
          <div className={`flex-col-center ${styles.generatedImgContainer}`}>
            <div className={styles.imgContainer}>
              <img
                ref={printRef}
                className={styles.generatedImg}
                src={generatedImg}
                alt="generated-image"
              />
            </div>

            <div className={`flex-col-center ${styles.btnContainer}`}>
              {/* generate qr */}
              <div
                onClick={() => setShowQr(true)}
                // className={`imgContainer ${styles.btn}`}
              >
                <button className={`btn1`}>GENERATE QR</button>
              </div>

              {/* email */}
              <div
                onClick={() => handlePrint()}
                /* className={`imgContainer ${styles.btn}`} */
              >
                {/*  <img src={emailBtn} alt="generate-qr-button" /> */}
                <button className={`btn1`}>PRINT</button>
              </div>

              <div>
                <button className="btn1" onClick={navigateToHome}>START AGAIN</button>
              </div>

              {/* print */}
              {/* <div onClick={handlePrint} className={`imgContainer ${styles.btn}`}>
        <img src={printBtn} alt="generate-qr-button" />
      </div> */}
            </div>
          </div>
        ) : (
          <div className={styles.loader}>
            {/* <img src={loader} alt="loader" /> */}
            <Loader />
          </div>
        )}

        {/* qr */}
        {showQr && <Qr url={url} setShowQr={setShowQr} />}

        {/* email */}
        {showEmail && <Email setShowEmail={setShowEmail} url={url} />}
      </div>
    </div>
  );
}
