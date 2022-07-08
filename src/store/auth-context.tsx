import React, { useEffect, useState } from "react";

declare interface RegistrationStepObject {
  step: string;
  isDisplay: boolean;
  isSubmitted: boolean;
  id: number;
  data: {
    [key: string]: any;
  };
}
type AppContextInterface = {
  storeRegisterData: (data: Array<RegistrationStepObject>) => void;
  paymentId: { [key: string]: any } | null;
  storePaymentId: (id: string) => void;
  registerData: RegistrationStepObject[];
};

interface Props {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AppContextInterface | null>(null);

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [paymentId, setPaymentId] = useState<{ [key: string]: any } | null>(
    null
  );
  const [registerData, setRegisterData] = useState<RegistrationStepObject[]>(
    []
  );

  useEffect(() => {
    const paymentId = localStorage.getItem("paymentId");
    const registerData: string = localStorage.getItem("registerData") || "";

    if (registerData) {
      setRegisterData(JSON.parse(registerData));
    }

    if (paymentId) {
      setPaymentId(JSON.parse(paymentId));
    }
  }, []);
  const storeRegisterData = (data: Array<RegistrationStepObject>) => {
    localStorage.setItem("registerData", JSON.stringify(data));
  };

  const storePaymentId = (id: string) => {
    localStorage.setItem("paymentId", JSON.stringify(id));
  };

  return (
    <AuthContext.Provider
      value={{
        storeRegisterData,
        paymentId,
        storePaymentId,
        registerData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
