import React from "react";

import { Doughnut } from "react-chartjs-2";
import Chart, { defaults } from "chart.js/auto";
import { Card, Empty } from "antd";
import EmptyDonut from "./EmptyDonut";
type Props = { coinData: any };
// defaults.interaction.mode = "index";
// defaults.interaction.intersect = false;
defaults.responsive = true;
const OverviewDonut = ({ coinData }: Props) => {
  if (coinData.length === 0) {
    return <EmptyDonut />;
  }

  return (
    <Card className="flex-1 items-center justify-center">
      <span className="text-xl font-semibold">Allocation</span>

      {coinData.length > 0 && (
        <div
          className="flex-0 flex items-center justify-center"
          style={{ position: "relative", height: "300px", width: "99%" }}
        >
          <Doughnut
            data={{
              labels: coinData.map(
                (entry) =>
                  `${entry.coinName} ${((entry.currentDetails.holdings / coinData.reduce((total, entry) => total + Number(entry.currentDetails.holdings), 0)) * 100).toFixed(2)}%`,
              ),
              datasets: [
                {
                  label: "USD",
                  data: coinData.map((entry) =>
                    Number(entry.currentDetails.holdings).toFixed(2),
                  ),
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                  align: "center",
                },
              },
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default OverviewDonut;
