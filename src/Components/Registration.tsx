import React, { useState } from "react";
import styles from "../styles/Registration.module.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { submitUserDetails } from "../api-service/registration-api-service";
import AlertUtil from "../utils/alert-utils";
import CircularProgress from "@mui/material/CircularProgress";
import SuccesMessage from "./SuccessMessage";
import { useEffect } from "react";
import AuthContext from "../store/auth-context";

declare interface RegistrationStep {
  step: {
    step: string;
    isDisplay: boolean;
    isSubmitted: boolean;
    id: number;
    data: {
      [key: string]: any;
    };
  };
  index: number;
  onStepItemClickHandler: Function;
  onButtonClickHandler: Function;
  apiResponseWaiting: boolean;
}

declare interface RegistrationStepObject {
  step: string;
  isDisplay: boolean;
  isSubmitted: boolean;
  id: number;
  data: {
    [key: string]: any;
  };
}
declare interface AppProps {
  registerData: {
    data: Array<RegistrationStepObject>;
    paymentId: { [key: string]: any } | null;
    isUserRegistered: boolean;
  };
}

const initRegistrationSteps: Array<RegistrationStepObject> = [
  {
    step: "Personal information",
    isDisplay: true,
    isSubmitted: false,
    id: 1,
    data: {
      first_name: "",
      last_name: "",
      phone: "",
    },
  },
  {
    step: "Address information",
    isDisplay: false,
    isSubmitted: false,
    id: 2,
    data: {
      house_number: "",
      post_code: "",
      city: "",
    },
  },
  {
    step: "Payment information",
    isDisplay: false,
    isSubmitted: false,
    id: 3,
    data: {
      account_owner: "",
      account_number: "",
      IBAN: "",
    },
  },
];

const Registration = (props: AppProps) => {
  const { registerData } = props;
  const context = React.useContext(AuthContext);
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
  const [apiResponseMessage, setApiResponseMessage] = useState({
    message: "",
    severity: "",
  });

  const [apiResponseWaiting, setApiResponseWaiting] = useState(false);
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);
  const [paymentId, setPaymentId] = useState<string>("");

  useEffect(() => {
    if (registerData.data.length > 0) {
      setRegistrationSteps(registerData.data);

      const notCompletedObj = registerData.data.filter(
        (item) => !item.isSubmitted
      );

      if (notCompletedObj) {
        setIsRegistrationCompleted(false);
      } else {
        setIsRegistrationCompleted(true);
      }
    }
  }, [registerData]);

  const onHandleRegistration = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setIsStartRegistration(true);
  };

  const handleRegistrationButtonClick = (data: {}, id: number) => {
    let nextId = 0;
    if (id === 3) {
      sumbitPaymentDetails(data);
    } else {
      const newRegistrationStep = registrationSteps.map((step, index) => {
        if (step.id === id) {
          step.data = data;
          step.isSubmitted = true;
          step.isDisplay = false;
          nextId = step.id + 1;
        } else if (nextId && index === nextId - 1) {
          step.isDisplay = true;
        }

        return step;
      });

      setRegistrationSteps(newRegistrationStep);
      context?.storeRegisterData(newRegistrationStep);
    }
  };

  const sumbitPaymentDetails = (data: { [key: string]: any }) => {
    const req = {
      customerId: Math.random() * 100,
      iban: data.IBAN,
      owner: data.account_owner,
    };

    setApiResponseWaiting(true);
    setApiResponseMessage({
      message: "",
      severity: "",
    });
    submitUserDetails(req)
      .then((resp: any) => {
        setApiResponseWaiting(false);
        if (resp.status === 200) {
          setApiResponseMessage({
            message: "Payment details submitted success !",
            severity: "success",
          });
          setIsRegistrationCompleted(true);
          setPaymentId(resp.data.paymentDataId);
          context?.storePaymentId(resp.data);
        }
      })
      .catch((err) => {
        setApiResponseWaiting(false);
        setApiResponseMessage({
          message: "Error in submit payment details",
          severity: "error",
        });
      });
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
      {!isRegistrationCompleted && (
        <>
          {apiResponseMessage.message !== "" && (
            <AlertUtil
              message={apiResponseMessage.message}
              severity={apiResponseMessage.severity}
            />
          )}
          <div className={styles.registrationContainer}>
            <div className={styles.headerBanner}>
              <div className={styles.headerBannerDetails}>
                <label className={styles.bannerTitle}>
                  Complete your Registration
                </label>
                <label className={styles.bannerDescription}>
                  Struggling with defining your fleet size? We developed a
                  framework to identify opportunities for your shared mobility
                  fleet
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
            {(isStartRegistration || !isRegistrationCompleted) && (
              <div className={styles.stepItemsContainer}>
                {registrationSteps.map((_step, _index) => {
                  return (
                    <RegistrationStepRendere
                      key={_step.id}
                      step={_step}
                      index={_index}
                      onStepItemClickHandler={handleStepItemClick}
                      onButtonClickHandler={handleRegistrationButtonClick}
                      apiResponseWaiting={apiResponseWaiting}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
      {isRegistrationCompleted && <SuccesMessage paymentId={paymentId} />}
    </React.Fragment>
  );
};

const RegistrationStepRendere = (props: RegistrationStep) => {
  const [registrationData, setRegistrationData] = useState<{
    [key: string]: any;
  }>(props.step.data);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...registrationData };
    newData[event.target.name] = event.target.value;

    setRegistrationData({
      ...newData,
    });
  };

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
                  <input
                    className={styles.formInput}
                    value={registrationData.first_name}
                    placeholder="Tom"
                    name="first_name"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>Last name</label>
                  <input
                    className={styles.formInput}
                    placeholder="Peter"
                    value={registrationData.last_name}
                    name="last_name"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>Telephone</label>
                  <input
                    className={styles.formInput}
                    placeholder="+49 173 1234 567 incl. country code"
                    value={registrationData.phone}
                    name="phone"
                    onChange={handleChange}
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
                    name="street"
                    value={registrationData.street}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>House number</label>
                  <input
                    className={styles.formInput}
                    placeholder="No 1502"
                    name="house_number"
                    value={registrationData.house_number}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>Zip code</label>
                  <input
                    className={styles.formInput}
                    placeholder="UK 10685"
                    name="post_code"
                    value={registrationData.post_code}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>City</label>
                  <input
                    className={styles.formInput}
                    placeholder="London"
                    name="city"
                    value={registrationData.city}
                    onChange={handleChange}
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
                    name="account_owner"
                    value={registrationData.account_owner}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>Account number</label>
                  <input
                    className={styles.formInput}
                    placeholder="42222 2222"
                    name="account_number"
                    value={registrationData.account_number}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className={styles.inputName}>IBAN</label>
                  <input
                    className={styles.formInput}
                    placeholder="BE68539007547034"
                    value={registrationData.IBAN}
                    name="IBAN"
                    onChange={handleChange}
                  ></input>
                </div>
              </>
            )}
            <div>
              <button
                className={styles.nextButton}
                onClick={(e) =>
                  props.onButtonClickHandler(registrationData, props.step.id)
                }
              >
                {props.step.id === 3 ? "Submit" : "Next"}
              </button>
              {props.apiResponseWaiting && (
                <div className={styles.progressbar}>
                  <CircularProgress sx={{ color: "#e2e2e2" }} />
                </div>
              )}
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
              <CheckCircleIcon
                sx={{ width: 45, height: 45, color: "#000d36" }}
              />
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
