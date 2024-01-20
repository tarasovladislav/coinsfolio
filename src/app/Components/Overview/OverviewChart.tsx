import React, { useEffect, useState, useRef } from "react";
import Chart, { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Button, Card, Segmented } from "antd";
import EmptyChart from "../EmptyChart";

type Props = {};

defaults.interaction.mode = "index";
defaults.interaction.intersect = false;
defaults.responsive = true;
const OverviewChart = ({}: Props) => {
  const [data, setData] = useState([]);
  const [historyDays, setHistoryDays] = useState<string | number>("All");

  const [isLoading, setIsLoading] = useState(false);

  const abortController = useRef<AbortController | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      abortController.current && abortController.current.abort();
      abortController.current = new AbortController();
      setIsLoading(true);

      try {
        const response = await fetch(`/api/overview?days=${historyDays}`, {
          signal: abortController.current.signal,
        });
        const data = await response.json();
        if (historyDays === 1) {
          data.length > 1 && setData(data.slice(0, -1));
        } else {
          setData(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [historyDays]);

  if (data.length === 0) {
    return <EmptyChart />;
  }

  return (
    data.length > 0 && (
      <Card className="flex-1">
        <div className="flex flex-row justify-between ">
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
          className="flex flex-shrink flex-row items-center"
          style={{ position: "relative", height: "300px", width: "99%" }}
        >
          {data.length > 0 && (
            <Line
              className={`${isLoading ? "blur-lg" : ""}`}
              //   onMouseLeave={() => setHoldingsAtTime(0)}
              data={{
                labels: data.map((entry) =>
                  new Date(entry.timeDate).toLocaleDateString(),
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
              }}
            />
          )}
        </div>
      </Card>
    )
  );
};

export default OverviewChart;
