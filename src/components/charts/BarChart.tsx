"use client";
import { useEffect, useState } from "react";
import { Chart } from "chart.js";
export default function BarChart({ byDate }) {
  const [data, setData] = useState(byDate);
  console.log("counter", data);

  const getData = () => {
    for (var i = 0; i < byDate.length; i++) {
      setData(byDate[i].count);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const returnData = () => {
    const item = byDate?.map((d: any, i: number) => {
      return d.count;
    });

    return item;
  };
  useEffect(() => {
    var ctx = document.getElementById("bar-chart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: returnData(),
            label: "Task Added",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            borderWidth: 2,
          },

          // {
          //   data: [10, 21, 60, 44, 17, 21, 17],
          //   label: "Accepted",
          //   borderColor: "#3cba9f",
          //   backgroundColor: "#71d1bd",
          //   borderWidth: 2,
          // },
          // {
          //   data: [10, 21, 60, 44, 17, 21, 17],
          //   label: "Pending",
          //   borderColor: "#ffa500",
          //   backgroundColor: "#ffc04d",
          //   borderWidth: 2,
          // },
          // {
          //   data: [6, 3, 2, 2, 7, 0, 16],
          //   label: "Rejected",
          //   borderColor: "#c45850",
          //   backgroundColor: "#d78f89",
          //   borderWidth: 2,
          // },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }, [data]);

  return (
    <div className="w-full h-full flex mx-auto my-auto">
      <div className=" pt-0  w-full h-fit my-auto">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  );
}
