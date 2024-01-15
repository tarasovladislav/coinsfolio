import React, { useEffect, useState } from "react";
import Chart, { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Button, Card } from "antd";
import { AppDispatch } from "@/src/state/store";
import { useDispatch } from "react-redux";
import { Resizable } from "react-resizable";

type Props = {
  portfolio: any;
};

defaults.interaction.mode = "index";
defaults.interaction.intersect = false;
defaults.responsive = true;
const PortfolioChart = ({ portfolio }: Props) => {
  const ButtonGroup = Button.Group;

  const [data, setData] = useState([]);
  const [historyDays, setHistoryDays] = useState<string | number>("All");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `/api/history?portfolioId=${portfolio.id}&days=${historyDays}`
        );
        const dat = await response.json();
        console.log(dat, "data");
        setData(dat);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, [historyDays]);

  return (
    data &&
    data.length > 0 && (
      <Card>
        <div className="flex flex-row justify-between">
          <span className="text-xl font-semibold">History</span>
          <ButtonGroup>
            <Button
              onClick={() => {
                setHistoryDays(1);
              }}
              className="w-1/5"
              style={{
                backgroundColor: historyDays === 1 ? "#343434" : "",
                color: historyDays === 1 ? "#fff" : "",
              }}
            >
              24H
            </Button>
            <Button
              onClick={() => {
                setHistoryDays(7);
              }}
              className="w-1/5"
              style={{
                backgroundColor: historyDays === 7 ? "#343434" : "",
                color: historyDays === 7 ? "#fff" : "",
              }}
            >
              7D
            </Button>
            <Button
              onClick={() => {
                setHistoryDays(30);
              }}
              className="w-1/5"
              style={{
                backgroundColor: historyDays === 30 ? "#343434" : "",
                color: historyDays === 30 ? "#fff" : "",
              }}
            >
              30D
            </Button>
            <Button
              onClick={() => {
                setHistoryDays(90);
              }}
              className="w-1/5"
              style={{
                backgroundColor: historyDays === 90 ? "#343434" : "",
                color: historyDays === 90 ? "#fff" : "",
              }}
            >
              90D
            </Button>
            <Button
              className="w-1/5"
              style={{
                backgroundColor: historyDays === "All" ? "#343434" : "",
                color: historyDays === "All" ? "#fff" : "",
              }}
              onClick={() => {
                setHistoryDays("All");
              }}
            >
              All
            </Button>
          </ButtonGroup>
        </div>
        <div
          className="flex flex-col items-center flex-shrink"
          style={{ position: "relative", height: "400px", width: "99%" }}
        >
          {data.length > 0 && (
            <Line
              //   onMouseLeave={() => setHoldingsAtTime(0)}
              data={{
                labels: data.map((entry) => new Date(entry.timeDate).toLocaleDateString()),
                datasets: [
                  {
                    label: "USD",
                    data: data.map((entry) => entry.usd.toFixed(2)),
                    borderColor: "rgb(51, 58, 58)",
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 0,
                    yAxisID: "y",
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  y: {
                    ticks: {
                      callback: function (value: any, index: any, values: any) {
                        return "$" + value.toFixed(2);
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
                // plugins: {
                //   tooltip: {
                //     callbacks: {
                //       label: function (context: any) {
                //         if (context.dataset.label === "Coins") {
                //           return context.parsed.y.toFixed(2) + ` ${tx.coinSymbol.toUpperCase()}`;
                //         } else if (context.dataset.label === "USD") {
                //           //   setHoldingsAtTime(context.parsed.y);
                //           return "$" + context.parsed.y.toFixed(2);
                //         }
                //       },
                //     },
                //   },
                // },
              }}
            />
          )}
        </div>
      </Card>
    )
  );
};

export default PortfolioChart;
