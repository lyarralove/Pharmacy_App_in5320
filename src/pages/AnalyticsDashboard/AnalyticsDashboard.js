import { useState, useEffect } from "react";
import { createGraph } from "../../utils/createGraph";
import { HelpButton } from "../../components/HelpButton";
import { Modal, ModalContent } from "@dhis2/ui";
import "./analyticsDashboard.css";

export const AnalyticsDashboard = ({ refetch, data }) => {
  let [localData, setLocalData] = useState([]);
  let [amountDispensed, setAmountDispensed] = useState(0);
  let [mostDispensed, setMostDispensed] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const handleHelpClick = async () => {
    showHelp ? setShowHelp(false) : setShowHelp(true);
  };

  let ADData = {};
  let sums = {};
  let time = new Date(0);

  useEffect(() => {
    for (const row of data) {
      if (ADData[row.dataElement]) {
        sums[row.dataElement] += row.consumption;

        ADData[row.dataElement].data.push({
          label: row.name,
          x: row.consumptionDateUpdated,
          y: sums[row.dataElement],
        });
      } else {
        sums[row.dataElement] = row.consumption;

        time.setTime(Date.parse(row.consumptionDateUpdated) + 3600);
        let newTime = time.toUTCString().split("GMT")[0].split(",")[1].trim();

        newTime = row.consumptionDateUpdated;

        ADData[row.dataElement] = {
          name: row.name,
          id: row.name,
          color: "hsl(182, 70%, 50%)",
          data: [
            {
              label: row.name,
              x: newTime,
              y: sums[row.dataElement],
            },
          ],
        };
      }
    }

    let cleanData = [...Object.values(ADData)];
    let amount = 0;
    let longest = 0;
    let index = 0;

    Object.values(ADData).forEach((e, i) => {
      if (e.data.length > longest) {
        longest = e.data.length;
        index = i;
      }
      amount += e.data.length;
    });

    setMostDispensed(cleanData[index].name);
    setAmountDispensed(amount);
    setLocalData(cleanData);
    refetch();
  }, [data, refetch]);

  return (
    <div>
      <div className="same-line-left">
        <h1>Analytics Dashboard</h1> &nbsp;&nbsp;&nbsp;
        <HelpButton handleOnClick={handleHelpClick} />
      </div>
      <div className="graph-container">
        {localData && createGraph(localData)}
      </div>
      <div className="summary-container">
        <h2>Summary</h2>
        <p>
          <strong>Total amount of commodities dispensed</strong>:{" "}
          {amountDispensed}
        </p>
        <p>
          <strong>Most dispensed</strong>: {mostDispensed}
        </p>
      </div>
      {showHelp && (
        <Modal onClose={handleHelpClick} className="help-modal">
          <ModalContent>
            <h2>Help</h2>
            <p>
              This page shows you the statistics over the dispensed commodities
              in graph form and provides a short summary. To the right of the
              graph you will see a list of the commodities displayed and their
              corresponding line color.
            </p>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
