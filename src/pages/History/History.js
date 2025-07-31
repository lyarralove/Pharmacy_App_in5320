import { useState, useEffect } from "react";
import { CustomTable } from "../../components/CustomTable";
import { HelpButton } from "../../components/HelpButton";
import { Modal, ModalContent, Pagination } from "@dhis2/ui";

export const History = ({ data, refetch }) => {
  const [localData, setLocalData] = useState(data || []);
  const [showHelp, setShowHelp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalNumberOfPages = Math.ceil((data?.length || 0) / pageSize);

  const handleHelpClick = async () => {
    showHelp ? setShowHelp(false) : setShowHelp(true);
  };
  const columns = [
    { key: "consumptionDate", title: "Date", className: "consumption-date" },
    { key: "consumptionTime", title: "Time", className: "consumption-time" },
    { key: "name", title: "Commodity", className: "commodity-name" },
    { key: "consumption", title: "Amount", className: "consumption" },
    {
      key: "consumptionStoredBy",
      title: "Dispensed by",
      className: "consumption-dispensed-by",
    },
    { key: "recipient", title: "Recipient", className: "recipient" },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedData = [...data].sort(
        (a, b) =>
          new Date(b.consumptionDateUpdated) -
          new Date(a.consumptionDateUpdated)
      );

      const formattedData = sortedData.map((e) => {
        const dateTime = new Date(Date.parse(e.consumptionDateUpdated) + 3600);

        const day = String(dateTime.getDate()).padStart(2, "0");
        const month = String(dateTime.getMonth() + 1).padStart(2, "0");
        const year = String(dateTime.getFullYear()).substring(2);
        const formattedDate = `${day}.${month}.${year}`;

        const hours = String(dateTime.getHours()).padStart(2, "0");
        const minutes = String(dateTime.getMinutes()).padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;

        return {
          ...e,
          consumptionDate: formattedDate,
          consumptionTime: formattedTime,
        };
      });

      const startIndex = (currentPage - 1) * pageSize;
      const paginatedData = formattedData.slice(
        startIndex,
        startIndex + pageSize
      );

      setLocalData(paginatedData);
    }
  }, [data, currentPage, pageSize]);

  return (
    <div>
      <div className="same-line-left">
        <h1>Dispensing History</h1> &nbsp;&nbsp;&nbsp;
        <HelpButton handleOnClick={handleHelpClick} />
      </div>

      {data && <CustomTable data={localData} columns={columns} />}
      <Pagination
        page={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        total={data?.length || 0}
        isLastPage={currentPage >= totalNumberOfPages} 
      />
      {showHelp && (
        <Modal onClose={handleHelpClick} className="help-modal">
          <ModalContent>
            <h2>Help</h2>
            <p>
              This page displays an overview over all dispensing transactions,
              to see the full list scroll down. The included information is:
              Date, Time, Commodity, amount dispensed (Amount), person who the
              commodity was dispensed by (Dispensed by), and the Recipient.
            </p>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
