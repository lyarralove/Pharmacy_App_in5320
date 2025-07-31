import "../pages/Commodities/commodities.css";
import { AlertBar } from "@dhis2/ui";

export const Alert = ({ message, state }) => {
  const alertStates = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
  };

  const alertProps = { [alertStates[state] || ""]: true, permanent: true };

  return (
    <div className="alert-bars">
      <AlertBar {...alertProps}>{message}</AlertBar>
    </div>
  );
};
