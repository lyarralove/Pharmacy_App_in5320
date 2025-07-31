import { ResponsiveLine } from "@nivo/line";

export const createGraph = (data) => {
  let margin = { top: 50, right: 180, bottom: 50, left: 60 };

  let legends = {
    anchor: "bottom-right",
    direction: "column",
    justify: false,
    translateX: 100,
    translateY: 0,
    itemsSpacing: 0,
    itemDirection: "left-to-right",
    itemWidth: 80,
    itemHeight: 20,
    itemOpacity: 0.75,
    symbolSize: 12,
    symbolShape: "circle",
    symbolBorderColor: "rgba(0, 0, 0, .5)",
  };

  return (
    <ResponsiveLine
      enablePointLabel
      //   enableSlices={"x"}
      useMesh
      data={data}
      margin={margin}
      xScale={{
        type: "time",
        format: "%Y-%m-%dT%H:%M:%S.%L%Z",
      }}
      yScale={{
        type: "linear",
        stacked: false,
        min: "0",
        max: "auto",
      }}
      xFormat="time: %m.%Y %H:%M"
      axisLeft={{
        legend: "# dispensed",
        legendOffset: -40,
        legendPosition: "middle",
        // tickValues: "every 5"
      }}
      axisBottom={{
        format: "%d.%m %H:%M",
        legend: "time",
        legendOffset: +35,
        legendPosition: "middle",
        tickValues: "every 2 hours",
      }}
      pointBorderColor={{ from: "serieColor" }}
      pointSize={8}
      pointBorderWidth={2}
      //   tooltip={(p) => <div>{p}</div>}
      //   theme={{
      // 	textColor: "#333",
      // 	axis: {
      // 		fontSize: "14px",
      // 		strokeWidth: 5
      // 	},
      // 	grid: {
      // 		stroke: "#888",
      // 		strokeWidth: 5
      // 	}
      //   }}
      legends={[legends]}
    />
  );
};
