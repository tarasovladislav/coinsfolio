import React, { useEffect, useState, useRef } from "react";
import Chart, { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { Button, Card, Segmented } from "antd";
import EmptyChart from "../EmptyChart";

type Props = {
  tx: any;
};

defaults.interaction.mode = "index";
defaults.interaction.intersect = false;
defaults.responsive = true;
const TranscationsChart = ({ tx }: Props) => {
  const [data, setData] = useState([]);
  const [historyDays, setHistoryDays] = useState<string | number>("All");
  const [isLoading, setIsLoading] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      abortController.current && abortController.current.abort();
      abortController.current = new AbortController();
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/history/single?portfolioCoinId=${tx.id}&days=${historyDays}`,
          {
            signal: abortController.current.signal,
          },
        );
        setData(await response.json());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, [historyDays]);

  if (data.length === 0) {
    return <EmptyChart />;
  }

  return (
    data &&
    data.length > 0 && (
      <Card>
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
          {data.length > 0 && (
            <Line
              className={`${isLoading ? "blur-lg" : ""}`}
              data={{
                labels: data.map((entry) =>
                  dayjs(entry.timeDate).format("MMM DD, YYYY, HH:MM"),
                ),
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
                  {
                    label: "Coins",
                    data: data.map((entry) => entry.coins.toFixed(2)),
                    borderColor: "rgb(255, 99, 132)",
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    yAxisID: "otherAxis",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,

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
                      maxTicksLimit: 4,
                      align: "start",
                      maxRotation: 0,
                    },
                  },
                  otherAxis: {
                    position: "right",
                    title: {
                      text: "Coins",
                      color: "rgb(255, 99, 132)",
                    },
                  },
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context: any) {
                        if (context.dataset.label === "Coins") {
                          return (
                            context.parsed.y.toFixed(2) +
                            ` ${tx.coinSymbol.toUpperCase()}`
                          );
                        } else if (context.dataset.label === "USD") {
                          return "$" + context.parsed.y.toFixed(2);
                        }
                      },
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </Card>
    )
  );
};

export default TranscationsChart;
