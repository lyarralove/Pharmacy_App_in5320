import React, { useState, useEffect } from "react";
import { InputField, Menu, MenuItem, Modal, ModalContent } from "@dhis2/ui";
import "./internalTransfer.css";
import { CustomTable } from "../../components/CustomTable";
import { HelpButton } from "../../components/HelpButton";

export const InternalTransfer = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [uniqueCommodities, setUniqueCommodities] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const handleHelpClick = async () => {
    showHelp ? setShowHelp(false) : setShowHelp(true);
  };

  const columns = [
    { key: "orgUnitName", title: "Hospital" },
    { key: "name", title: "Commodity" },
    { key: "value", title: "Stock" },
    { key: "distance", title: "Distance (in km)" },
  ];

  useEffect(() => {
    if (selectedCommodity) {
      const relatedOrgUnits = data
        .filter(
          (item) =>
            item.dataElement === selectedCommodity &&
            item.orgUnit !== "mUuCjQWMaOc" &&
            item.categoryOptionCombo === "KPP63zJPkOu"
        )
        .sort((a, b) => a.distance - b.distance);
      setDisplayData(relatedOrgUnits);
    } else {
      setDisplayData([]);
    }
  }, [selectedCommodity, data]);

  const handleSearchChange = (event) => {
    setSearchValue(event.value);
    if (event.value) {
      const searchLower = event.value.toLowerCase();
      const uniqueNamesSet = new Set(
        data
          .filter((item) => item.name.toLowerCase().includes(searchLower))
          .map((item) => item.name)
      );
      setUniqueCommodities(Array.from(uniqueNamesSet));
    } else {
      setUniqueCommodities([]);
    }
  };

  const selectCommodity = (commodityName) => {
    const commodity = data.find((item) => item.name === commodityName);
    setSelectedCommodity(commodity?.dataElement);
    setSearchValue("");
  };

  const handleMenuItemClick = (commodityName) => {
    selectCommodity(commodityName);
  };

  const handleKeyDown = (customEvent, nativeEvent) => {
    // for some reason, if I remove the customEvent parameter, onKeyDown doesn't work?
    if (nativeEvent.key === "Enter" && searchValue) {
      const matchingCommodities = data.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      const uniqueDataElements = Array.from(
        new Set(matchingCommodities.map((item) => item.dataElement))
      );

      const relatedOrgUnits = data
        .filter(
          (item) =>
            uniqueDataElements.includes(item.dataElement) &&
            item.orgUnit !== "mUuCjQWMaOc" &&
            item.categoryOptionCombo === "KPP63zJPkOu"
        )
        .sort((a, b) => a.distance - b.distance);

      setDisplayData(relatedOrgUnits);
      setSearchValue("");
    }
  };

  return (
    <div>
      <div className="same-line-left">
        <h1>Nearby clinics</h1> &nbsp;&nbsp;&nbsp;
        <HelpButton handleOnClick={handleHelpClick} />
      </div>
      <h3>Check available commodity stock of nearby clinics</h3>
      <div className="search-dropdown">
        <InputField
          label="Search for a commodity"
          className="search-input"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {searchValue && (
          <Menu className="flyout-menu" dense>
            {uniqueCommodities.map((commodityName, index) => (
              <MenuItem
                key={index}
                label={commodityName}
                onClick={() => handleMenuItemClick(commodityName)}
              />
            ))}
          </Menu>
        )}
      </div>
      <CustomTable columns={columns} data={displayData} />
      {showHelp && (
        <Modal onClose={handleHelpClick} className="help-modal">
          <ModalContent>
            <h2>Help</h2>
            <p>
              This page lets you look at the stock levels of commodities in
              nearby clinics. After putting in the desired commodity into the
              input field, “Hit the Enter-key” or “Click” on the commodity from
              the drop-down menu. The table will then show you the nearest
              hospitals and their stock-levels.
            </p>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
