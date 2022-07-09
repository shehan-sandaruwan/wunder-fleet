import React, { useState, useEffect } from "react";
import "./global.scss";
import styles from "./styles/App.module.scss";
import Navbar from "./Components/Navbar";
import homeAlpha from "./styles/images/home-alpha.svg";
import Registration from "./Components/Registration";
import AuthContext from "./store/auth-context";

declare interface RegistrationStepObject {
  step: string;
  isDisplay: boolean;
  isSubmitted: boolean;
  id: number;
  data: {
    [key: string]: any;
  };
}

declare interface RegisterProps {
  data: Array<RegistrationStepObject>;
  isUserRegistered: boolean;
  paymentId: { [key: string]: any } | null;
}

function App() {
  const [isShowRegistration, setIsShowRegistration] = useState(false);
  const [isRegisteredUser, setIsRegisterdUser] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const context = React.useContext(AuthContext);
  const [registerData, setRegisterData] = useState<RegisterProps>({
    data: [],
    isUserRegistered: false,
    paymentId: null,
  });
  const [isPartiallyRegistered, setIsPartiallyRegisterd] = useState(false);

  useEffect(() => {
    const paymentId = context?.paymentId;

    if (paymentId) {
      setIsRegisterdUser(true);
      setShowButton(false);
    } else {
      const data = context?.registerData;
      if (data && data.length > 0) {
        setRegisterData({
          ...registerData,
          data: data,
          isUserRegistered: true,
        });
        setIsPartiallyRegisterd(true);
        setShowButton(true);
      } else {
        setShowButton(true);
      }
    }
  }, [context]);

  const onRegistrationClickHandler = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    if (!isRegisteredUser) {
      setIsShowRegistration(true);
      setShowButton(false);
    }
  };

  const onHomeLogoClickHandler = () => {
    setIsShowRegistration(false);
  };

  return (
    <React.Fragment>
      <main className={styles.mainContainer}>
        <Navbar
          showRegistration={showButton}
          isPartiallyRegistered={isPartiallyRegistered}
          logoClickHandler={onHomeLogoClickHandler}
          onregisterClickHandler={onRegistrationClickHandler}
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
                {!isRegisteredUser && (
                  <div>
                    <button
                      className={styles.registerButton}
                      onClick={onRegistrationClickHandler}
                    >
                      {isPartiallyRegistered ? "Continue" : "Register"}
                    </button>
                  </div>
                )}
              </div>
              <img src={homeAlpha} alt="background images" />
            </div>
          </picture>
        )}
        {isShowRegistration && <Registration registerData={registerData} />}
      </main>
    </React.Fragment>
  );
}

export default App;
