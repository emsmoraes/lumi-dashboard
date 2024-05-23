import { Invoice } from "@/models/invoice.model";
import jsPDF from "jspdf";
import moment from "moment";

export const useInvoicePdf = (invoices: Invoice[]) => {
  const downloadPdf = () => {
    const doc = new jsPDF();

    invoices.forEach((invoice, index) => {
      if (index !== 0) {
        doc.addPage();
      }

      let y = 10;

      doc.text(`ID da fatura: ${invoice?.id ?? "N/A"}`, 10, y);
      y += 10;
      doc.text(`Número do cliente: ${invoice?.clientNumber ?? "N/A"}`, 10, y);
      y += 10;
      doc.text(`Mês referência: ${invoice?.referenceMonth ?? "N/A"}`, 10, y);
      y += 10;
      doc.text(
        `Inserida em: ${moment(invoice?.createdAt).format("DD/MM/YYYY") ?? "N/A"}`,
        10,
        y,
      );
      y += 20;

      doc.text("Energia elétrica:", 10, y);
      y += 10;
      doc.text(`  ID: ${invoice?.electricEnergy?.id ?? "N/A"}`, 20, y);
      y += 10;
      doc.text(
        `  Quantidade: ${invoice?.electricEnergy?.quantity ?? "N/A"}`,
        20,
        y,
      );
      y += 10;
      doc.text(
        `  Valor: ${`R$ ${invoice?.electricEnergy?.value}` ?? "N/A"}`,
        20,
        y,
      );
      y += 20;

      doc.text("Energia SCEEE:", 10, y);
      y += 10;
      doc.text(`  ID: ${invoice?.sceeEnergy?.id ?? "N/A"}`, 20, y);
      y += 10;
      doc.text(
        `  Quantidade: ${invoice?.sceeEnergy?.quantity ?? "N/A"}`,
        20,
        y,
      );
      y += 10;
      doc.text(
        `  Valor: ${`R$ ${invoice?.sceeEnergy?.value}` ?? "N/A"}`,
        20,
        y,
      );
      y += 20;

      doc.text("Energia Compensada:", 10, y);
      y += 10;
      doc.text(`  ID: ${invoice?.compensatedEnergy?.id ?? "N/A"}`, 20, y);
      y += 10;
      doc.text(
        `  Quantidade: ${invoice?.compensatedEnergy?.quantity ?? "N/A"}`,
        20,
        y,
      );
      y += 10;
      doc.text(
        `  Valor: ${`R$ ${invoice?.compensatedEnergy?.value}` ?? "N/A"}`,
        20,
        y,
      );
      y += 20;

      doc.text("Contribuição com iluminação pública:", 10, y);
      y += 10;
      doc.text(
        `  ID: ${invoice?.municipalPublicLightingContribution?.id ?? "N/A"}`,
        20,
        y,
      );
      y += 10;
      doc.text(
        `  Valor: ${`R$ ${invoice?.municipalPublicLightingContribution?.value}` ?? "N/A"}`,
        20,
        y,
      );
    });

    doc.save(`${invoices.length > 1 ? "Faturas" : "Fatura"}`);
  };

  return downloadPdf;
};
