import React from "react";
import styles from "../styles/SuccessMessage.module.scss";
import homeAlpha from "../styles/images/home-alpha.svg";
import { motion } from "framer-motion";

type Props = {
  paymentId: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const SuccesMessage = (props: Props) => {
  return (
    <React.Fragment>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.successContainer}
      >
        <motion.div variants={item} className={styles.detailsContainer}>
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
        </motion.div>
        <img src={homeAlpha} alt="background images" />
      </motion.div>
    </React.Fragment>
  );
};

export default SuccesMessage;
