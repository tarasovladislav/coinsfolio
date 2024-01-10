import React, { use, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

type Props = {
  data: any[];
};

const ChartComponent = ({ data }: Props) => {
  const chartRef = useRef<Chart>(null);

  useEffect(() => {
    if (chartRef.current && data) {
      console.log(data, "DATA FOR GRAPH");
      // Destroy the existing chart instance if it exists

      chartRef.current.chart && chartRef.current.chart.destroy();

      const ctx = chartRef.current.getContext("2d");

      const newChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((entry) => new Date(entry.timeDate).toLocaleDateString()), // Convert Unix timestamp to date
          datasets: [
            {
              label: "USD",
              data: data.map((entry) => entry.usd.toFixed(2)),
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          interaction: {
            mode: "index",
            intersect: false,
          },
        },
      });
      chartRef.current.chart = newChart;
    }
    console.log(data, "DAATA FOR GRAPH");
  }, []);

  return (
    <div className="p2 flex flex-col flex-1 w-3/4 items-center flex-shrink">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
