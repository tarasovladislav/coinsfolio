import React, { useState } from "react";
import Chart, { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Card, Segmented } from "antd";

type Props = {};

defaults.interaction.mode = "index";
defaults.interaction.intersect = false;
defaults.responsive = true;
const EmptyChart = ({}: Props) => {
  const [historyDays, setHistoryDays] = useState<string | number>("All");

  return (
    <Card className="flex-1">
      <div className="flex flex-row justify-between">
        <span className="text-xl font-semibold">History</span>
        <Segmented
          options={["24H", "7D", "30D", "90D", "All"]}
          defaultValue="All"
          onChange={(e) => {
            if (e === "All") {
              setHistoryDays("All");
            } else if (e === "24H") {
              setHistoryDays(1);
            } else {
              setHistoryDays(String(e).replace("D", ""));
            }
          }}
        />
      </div>

      <div
        className="flex flex-shrink flex-col items-center"
        style={{ position: "relative", height: "300px", width: "99%" }}
      >
        <Line
          className={`blur-lg`}
          data={{
            labels: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ],
            datasets: [
              {
                label: "Portfolio Value",
                data: Array.from(
                  { length: 50 },
                  () => Math.floor(Math.random() * 20) + 1,
                ),
                borderColor: "rgb(51, 58, 58)",
                borderWidth: 2,
                fill: true,
                pointRadius: 0,
                yAxisID: "y",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </Card>
  );
};

export default EmptyChart;
