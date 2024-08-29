import { useTheme } from "@mui/material/styles";
import ReactEcharts from "echarts-for-react";

export default function LineChart({ height, color = [] ,week_1, week_2}) {
  const theme = useTheme();

  const option = {
    grid: { top: "10%", bottom: "10%", left: "10%", right: "5%" },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily
      }
    },
    label: {
      fontSize: 13,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      type: "value",
      min: 400,
      max: 600,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: "roboto" }
    },
    series: [
      {
        data: week_1,
        type: "line",
        stack: "Next week",
        name: "Next week",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      },
      {
        data: week_2,
        type: "line",
        stack: "The week after the next",
        name: "The week after the next",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      }
    ]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
}
