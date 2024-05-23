import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../../components/ui/alert-dialog";
import { MdBlockFlipped } from "react-icons/md";

const DeleteInvoicePopup = () => {
  return (
    <AlertDialogContent className="max-w-[400px] rounded-2xl px-2">
      <AlertDialogHeader className="flex items-center justify-center">
        <MdBlockFlipped size={80} className="mb-6 text-red-500" />
        <AlertDialogTitle className="text-2xl font-semibold text-black">
          Banir usuário?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center font-inter text-[#5E5E5E]">
          Tem certeza que deseja banir permanentemente este usuário? Você poderá
          des-banilo quando quiser
        </AlertDialogDescription>
        <AlertDialogDescription className="text-center font-inter text-[#5E5E5E]">
          Enviaremos uma mensagem padrão para o usuário informando sobre o
          banimento.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mt-3">
        <AlertDialogCancel className="h-14 w-full border-none text-red-500 hover:bg-red-500/10 hover:text-red-500 tablet:w-1/2 ">
          Voltar
        </AlertDialogCancel>
        <AlertDialogAction className="h-14 w-full tablet:w-1/2">
          Banir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteInvoicePopup;
