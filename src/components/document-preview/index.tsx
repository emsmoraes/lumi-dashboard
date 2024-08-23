import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { DocumentViewer } from "./document-viewer";

interface DocumentPreviewProps {
  file: File;
}

const formatDocument = (file: File) => {
  const documentData = {
    uri: URL.createObjectURL(file),
    fileType: file.type,
    fileName: file.name,
  };
  return documentData;
};

function DocumentPreview({ file }: DocumentPreviewProps) {
  const ableToVisualize =
    file.type?.includes("pdf") ||
    file.type?.includes("png") ||
    file.type?.includes("jpg") ||
    file.type?.includes("jpeg") ||
    file.type?.includes("html");

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow overflow-x-none fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[70vw] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
        <Dialog.DialogContent>
          {ableToVisualize ? (
            <DocumentViewer document={formatDocument(file)} />
          ) : (
            <p>Não é possível vizualizar</p>
          )}
        </Dialog.DialogContent>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default DocumentPreview;
