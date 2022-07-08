import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

declare interface ToastProps {
  message: string;
  severity: string;
}

const AlertUtils = (props: ToastProps) => {
  const { message, severity } = props;
  useEffect(() => {
    if (message !== "") {
      if (severity === "success") {
        toast.success(message);
      } else if (severity === "error") {
        toast.error(message);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AlertUtils;
