import { memo, useState } from "react";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import { MdBlockFlipped } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import DeleteInvoicePopup from "../delete-invoice-popup";
import { Invoice } from "@/models/invoice.model";
import moment from "moment";

interface InvoiceCardProps {
  invoice?: Invoice;
}

const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const [checkedUser, setCheckedUser] = useState(false);

  return (
    <div className="grid w-full grid-cols-7 grid-rows-1 items-center gap-4 rounded-md border border-solid border-gray-200 px-4 py-3">
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="recent users"
            className={`${
              checkedUser ? "border-green-600" : "border-gray-700"
            }`}
            checked={checkedUser}
            onCheckedChange={(checked) =>
              setCheckedUser(checked.valueOf() as boolean)
            }
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
        {invoice?.electricEnergy.value}
      </h2>
      <div className="flex items-center">
        {/* <SheetTrigger asChild>
            <Button
              className="bg-transparent hover:bg-transparent"
              variant="secondary"
              size="icon"
            >
              <BsEye className="text-gray-600" size={25} />
            </Button>
          </SheetTrigger> */}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-transparent hover:bg-transparent"
              variant="secondary"
              size="icon"
            >
              <MdBlockFlipped className="text-red-600" size={25} />
            </Button>
          </AlertDialogTrigger>
          <DeleteInvoicePopup />
        </AlertDialog>
      </div>
    </div>
  );
};

const MemoizedInvoiceCard = memo(InvoiceCard);

export default MemoizedInvoiceCard;
