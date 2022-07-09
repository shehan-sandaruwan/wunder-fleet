import React from "react";
import styles from "../styles/SuccessMessage.module.scss";
import homeAlpha from "../styles/images/home-alpha.svg";

type Props = {
  paymentId: string;
};

const SuccesMessage = (props: Props) => {
  return (
    <React.Fragment>
      <div className={styles.successContainer}>
        <div className={styles.detailsContainer}>
          <label className={styles.title1}>Registration Success!</label>
          <label className={styles.title1}>{props.paymentId}</label>
          <label className={styles.title2}>
            Accelerate your vehicle sharing business
          </label>
          <label className={styles.title1}>
            Launch and scale your scooter, moped, bike or car sharing service
            with ease. Get the software and vehicles you need quickly – move
            forward faster with a one-stop-shop to help you grow your company.
          </label>
        </div>
        <img src={homeAlpha} alt="background images" />
      </div>
    </React.Fragment>
  );
};

export default SuccesMessage;
