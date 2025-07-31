import { useMemo } from "react";
import { useDataQuery } from "@dhis2/app-runtime";

const queries = {
  dataValues: {
    resource: "dataValueSets",
    params: {
      dataSet: "ULowA8V3ucd", // Life-Saving Commodities
      period: "202311",
      orgUnit: ["r5WWF9WDzoa", "mUuCjQWMaOc", "hKD6hpZUh9v", "W3t0pSZLtrC"],
    },
  },
  dataElements: {
    resource: "dataElements",
    params: {
      fields: ["id", "name"],
      pageSize: 1000,
    },
  },

  orgUnits: {
    resource: "organisationUnits/X7dWcGerQIm",
    params: {
      fields: ["children[id,name,geometry]"],
    },
  },
};

const BASE_ID = "mUuCjQWMaOc";
const RADIUS_OF_EARTH_KM = 6371;

const toRadians = (degree) => (degree * Math.PI) / 180;

const haversineDistance = (coordinates, baseCoordinates) => {
  const [lon1, lat1] = baseCoordinates.map(toRadians);
  const [lon2, lat2] = coordinates.map(toRadians);

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;

  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));

  return Math.round(c * RADIUS_OF_EARTH_KM * 10) / 10;
};

export const useCommodityData = () => {
  const { loading, error, data, refetch } = useDataQuery(queries);
  const baseCoordinates = [-11.3454, 8.3164]; // Order is [lon, lat]

  const mergedData = useMemo(() => {
    if (
      !data ||
      !data.orgUnits?.children ||
      !data.dataValues ||
      !data.dataElements
    ) {
      return [];
    }

    const orgUnitsWithDistance = data.orgUnits.children
      .filter(
        (child) => child.geometry?.type === "Point" && child.id !== BASE_ID
      )
      .map((child) => ({
        ...child,
        distance: haversineDistance(
          child.geometry.coordinates,
          baseCoordinates
        ),
      }));

    return data.dataValues.dataValues.map((dv) => {
      const orgUnitData = orgUnitsWithDistance.find(
        (ou) => ou.id === dv.orgUnit
      );
      const dataElement = data.dataElements.dataElements.find(
        (de) => de.id === dv.dataElement
      );

      return {
        ...dv,
        name: dataElement?.name.replace("Commodities - ", "") ?? "Unknown",
        distance: orgUnitData?.distance ?? null,
        orgUnitName: orgUnitData?.name ?? "Unknown",
      };
    });
  }, [data]);

  return { loading, error, mergedData, refetch };
};
