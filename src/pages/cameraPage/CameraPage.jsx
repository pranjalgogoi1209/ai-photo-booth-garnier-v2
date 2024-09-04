import React, { useState, useRef, useEffect } from "react";
import styles from "./cameraPage.module.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";
import Header from "../../components/header/Header";

export default function CameraPage({ setCapturedImg }) {
  const webRef = useRef();
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [isCaptured, setIsCaptured] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let countdownInterval;

    if (isCounting && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (isCounting && countdown === 0) {
      // Capture the screenshot when countdown hits 0
      if (webRef.current.getScreenshot()) {
        setIsCaptured(true);
        setImg(webRef.current.getScreenshot());
      }
      setIsCounting(false); // Stop counting
    }

    return () => clearInterval(countdownInterval); // Cleanup interval on unmount or re-run
  }, [isCounting, countdown]);

  const handleCapture = (e) => {
    // Reset countdown and start it
    setCountdown(3);
    setIsCounting(true);
  };

  const handleRetake = (e) => {
    setIsCaptured(false);
    setImg("");
    setCountdown(3); // Reset countdown for retake
  };

  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmit = () => {
    if (img) {
      setCapturedImg(img);
      navigate("/avatar");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };

  return (
    <div className={`flex-col-center ${styles.CameraPage}`}>
      <Header />

      <div className={`flex-col-center ${styles.cameraPageWrapper}`}>
        <h1>{isCaptured ? "Do You Like This ?" : "Capture Your Face"}</h1>

        <main className={`flex-col-center ${styles.main}`}>
          <div className={styles.webcamParent}>
            {!img && (
              <Webcam
                ref={webRef}
                id={styles.webcam}
                forceScreenshotSourceSize={true}
              />
            )}

            {!isCaptured && isCounting && (
              <h1 className={styles.countdown}>{countdown}</h1>
            )}

            {img && (
              <img
                src={img}
                alt="captured image"
                className={styles.capturedImage}
              />
            )}
          </div>
        </main>

        <footer className={`flex-col-center ${styles.footer}`}>
          {isCaptured ? (
            <div className={`flex-row-center ${styles.foot}`}>
              <button onClick={(e) => handleRetake(e)} className={`btn1`}>
                RETAKE
              </button>

              <button onClick={handleSubmit} className={`btn1`}>
                SUBMIT
              </button>
            </div>
          ) : (
            <div className={`flex-row-center ${styles.foot}`}>
              <button
                onClick={(e) => handleRetake(e)}
                disabled={isCaptured ? false : true}
                className={`btn1`}
              >
                RETAKE
              </button>

              <button onClick={(e) => handleCapture(e)} className={`btn1`}>
                CAPTURE
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
