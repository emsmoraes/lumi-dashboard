import TotalEnergyConsumptionChart from "./_components/total-energy-consumption-chart";
import TotalEnergyValueChart from "./_components/total-energy-value-chart";

export function Home() {
  return (
    <div className="space-y-10">
      <TotalEnergyConsumptionChart />
      <TotalEnergyValueChart />
    </div>
  );
}
