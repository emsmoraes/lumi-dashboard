import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { formatCurrency } from "@/utils/FormatCurrencyValue";
import { FormateConsumptionValue } from "../total-energy-value-chart";

interface ConsumptionValueProps {
  consumptionValueData: FormateConsumptionValue[];
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

  const formattedValue = (value: number) => {
    if (value > 1000) {
      return formatCurrency(value);
    } else {
      return formatCurrency(value);
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

function ValueChart({ consumptionValueData }: ConsumptionValueProps) {
  const width = useWindowWidth();

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart
        width={500}
        height={300}
        data={consumptionValueData}
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
          dataKey="averageValueWithoutGD"
          stroke="#1C1C1C"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="gdEconomy"
          dot={false}
          stroke="#f67e7e"
          strokeDasharray="5 5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ValueChart;
