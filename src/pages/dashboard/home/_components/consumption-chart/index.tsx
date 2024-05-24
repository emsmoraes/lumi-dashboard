import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FormateConsumption } from "../total-energy-consumption-chart";
import { useWindowWidth } from "@/hooks/useWindowWidth";

interface ConsumptionChartProps {
  consumptionData: FormateConsumption[];
}

interface CustomTooltipData {
  name: string;
  value: number;
  unit: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipData[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload) {
    return null;
  }

  // const formattedValue = payload[0].value > 1000 ? formatNumber(payload[0].value) : payload[0].value;

  const formattedValue = (value: number) => {
    if (value > 1000) {
      return value;
    } else {
      return value;
    }
  };

  return (
    <div className="custom-tooltip">
      <h2 className="font-inter text-4xl font-[400]">{`${formattedValue(
        payload[0].value,
      )}`}</h2>
      <h2 className="font-inter text-4xl font-[400] text-[#f67e7e]">{`${formattedValue(
        payload[1].value,
      )}`}</h2>
    </div>
  );
};

function ConsumptionChart({ consumptionData }: ConsumptionChartProps) {
  const width = useWindowWidth();

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart
        width={500}
        height={300}
        data={consumptionData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <YAxis
          padding={{ bottom: 45 }}
          axisLine={false}
          tickLine={false}
          tickCount={4}
          tickFormatter={(value) =>
            value !== 0 && value >= 1000 ? `${value}K` : `${value}`
          }
          tick={{
            fontSize: width < 640 ? 15 : 18,
            fontWeight: "400",
            fontFamily: "Inter",
          }}
        />
        <XAxis
          padding={{ left: 35 }}
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: width < 640 ? 15 : 18,
            fontWeight: "400",
            fontFamily: "Inter",
          }}
        />
        {/* <Tooltip contentStyle={{ backgroundColor: "transparent", border: "none" }}/> */}
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="averageEnergyConsumptionKWh"
          stroke="#1C1C1C"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="totalCompensatedEnergyKWh"
          dot={false}
          stroke="#f67e7e"
          strokeDasharray="5 5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ConsumptionChart;
