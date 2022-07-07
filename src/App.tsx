import React, { useState } from "react";
import styles from "./styles/App.module.scss";
import Navbar from "./Components/Navbar";
import homeAlpha from "./styles/images/home-alpha.svg";
import Registration from "./Components/Registration";

function App() {
  const [isShowRegistration, setIsShowRegistration] = useState(false);

  const onRegistrationClickHandler = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setIsShowRegistration(true);
  };

  const onHomeLogoClickHandler = () => {
    setIsShowRegistration(false);
  };

  return (
    <React.Fragment>
      <main className={styles.mainContainer}>
        <Navbar
          showRegistration={isShowRegistration}
          logoClickHandler={onHomeLogoClickHandler}
        />
        {!isShowRegistration && (
          <picture className={styles.mainHeroSection}>
            <div className={styles.heroContent}>
              <div className={styles.heroTextContainer}>
                <div className={styles.heroContentText}>
                  <span>
                    Launch, manage &amp; scale your vehicle sharing service
                  </span>
                </div>
                <div>
                  <button
                    className={styles.registerButton}
                    onClick={onRegistrationClickHandler}
                  >
                    Register
                  </button>
                </div>
              </div>
              <img src={homeAlpha} alt="background images" />
            </div>
          </picture>
        )}
        {isShowRegistration && (
          <Registration showRegistration={isShowRegistration} />
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
