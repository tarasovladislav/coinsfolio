import React from "react";
import Chart, { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
type Props = {
  data: any[];
};

defaults.interaction.mode = "index";
defaults.interaction.intersect = false;
defaults.responsive = true;
const ChartComponent = ({ data }: Props) => {
  return (
    <div className="p2 flex flex-col flex-1 w-3/4 items-center flex-shrink">
      <Line
        data={{
          labels: data.map((entry) => new Date(entry.timeDate).toLocaleDateString()),
          datasets: [
            {
              label: "USD",
              data: data.map((entry) => entry.usd.toFixed(2)),
              borderColor: "rgb(51, 58, 58)",
              borderWidth: 2,
              fill: true,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              ticks: {
                callback: function (value: any, index: any, values: any) {
                  return "$" + value;
                },
              },
            },
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 8,
                align: "start",
                maxRotation: 0,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChartComponent;
