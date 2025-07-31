export const manageStock = async (
  selectedCommodity,
  quantity,
  operation,
  mutate,
  setFilteredData,
  data,
  filteredData
) => {
  let newQuantity;
  let newEndBalanceQuantity;
  let newConsumptionQuantity;

  const selectedCommodityConsumption = data.find(
    (item) =>
      item.dataElement === selectedCommodity.dataElement &&
      item.orgUnit === selectedCommodity.orgUnit &&
      item.categoryOptionCombo === "J2Qf1jtZuj8"
  );

  if (operation === "add") {
    newQuantity = parseInt(selectedCommodity.value) + parseInt(quantity);
  } else if (operation === "dispense") {
    newEndBalanceQuantity =
      parseInt(selectedCommodity.value) - parseInt(quantity);
    newConsumptionQuantity =
      parseInt(selectedCommodityConsumption.value) + parseInt(quantity);

    if (newEndBalanceQuantity < 0) {
      return { success: false, reason: "quantityExceeded" };
    }
  } else {
    throw new Error("Invalid operation");
  }

  try {
    if (operation === "add") {
      await mutate({
        selectedCommodity,
        newQuantity,
      });
    } else if (operation === "dispense") {
      await mutate({
        selectedCommodity,
        newEndBalanceQuantity,
        newConsumptionQuantity,
      });
    }

    setFilteredData(
      filteredData.map((item) => {
        if (item.name === selectedCommodity.name) {
          return { ...item, value: newEndBalanceQuantity };
        }
        return item;
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Error in mutation:", error);
    return { success: false, error };
  }
};
