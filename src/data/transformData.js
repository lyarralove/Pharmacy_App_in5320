export const transformData = (data) => {
  const ORGUNIT = "mUuCjQWMaOc";
  const consumptionID = "J2Qf1jtZuj8";
  const endBalanceID = "KPP63zJPkOu";
  const QTBOID = "rQLFnNXXIL0";

  let sortedDataValues = data
    .filter((e) => e.orgUnit === ORGUNIT)
    .sort((a, b) => {
      return a.dataElement.localeCompare(b.dataElement);
    });

  let currentDataElement = "";
  let currentDataValue = null;
  let newDataValues = [];

  let time = new Date(0);

  for (const dataValue of sortedDataValues) {
    if (dataValue.dataElement.localeCompare(currentDataElement) !== 0) {
      if (currentDataValue !== null) {
        newDataValues.push(currentDataValue);
      }

      let fields = {};
      let A = ["consumption", "endBalance", "quantityToBeOrdered"];
      let B = ["StoredBy", "DateCreated", "DateUpdated"];

      for (const a of A) {
        for (const b of B) {
          fields[a + b] = "";
        }
        fields[a] = 0;
      }

      currentDataElement = dataValue.dataElement;
      currentDataValue = {
        name: dataValue.name,
        distance: dataValue.distance,
        orgUnitName: dataValue.orgUnitName,
        dataElement: dataValue.dataElement,
        period: dataValue.period,
        orgUnit: dataValue.orgUnit,
        ...fields,
      };
    }

    let value = dataValue ? parseInt(dataValue.value) : 0;
    let created, updated;
    let type;

    switch (dataValue.categoryOptionCombo) {
      case consumptionID:
        type = "consumption";
        break;
      case endBalanceID:
        type = "endBalance";
        break;
      case QTBOID:
        type = "quantityToBeOrdered";
        break;
      default:
        continue;
    }

    time.setTime(Date.parse(dataValue.created) + 3600);
    created = time.toUTCString().split("GMT")[0].split(",")[1].trim();

    time.setTime(Date.parse(dataValue.lastUpdated) + 3600);
    updated = time.toUTCString().split("GMT")[0].split(",")[1].trim();

    currentDataValue[type] = value;
    currentDataValue[type + "StoredBy"] = dataValue.storedBy;
    currentDataValue[type + "DateCreated"] = created;
    currentDataValue[type + "DateUpdated"] = updated;
  }

  if (currentDataValue !== null) newDataValues.push(currentDataValue);

  return newDataValues;
};
