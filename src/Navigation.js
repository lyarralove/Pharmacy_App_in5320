import { Menu, MenuItem } from "@dhis2/ui";

export const Navigation = (props) => {
  return (
    <Menu>
      <MenuItem
        label="Dispense Commodities"
        active={props.activePage == "Commodities"}
        onClick={() => props.activePageHandler("Commodities")}
      />
      <MenuItem
        label="Dispensing History"
        active={props.activePage == "History"}
        onClick={() => props.activePageHandler("History")}
      />
      <MenuItem
        label="Monthly Report"
        active={props.activePage == "Monthlyreport"}
        onClick={() => props.activePageHandler("Monthlyreport")}
      />
      <MenuItem
        label="Nearby clinics"
        active={props.activePage == "InternalTransfer"}
        onClick={() => props.activePageHandler("InternalTransfer")}
      />
      <MenuItem
        label="Analytics Dashboard"
        active={props.activePage == "AnalyticsDashboard"}
        onClick={() => props.activePageHandler("AnalyticsDashboard")}
      />
    </Menu>
  );
};
