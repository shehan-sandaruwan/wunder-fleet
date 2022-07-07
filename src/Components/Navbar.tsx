import React from "react";
import styles from "../styles/Navbar.module.scss";

declare interface AppProps {
  showRegistration: boolean;
  logoClickHandler: React.MouseEventHandler<HTMLLabelElement>;
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
          {!props.showRegistration && (
            <div>
              <button className={styles.registerButton}>Register</button>
            </div>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
