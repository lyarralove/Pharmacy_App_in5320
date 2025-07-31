import { useState, useEffect } from "react";
import { Button, Modal, ModalContent } from "@dhis2/ui";
import { CustomReportTable } from "../../components/CustomReportTable";
import { CustomModal } from "../../components/CustomModal";
import { Alert } from "../../components/Alert";
import "./monthlyReport.css";
import { useDataMutation } from "@dhis2/app-runtime";
import { reportData } from "../../data/reportData";
import { transformData } from "../../data/transformData";
import { HelpButton } from "../../components/HelpButton";

const REPORT_MUTATION = {
  resource: "dataValueSets",
  type: "create",
  data: ({ dataElement, categoryOptionCombo, value }) => ({
    dataSet: "ULowA8V3ucd", // Life-Saving Commodities
    orgUnit: "mUuCjQWMaOc", // Bambara MCHP
    period: "202311",
    dataValues: [
      {
        dataElement: dataElement,
        categoryOptionCombo: categoryOptionCombo,
        value: value,
      },
    ],
  }),
};

export const Monthlyreport = ({ data, refetch }) => {
  const [mutate, { error: mutateError }] = useDataMutation(REPORT_MUTATION);
  const [localData, setLocalData] = useState(data || []);
  const [showModal, setShowModal] = useState(false);
  const [reportAlert, setReportAlert] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const handleHelpClick = async () => {
    showHelp ? setShowHelp(false) : setShowHelp(true);
  };

  const columns = [
    { key: "name", title: "Commodity" },
    { key: "consumption", title: "Consumption" },
    { key: "endBalance", title: "Current stock" },
    { key: "quantityToBeOrdered", title: "Quantity to be ordered" },
  ];

  const colInput = {
    key: "quantityToBeOrdered",
    title: "Quantity to be ordered",
  };

  useEffect(() => {
    let transformedData = transformData(data);
    if (alertInfo) {
      const timer = setTimeout(() => setAlertInfo(null), 3000);
      return () => clearTimeout(timer);
    }
    setLocalData(transformedData);
  }, [data, alertInfo]);

  useEffect(() => {
    if (reportAlert && reportAlert.state === "success") {
      const timer = setTimeout(() => {
        setReportAlert(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reportAlert]);

  const handleQuantityChange = (index, event) => {
    if (event.length == 0) {
      ("this is a temporary string");
    } else if (event === "" || event < 0 || /-/.test(event)) {
      setAlertInfo({
        state: "warning",
        message: "Please enter a positive quantity.",
      });
      return false;
    } else if (event.includes(".")) {
      setAlertInfo({
        state: "warning",
        message: "No decimals.",
      });
      return false;
    } else if (event.length > 4) {
      setAlertInfo({
        state: "warning",
        message: "Max 4 digits.",
      });
      return false;
    }
    setLocalData((currentData) =>
      currentData.map((dataItem, i) =>
        i === index ? { ...dataItem, quantityToBeOrdered: event } : dataItem
      )
    );
  };

  const handleConfirm = async () => {
    if (localData) {
      let result = await reportData(localData, mutate);

      if (result.success) {
        setReportAlert({
          message: "Report sent successfully",
          state: "success",
        });
      } else {
        setReportAlert({
          message: "Report was not sent!",
          state: "error",
        });

        console.error(result.errors);
      }
    } else {
      setReportAlert({
        message: "Unable to load data!",
        state: "warning",
      });
    }

    setShowModal(false);
    refetch();
  };

  return (
    <div>
      <div className="top-container">
        <div className="same-line-left">
          <h1>Monthly report</h1> &nbsp;&nbsp;&nbsp;
          <HelpButton handleOnClick={handleHelpClick} />
        </div>
        <div>
          <Button
            name="Primary button"
            className="report-button"
            onClick={() => setShowModal(true)}
            primary
            value="default"
          >
            Send in report
          </Button>
        </div>
      </div>

      {showModal && (
        <CustomModal
          title={"Confirm sending in report"}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        >
          <p>(This action cannot be undone)</p>
        </CustomModal>
      )}

      {reportAlert && (
        <Alert state={reportAlert.state} message={reportAlert.message} />
      )}

      {localData && (
        <CustomReportTable
          data={localData}
          columns={columns}
          colInput={colInput}
          handleQuantityChange={handleQuantityChange}
        />
      )}
      {alertInfo && (
        <Alert state={alertInfo.state} message={alertInfo.message} />
      )}
      {showHelp && (
        <Modal onClose={handleHelpClick} className="help-modal">
          <ModalContent>
            <h2>Help</h2>
            <p>
              This page shows the monthly report for the clinic. It contains
              statistics for the current stock, consumption and quantity to be
              ordered of each commodity. The quantity to be ordered is an input
              field, meaning that you can write in the amount you need. To
              complete the form click the “Send in report” button.
            </p>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
