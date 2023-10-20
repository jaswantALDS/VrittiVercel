"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const defaultOption = {
  chart: {
    id: "apexchart-example",
    stacked: true,
  },
  plotOptions: { bar: { horizontal: true } },

  xaxis: {
    categories: [1994, 1995, 1996, 1997, 1998, 1999],
  },
  colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#E91E63"],
  series: [
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 50],
      color: "#66DA26",
    },
    {
      name: "series-1",
      data: [5, 10, 80, 50, 60, 50, 40, 35, 10],
      color: "#E91E63",
    },
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      color: "#546E7A",
    },
  ],
};
export default function Charts({
  option = defaultOption,
  type = "bar",
  height = 400,
}: {
  option?: ApexOptions;
  height?: number;
  type?:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
}) {
  const pieOptions = {
    series: [44, 55, 13, 33],
    labels: ["Apple", "Mango", "Orange", "Watermelon"],
  };

  return (
    <ApexChart
      type={type}
      options={option}
      series={option.series}
      height={height}
      width="100%"
      className="w-full"
    />
  );
}
