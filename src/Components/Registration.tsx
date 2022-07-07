import React, { useState } from "react";
import styles from "../styles/Registration.module.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

declare interface AppProps {
  showRegistration: boolean;
}

declare interface RegistrationStep {
  step: {
    step: string;
    isDisplay: boolean;
    isSubmitted: boolean;
    id: number;
    data: {};
  };
  index: number;
  onStepItemClickHandler: Function;
}

const initRegistrationSteps: Array<{
  step: string;
  isDisplay: boolean;
  isSubmitted: boolean;
  id: number;
  data: {};
}> = [
  {
    step: "Personal information",
    isDisplay: true,
    isSubmitted: false,
    id: 1,
    data: {},
  },
  {
    step: "Address information",
    isDisplay: false,
    isSubmitted: false,
    id: 2,
    data: {},
  },
  {
    step: "Payment information",
    isDisplay: false,
    isSubmitted: false,
    id: 3,
    data: {},
  },
];

const Registration = (props: AppProps) => {
  const [isStartRegistration, setIsStartRegistration] = useState(false);
  const [registrationSteps, setRegistrationSteps] = useState<
    {
      step: string;
      isDisplay: boolean;
      isSubmitted: boolean;
      id: number;
      data: {};
    }[]
  >(initRegistrationSteps);

  const onHandleRegistration = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setIsStartRegistration(true);
  };

  const handleStepItemClick = (id: number) => {
    const newStepArray = registrationSteps.map((item) => {
      if (item.id === id) {
        item.isDisplay = true;
        item.isSubmitted = false;
      } else {
        item.isDisplay = false;
      }

      return item;
    });

    setRegistrationSteps(newStepArray);
  };
  return (
    <React.Fragment>
      <div className={styles.registrationContainer}>
        <div className={styles.headerBanner}>
          <div className={styles.headerBannerDetails}>
            <label className={styles.bannerTitle}>
              Complete your Registration
            </label>
            <label className={styles.bannerDescription}>
              Struggling with defining your fleet size? We developed a framework
              to identify opportunities for your shared mobility fleet
            </label>
          </div>
          <div>
            <button
              className={styles.continueButton}
              disabled={isStartRegistration}
              onClick={onHandleRegistration}
            >
              Continue
            </button>
          </div>
        </div>
        {isStartRegistration && (
          <div className={styles.stepItemsContainer}>
            {registrationSteps.map((_step, _index) => {
              return (
                <RegistrationStepRendere
                  step={_step}
                  index={_index}
                  onStepItemClickHandler={handleStepItemClick}
                />
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const RegistrationStepRendere = (props: RegistrationStep) => {
  return (
    <React.Fragment>
      {props.step.isDisplay ? (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <label className={styles.title1}>{`Step ${props.step.id}`}</label>
            <label className={styles.title2}>{props.step.step}</label>
          </div>
          <div className={styles.formInputContainer}>
            {props.step.id === 1 && (
              <>
                <div>
                  <label className={styles.inputName}>First name</label>
                  <input className={styles.formInput} placeholder="Tom"></input>
                </div>
                <div>
                  <label className={styles.inputName}>Last name</label>
                  <input
                    className={styles.formInput}
                    placeholder="Peter"
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>Telephone</label>
                  <input
                    className={styles.formInput}
                    placeholder="+49 173 1234 567 incl. country code"
                  ></input>
                </div>
              </>
            )}
            {props.step.id === 2 && (
              <>
                <div>
                  <label className={styles.inputName}>Street</label>
                  <input
                    className={styles.formInput}
                    placeholder="street"
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>House number</label>
                  <input
                    className={styles.formInput}
                    placeholder="No 1502"
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>Zip code</label>
                  <input
                    className={styles.formInput}
                    placeholder="UK 10685"
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>City</label>
                  <input
                    className={styles.formInput}
                    placeholder="London"
                  ></input>
                </div>
              </>
            )}
            {props.step.id === 3 && (
              <>
                <div>
                  <label className={styles.inputName}>Account owner</label>
                  <input
                    className={styles.formInput}
                    placeholder="Tom Peter"
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>Account number</label>
                  <input
                    className={styles.formInput}
                    placeholder="42222 2222"
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>IBAN</label>
                  <input
                    className={styles.formInput}
                    placeholder="BE68539007547034"
                  ></input>
                </div>
              </>
            )}
            <div>
              <button className={styles.nextButton}>
                {props.step.id === 3 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={styles.stepContainer}
          onClick={() => props.onStepItemClickHandler(props.step.id)}
        >
          <div className={styles.stepIcon}>
            {props.step.isSubmitted ? (
              <CheckCircleIcon sx={{ width: 45, height: 45 }} />
            ) : (
              <CheckCircleOutlineIcon
                sx={{ width: 45, height: 45, color: "#000d36" }}
              />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Registration;
