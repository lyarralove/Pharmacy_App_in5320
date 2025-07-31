import React, { useState } from "react";
import classes from "./App.module.css";
import { CircularLoader } from "@dhis2/ui";
import { Navigation } from "./Navigation";

import { useCommodityData } from "./data/useCommodityData";
import { useHistoryData } from "./data/useHistoryData";

import { Commodities } from "./pages/Commodities/Commodities";
import { History } from "./pages/History/History";
import { Monthlyreport } from "./pages/MonthlyReport/Monthlyreport";
import { InternalTransfer } from "./pages/InternalTransfer/InternalTransfer";
import { AnalyticsDashboard } from "./pages/AnalyticsDashboard/AnalyticsDashboard";

function MyApp() {
  const [activePage, setActivePage] = useState("Commodities");
  const { loading, error, mergedData, refetch } = useCommodityData();
  const { loadingHistory, errorHistory, historyData, refetchHistory } =
    useHistoryData();

  if (error || errorHistory) {
    return <span>ERROR: {error?.message}</span>;
  }

  if (loading || loadingHistory) {
    return <CircularLoader />;
  }

  function activePageHandler(page) {
    setActivePage(page);
  }

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.left}>
          <Navigation
            activePage={activePage}
            activePageHandler={activePageHandler}
          />
        </div>
        <div className={classes.right}>
          {activePage === "Commodities" && (
            <Commodities
              data={mergedData}
              refetch={refetch}
              dataHistory={historyData}
            />
          )}
          {activePage === "History" && (
            <History data={historyData} refetch={refetchHistory} />
          )}
          {activePage === "Monthlyreport" && (
            <Monthlyreport data={mergedData} refetch={refetch} />
          )}
          {activePage === "InternalTransfer" && (
            <InternalTransfer data={mergedData} />
          )}
          {activePage === "AnalyticsDashboard" && (
            <AnalyticsDashboard refetch={refetchHistory} data={historyData} />
          )}
        </div>
      </div>
    </div>
  );
}
export default MyApp;
