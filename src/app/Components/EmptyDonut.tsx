import React from "react";

import { Doughnut } from "react-chartjs-2";
import Chart, { defaults } from "chart.js/auto";
import { Card } from "antd";
type Props = {};
defaults.interaction.mode = "index";
defaults.interaction.intersect = false;
defaults.responsive = true;

const EmptyDonut = (props: Props) => {
  return (
    <Card className="flex-1 items-center justify-center">
      <span className="text-xl font-semibold">Allocation</span>
      <div
        className="flex-0 flex items-center justify-center"
        style={{ position: "relative", height: "300px", width: "99%" }}
      >
        <Doughnut
          className="blur-lg"
          data={{
            labels: ["btc, eth, ada, xrp, doge"],
            datasets: [
              {
                label: "USD",
                data: [100, 100, 100, 100, 100],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
            },
          }}
        />
      </div>
    </Card>
  );
};

export default EmptyDonut;
