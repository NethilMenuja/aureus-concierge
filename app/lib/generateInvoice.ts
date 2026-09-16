import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceData {
  orderId: string;
  villaName: string;
  itemName: string;
  price: number;
  date: string;
}

export const generatePDFInvoice = (data: InvoiceData) => {
  const doc = new jsPDF();

  // Dark Gold Luxury Theme Header Background
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(212, 175, 55); // Gold color
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('AUREUS CONCIERGE', 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text('Ultra-Luxury B2B Procurement Invoice', 14, 30);

  // Invoice Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.text(`Invoice ID: #${data.orderId}`, 14, 50);
  doc.text(`Date: ${data.date}`, 14, 57);
  doc.text(`Property Name: ${data.villaName}`, 14, 64);

  // Table
  autoTable(doc, {
    startY: 75,
    head: [['Item Description', 'Category', 'Qty', 'Unit Price ($)', 'Total ($)']],
    body: [
      [data.itemName, 'Luxury Procurement', '1', `$${data.price}`, `$${data.price}`]
    ],
    headStyles: {
      fillColor: [10, 10, 10],
      textColor: [212, 175, 55],
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 6
    },
    theme: 'grid'
  });

  // Summary / Total
  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Grand Total: $${data.price}.00 USD`, 140, finalY);

  // Footer Note
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 120, 120);
  doc.text('Thank you for partnering with Aureus Concierge Procurement System.', 14, 280);

  // Save the PDF
  doc.save(`Invoice_${data.orderId}.pdf`);
};