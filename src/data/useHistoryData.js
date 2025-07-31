import { useDataQuery } from "@dhis2/app-runtime";

const QUERY = {
  history: {
    resource: "dataStore/IN5320-15/history",
  },
};

export const useHistoryData = () => {
  const { loading, error, data, refetch } = useDataQuery(QUERY);

  return {
    loadingHistory: loading,
    errorHistory: error,
    historyData: data ? data.history.data : data,
    refetchHistory: refetch,
  };
};
