export const updateHistoryData = async (
  newData,
  quantity,
  updatedData,
  recipient,
  mutate
) => {
  let errors = [];

  let newDataElement = {
    dataElement: newData.dataElement,
    name: newData.name,
    recipient: recipient,
    consumption: parseInt(quantity),
    consumptionStoredBy: newData.storedBy,
    consumptionDateUpdated: newData.lastUpdated,
  };

  await mutate({ data: [...updatedData, newDataElement] })
    .then((e) => console.log("SUCCESS", e))
    .catch((error) => {
      errors.push({
        ...updatedData,
        error: error,
      });
    });

  if (errors.length > 0) {
    console.error("Error in mutation:", errors);
    return { success: false, errors: errors };
  }

  return { success: true };
};
