import { api } from "@/lib/api";
import TotalEnergyConsumptionChart from "./_components/total-energy-consumption-chart";
import TotalEnergyValueChart from "./_components/total-energy-value-chart";
import { Invoice } from "@/models/invoice.model";
import { useEffect, useState } from "react";

export function Home() {
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);

  const getInvoicesAsync = async () => {
    api
      .get(`/invoices?page=1`)
      .then((res) => {
        console.log(res.data);
        setAllInvoices(res.data.invoices);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInvoicesAsync();
    console.log(allInvoices);
  }, []);

  return (
    <div className="space-y-10">
      <TotalEnergyConsumptionChart />
      <TotalEnergyValueChart />
    </div>
  );
}
