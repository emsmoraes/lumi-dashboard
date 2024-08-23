import React, { ComponentType, memo } from "react";
import { styled } from "@mui/material";
import ReactDocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const NoRender: ComponentType<{
  document: IDocument | undefined;
  fileName: string;
}> = () => {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-md border border-gray-300 bg-gray-100 p-4">
      <p className="text-sm font-semibold text-gray-700">
        Documento não pode ser visualizado.
      </p>
    </div>
  );
};

const DocViewer = styled(ReactDocViewer)<{
  maxWidth?: string;
  maxHeight?: string;
  displayControls?: string;
}>((props) => ({
  height: "100%",
  padding: "10px",
  overflow: "hidden", // Esconde overflow por padrão

  // Aplica overflow para scroll em dispositivos móveis
  "@media (max-width: 640px)": {
    overflow: "auto",
  },

  "#pdf-controls": {
    boxShadow: "none",
    display: props.displayControls,
    position: "initial",
    width: "100%",
    overflow: "hidden",
    "@media (max-width: 640px)": {
      overflow: "auto", // Permite rolagem em dispositivos móveis
    },
  },
  "#pdf-download": {
    display: "none",
  },
  "#pdf-renderer": {
    margin: "0 10px 0 20px",
    overflow: "hidden",
    "@media (max-width: 640px)": {
      overflow: "auto", // Permite rolagem em dispositivos móveis
    },
  },
  "#image-renderer": {
    background: props.theme.palette.background.paper,
  },
  ".react-pdf__Document": {
    maxWidth: props.maxWidth || "100%",
    maxHeight: props.maxHeight || "100%",
    overflow: "hidden",
    "@media (max-width: 640px)": {
      overflow: "auto", // Permite rolagem em dispositivos móveis
    },
  },
  ".react-pdf__Page__canvas": {
    maxWidth: props.maxWidth || "100%",
    maxHeight: props.maxHeight || "100%",
    overflow: "hidden",
    "@media (max-width: 640px)": {
      overflow: "auto", // Permite rolagem em dispositivos móveis
    },
  },
}));

interface DocumentViewerProps {
  document: IDocument;
  maxWidth?: string;
  maxHeight?: string;
  displayControls?: string;
}

export const DocumentViewer = memo(
  ({ document, maxWidth, maxHeight, ...props }: DocumentViewerProps) => {
    return (
      <DocViewer
        documents={[document]}
        pluginRenderers={DocViewerRenderers}
        language="pt"
        prefetchMethod="GET"
        config={{
          noRenderer: { overrideComponent: NoRender },
          header: { disableHeader: true },
        }}
        displayControls=""
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        {...props}
      />
    );
  },
);
