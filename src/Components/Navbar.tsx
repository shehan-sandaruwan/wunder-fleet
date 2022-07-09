import React from "react";
import styles from "../styles/Navbar.module.scss";

declare interface AppProps {
  showRegistration: boolean;
  isPartiallyRegistered: boolean;
  logoClickHandler: React.MouseEventHandler<HTMLLabelElement>;
  onregisterClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const Navbar = (props: AppProps) => {
  return (
    <React.Fragment>
      <nav className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          <div className={styles.navbarMainLogo}>
            <label
              onClick={props.logoClickHandler}
              style={{ cursor: "pointer" }}
            >
              Wunder Mobility
            </label>
          </div>
          {props.showRegistration && (
            <div>
              <button
                className={styles.registerButton}
                onClick={props.onregisterClickHandler}
              >
                {props.isPartiallyRegistered ? "Continue" : "Register"}
              </button>
            </div>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
