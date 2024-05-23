import ContentCard from "@/components/content-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import InvoiceCard from "../invoice-card";
import { api } from "@/lib/api";
import { Invoice } from "@/models/invoice.model";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { CgSpinnerTwo } from "react-icons/cg";

function ListInvoices() {
  const [checkedAllInvoices, setCheckedAllInvoices] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const hasMorePage = page < totalPages;
  const hasPreviousPage = page > 1;

  console.log(page, hasPreviousPage);

  const getInvoicesAsync = async () => {
    try {
      setIsLoading(true);
      api.get(`/invoices?page=${page}`).then((res) => {
        setInvoices(res.data.invoices);
        setTotalPages(res.data.totalPages);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInvoicesAsync();
  }, [page]);

  return (
    <ContentCard>
      <CardHeader className="px-0 tablet:px-6">
        <CardTitle className="font-inter text-2xl font-semibold text-zinc-900">
          Todas as faturas
        </CardTitle>
      </CardHeader>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <CardContent className="w-[1000px] px-0 tablet:w-full tablet:px-6">
          <div className="mb-4 grid w-full grid-cols-7 grid-rows-1 gap-4 rounded-md border border-solid border-gray-200 bg-gray-100 px-4 py-3">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recent users"
                  className={`${
                    checkedAllInvoices ? "border-green-600" : "border-gray-700"
                  }`}
                  checked={checkedAllInvoices}
                  onCheckedChange={(checked) =>
                    setCheckedAllInvoices(checked.valueOf() as boolean)
                  }
                />
              </div>
            </div>
            <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
              Nº do cliente
            </h2>
            <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
              Referente a
            </h2>
            <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
              Inserida em
            </h2>
            <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
              Identificador
            </h2>
            <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
              Consumo médio
            </h2>
            <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
              Ação
            </h2>
          </div>

          <div className="flex w-full flex-col gap-4">
            {isLoading && (
              <div className="mt-3 flex w-full items-center justify-center">
                <CgSpinnerTwo className="h-16 w-16 animate-spin" />
              </div>
            )}
            {invoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>

          <div className="mt-8 flex w-full items-center justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn("cursor-pointer", {
                    "cursor-default text-gray-500/50 hover:bg-transparent hover:text-gray-500/50":
                      !hasPreviousPage,
                  })}
                  onClick={() => hasPreviousPage && setPage(page - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={cn("", {
                    "cursor-default text-gray-500/50 hover:bg-transparent hover:text-gray-500/50":
                      !hasMorePage,
                  })}
                  href="#"
                  onClick={() => hasMorePage && setPage(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </div>
        </CardContent>
      </div>
    </ContentCard>
  );
}

export default ListInvoices;
