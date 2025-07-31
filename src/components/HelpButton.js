import { HelpIcon } from "./HelpIcon";
import { Tooltip } from "@dhis2/ui";
import "../styles/icons.css";

export const HelpButton = ({ handleOnClick }) => {
  return (
    <div className="help-icon" onClick={handleOnClick}>
      <Tooltip className="tooltip" content="click me for help!">
        <HelpIcon />
      </Tooltip>
    </div>
  );
};
