import React from "react";
import styles from "./footer.module.css";

import footer from "./../../assets/footer/footer.png";

export default function Footer() {
  return (
    <div className={`flex-row-center ${styles.Footer}`}>
      <img src={footer} alt="footer-img" />
    </div>
  );
}
