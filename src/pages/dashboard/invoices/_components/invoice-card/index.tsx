import { memo, useState } from "react";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import DeleteInvoicePopup from "../delete-invoice-popup";
import { Invoice } from "@/models/invoice.model";
import moment from "moment";
import { GoDesktopDownload } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";
interface InvoiceCardProps {
  invoice?: Invoice;
  invoiceIds: number[];
  setInvoiceIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const InvoiceCard = ({
  invoice,
  invoiceIds,
  setInvoiceIds,
}: InvoiceCardProps) => {
  const [open, setOpen] = useState(false);

  const mediumEnergyValue = () => {
    let medium = 0;
    if (invoice?.sceeEnergy && invoice?.electricEnergy) {
      medium =
        invoice?.sceeEnergy.quantity + invoice?.electricEnergy.quantity / 2;
    } else if (invoice?.sceeEnergy) {
      medium = invoice?.sceeEnergy.quantity;
    } else if (invoice?.electricEnergy) {
      medium = invoice?.electricEnergy.quantity;
    }
    return medium;
  };

  return (
    <div className="grid w-full grid-cols-7 grid-rows-1 items-center gap-4 rounded-md border border-solid border-gray-200 px-4 py-3">
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="recent users"
            checked={invoiceIds.includes(invoice?.id as number)}
            onCheckedChange={() => {
              if (invoiceIds.includes(invoice?.id as number)) {
                setInvoiceIds(invoiceIds.filter((id) => id !== invoice?.id));
              } else {
                setInvoiceIds([...invoiceIds, invoice?.id as number]);
              }
            }}
          />
        </div>
      </div>
      <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
        {invoice?.clientNumber}
      </h2>
      <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
        {invoice?.referenceMonth}
      </h2>
      <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
        {moment(invoice?.createdAt).format("DD/MM/YYYY")}
      </h2>
      <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
        {invoice?.id}
      </h2>
      <h2 className="overflow-hidden text-ellipsis text-nowrap font-inter text-[15px] font-semibold">
        {mediumEnergyValue()} kWh
      </h2>
      <div className="flex items-center">
        <Button
          className="bg-transparent hover:bg-transparent"
          variant="secondary"
          size="icon"
        >
          <GoDesktopDownload className="text-gray-900" size={25} />
        </Button>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-transparent hover:bg-transparent"
              variant="secondary"
              size="icon"
            >
              <FiTrash2 className="text-red-600" size={25} />
            </Button>
          </AlertDialogTrigger>
          <DeleteInvoicePopup
            itemsQuantity={invoiceIds.length}
            setOpen={setOpen}
          />
        </AlertDialog>
      </div>
    </div>
  );
};

const MemoizedInvoiceCard = memo(InvoiceCard);

export default MemoizedInvoiceCard;
