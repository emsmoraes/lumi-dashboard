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
import { Button } from "@/components/ui/button";
import { MdDownload, MdUpload } from "react-icons/md";
import { useInvoicePdf } from "@/hooks/useInvoicesPdf";
import { GoCheckCircle } from "react-icons/go";
import { SlClose } from "react-icons/sl";
import { ImSpinner5 } from "react-icons/im";
import { useToast } from "@/components/ui/use-toast";
import { FaRegFilePdf } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import DocumentPreview from "@/components/document-preview";

function ListInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceIds, setInvoiceIds] = useState<number[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const hasMorePage = page < totalPages;
  const hasPreviousPage = page > 1;

  const { toast } = useToast();

  const getInvoicesAsync = async () => {
    setIsLoading(true);
    api
      .get(`/invoices?page=${page}`)
      .then((res) => {
        setInvoices(res.data.invoices);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const setAllChecked = () => {
    setInvoiceIds((prev) => {
      const allIds = invoices.map((invoice) => invoice.id);
      const allChecked = allIds.every((id) => prev.includes(id));

      if (allChecked) {
        return [];
      } else {
        const newIds = new Set(prev);
        allIds.forEach((id) => newIds.add(id));
        return Array.from(newIds);
      }
    });
  };

  const downloadPdf = useInvoicePdf(
    invoices.filter((invoice) => invoiceIds.includes(invoice.id)),
  );

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    setIsUploading(true);
    await api
      .post(
        "/invoice",
        {
          file: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(() => {
        getInvoicesAsync();
        setFile(null);
        toast({
          title: "Fatura carregada com sucesso!",
        });
        setIsUploading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro ao carregar fatura!",
        });
        setIsUploading(false);
      });
  };

  useEffect(() => {
    setInvoiceIds([]);
    getInvoicesAsync();
  }, [page]);

  return (
    <ContentCard>
      <CardHeader className="px-0 tablet:px-6">
        <CardTitle className="font-inter text-2xl font-semibold text-zinc-900">
          Todas as faturas
        </CardTitle>
        <div className="flex items-center gap-3 pt-4">
          {!file && (
            <label className="flex w-fit cursor-pointer items-center truncate rounded-md border-2 border-solid border-primary bg-transparent px-4 py-2 text-[14px] font-semibold text-primary hover:bg-transparent">
              <input
                accept="application/pdf"
                className="hidden"
                disabled={isUploading}
                type="file"
                onChange={(e) => {
                  // @ts-expect-error: Object is possibly 'null'
                  setFile(e.target.files[0]);
                }}
              />
              <MdUpload fontSize={20} className="mr-2" />
              Adicionar
            </label>
          )}

          {file && (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button className="flex w-fit cursor-pointer items-center truncate rounded-md border-2 border-solid border-primary bg-transparent px-4 py-2 text-[14px] font-semibold text-primary hover:bg-transparent">
                  <FaRegFilePdf fontSize={20} className="mr-2" />
                  {file.name}
                </Button>
              </Dialog.Trigger>

              <DocumentPreview file={file} />
            </Dialog.Root>
          )}

          {file && (
            <div className="flex items-center gap-2">
              {isUploading ? (
                <ImSpinner5
                  style={{ animation: "spin 0.5s linear infinite" }}
                  size={23}
                />
              ) : (
                <button onClick={handleUpload}>
                  <GoCheckCircle className="" size={25} />
                </button>
              )}

              {!isUploading && (
                <button onClick={() => setFile(null)}>
                  <SlClose className="" size={24} />
                </button>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <CardContent className="w-[1000px] px-0 tablet:w-full tablet:px-6">
          <div className="mb-4 grid w-full grid-cols-7 grid-rows-1 gap-4 rounded-md border border-solid border-gray-200 bg-gray-100 px-4 py-3">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="invoices"
                  checked={
                    invoiceIds.length === invoices.length &&
                    invoiceIds.length > 0
                  }
                  onCheckedChange={() => setAllChecked()}
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
            {invoiceIds.length > 0 && (
              <Button
                onClick={downloadPdf}
                className="w-fit border-2 border-solid border-primary bg-transparent font-semibold text-primary hover:bg-transparent"
              >
                <MdDownload fontSize={20} className="mr-2" /> Baixar{" "}
                {invoiceIds.length}{" "}
              </Button>
            )}
            {isLoading && (
              <div className="mt-3 flex w-full items-center justify-center">
                <CgSpinnerTwo className="h-16 w-16 animate-spin" />
              </div>
            )}
            {!isLoading &&
              invoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  invoiceIds={invoiceIds}
                  setInvoiceIds={setInvoiceIds}
                />
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
