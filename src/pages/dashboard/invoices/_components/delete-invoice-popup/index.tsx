import { Button } from "@/components/ui/button";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../../components/ui/alert-dialog";
import { CgClose } from "react-icons/cg";
interface DeleteInvoicePopupProps {
  itemsQuantity: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteInvoicePopup = ({
  itemsQuantity,
  setOpen,
}: DeleteInvoicePopupProps) => {
  return (
    <AlertDialogContent className="max-w-[400px] rounded-2xl px-2">
      <AlertDialogHeader className="flex items-center justify-center">
        <CgClose size={80} className="mb-6 text-red-500" />
        <AlertDialogTitle className="text-2xl font-semibold text-black">
          {itemsQuantity > 1
            ? `Excluir ${itemsQuantity} faturas`
            : `Exluír fatura`}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center font-inter text-[#5E5E5E]">
          {`Tem certeza que deseja excluir ${itemsQuantity} ${itemsQuantity > 1 ? "faturas" : "fatura"}?`}
        </AlertDialogDescription>
        <AlertDialogDescription className="text-center font-inter text-[#5E5E5E]">
          Essa ação é irreversível e não pode ser desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mt-3">
        <Button
          onClick={() => setOpen(false)}
          className="h-14 w-full border-none bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-500 tablet:w-1/2 "
        >
          Voltar
        </Button>
        <Button className="h-14 w-full bg-red-500 hover:bg-red-500/75 tablet:w-1/2">
          Excluír {itemsQuantity > 1 ? "Faturas" : "Fatura"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteInvoicePopup;
