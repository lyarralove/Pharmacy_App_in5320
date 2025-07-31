export const reportData = async (updatedCommodities, mutate) => {
  let errors = [];

  Promise.allSettled(
    updatedCommodities.map(async (commodity) => {
      const endBalance = Math.max(parseInt(commodity.endBalance, 10), 0);
      const quantityToBeOrdered = Math.max(
        parseInt(commodity.quantityToBeOrdered, 10),
        0
      );
      const newCurrentStock = (endBalance + quantityToBeOrdered).toString();

      const mutations = [
        {
          dataElement: commodity.dataElement,
          categoryOptionCombo: "KPP63zJPkOu",
          value: newCurrentStock,
        }, // End Balance
        {
          dataElement: commodity.dataElement,
          categoryOptionCombo: "J2Qf1jtZuj8",
          value: "0",
        }, // Consumption
      ];

      for (const mutation of mutations) {
        const response = await mutate(mutation);
        if (response.status === "rejected") {
          errors.push({ ...mutation, error: response.reason });
        }
      }
    })
  ).then((results) => {
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        errors.push({
          commodity: updatedCommodities[index],
          error: result.reason,
        });
      }
    });
  });

  if (errors.length > 0) {
    console.error("Error in mutation:", errors);
    return { success: false, errors: errors };
  }

  return { success: true };
};
