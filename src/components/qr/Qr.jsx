import React from "react";
import styles from "./qr.module.css";

import QRCode from "react-qr-code";
import { IoIosCloseCircle } from "react-icons/io";

import close from "./../../assets/close.svg";

export default function Qr({ url, setShowQr }) {
  // Customize the colors
  const qrColor = "#000000"; // Foreground color (QR code)
  const qrBgColor = "#ffffff"; // Background color

  return (
    <div className={styles.Qr} onClick={() => setShowQr(false)}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>SCAN, SAVE, SHARE!</h1>
        {!url && <span className="loader"></span>}
        {url && (
          <QRCode
            size={256}
            value={url}
            className={styles.qrCode}
            fgColor={qrColor}
            bgColor={qrBgColor}
          />
        )}

        {/* close */}
        <div className={styles.close} onClick={() => setShowQr(false)}>
          <img src={close} alt="close" />
          {/* <IoIosCloseCircle /> */}
        </div>
      </div>
    </div>
  );
}
