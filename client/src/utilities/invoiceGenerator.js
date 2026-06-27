import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  // =====================================================
  // COLORS
  // =====================================================

  const GREEN = [34, 139, 34];
  const DARK = [40, 40, 40];
  const LIGHT = [245, 245, 245];

  // =====================================================
  // HEADER
  // =====================================================

  doc.setFillColor(...GREEN);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);

  doc.text(
    "AUSTRALIAN GIFTS",
    105,
    14,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    "Premium Gifts & Souvenirs",
    105,
    21,
    { align: "center" }
  );

  doc.text(
    "www.australiangifts.com.au",
    105,
    27,
    { align: "center" }
  );

  // =====================================================
  // TITLE
  // =====================================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...GREEN);

  doc.text(
    "TAX INVOICE",
    105,
    45,
    { align: "center" }
  );

  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.8);
  doc.line(20, 50, 190, 50);

  // =====================================================
  // INVOICE DETAILS
  // =====================================================

  doc.setFontSize(11);
  doc.setTextColor(...DARK);

  doc.text(
    `Invoice No : INV-${order._id.slice(-6)}`,
    20,
    62
  );

  doc.text(
    `Order ID : ${order._id}`,
    20,
    70
  );

  doc.text(
    `Date : ${new Date(
      order.orderDate
    ).toLocaleDateString()}`,
    20,
    78
  );

  // =====================================================
  // CUSTOMER TITLE
  // =====================================================

  doc.setFillColor(...LIGHT);
  doc.roundedRect(
    15,
    88,
    180,
    12,
    2,
    2,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...GREEN);

  doc.text(
    "Customer Details",
    20,
    96
  );

  // =====================================================
  // CUSTOMER INFO
  // =====================================================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);

  doc.text(
    `Name : ${order.customerName}`,
    20,
    108
  );

  doc.text(
    `Email : ${order.email}`,
    20,
    116
  );

  // =====================================================
  // PRODUCT TABLE DATA
  // =====================================================

  const tableData = order.items.map((item) => [
    item.name,
    item.quantity,
    `$${item.price.toFixed(2)}`,
    `$${(
      item.price * item.quantity
    ).toFixed(2)}`
  ]);
    // =====================================================
  // PRODUCTS TABLE
  // =====================================================

  autoTable(doc, {
    startY: 126,

    head: [
      [
        "Product",
        "Quantity",
        "Price",
        "Total"
      ],
    ],

    body: tableData,

    theme: "grid",

    headStyles: {
      fillColor: GREEN,
      textColor: [255, 255, 255],
      halign: "center",
      fontStyle: "bold",
      fontSize: 11,
    },

    bodyStyles: {
      fontSize: 10,
      textColor: DARK,
      halign: "center",
      cellPadding: 4,
    },

    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },

    styles: {
      lineColor: [210, 210, 210],
      lineWidth: 0.3,
    },
  });

  // =====================================================
  // TOTAL SECTION
  // =====================================================

  const finalY = doc.lastAutoTable.finalY + 12;

  doc.setFillColor(245, 245, 245);

  doc.roundedRect(
    120,
    finalY,
    75,
    28,
    3,
    3,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...GREEN);

  doc.text(
    "Grand Total",
    130,
    finalY + 10
  );

  doc.setFontSize(18);

  doc.text(
    `$${Number(order.totalAmount).toFixed(2)}`,
    130,
    finalY + 21
  );

  // =====================================================
  // PAYMENT STATUS
  // =====================================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.setTextColor(0, 150, 0);

  doc.text(
    "Payment Status : PAID",
    20,
    finalY + 10
  );

  // =====================================================
  // ORDER STATUS
  // =====================================================

  doc.setTextColor(...GREEN);

  doc.text(
    `Order Status : ${order.status}`,
    20,
    finalY + 22
  );

  // =====================================================
  // SEPARATOR
  // =====================================================

  doc.setDrawColor(...GREEN);

  doc.setLineWidth(0.6);

  doc.line(
    20,
    finalY + 35,
    190,
    finalY + 35
  );
    // =====================================================
  // THANK YOU MESSAGE
  // =====================================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...GREEN);

  doc.text(
    "Thank You For Shopping With Us!",
    105,
    finalY + 50,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);

  doc.text(
    "We truly appreciate your purchase.",
    105,
    finalY + 58,
    {
      align: "center",
    }
  );

  doc.text(
    "Australian Gifts & Souvenirs",
    105,
    finalY + 65,
    {
      align: "center",
    }
  );

  doc.text(
    "www.australiangifts.com.au",
    105,
    finalY + 72,
    {
      align: "center",
    }
  );

  // =====================================================
  // COMPANY CONTACT
  // =====================================================

  doc.setFillColor(...GREEN);

  doc.rect(
    0,
    275,
    210,
    22,
    "F"
  );

  doc.setTextColor(255,255,255);
  doc.setFontSize(10);

  doc.text(
    "Australian Gifts & Souvenirs",
    105,
    282,
    {
      align:"center"
    }
  );

  doc.text(
    "Email : support@australiangifts.com.au",
    105,
    288,
    {
      align:"center"
    }
  );

  doc.text(
    "Phone : +61 123 456 789",
    105,
    294,
    {
      align:"center"
    }
  );

  // =====================================================
  // SAVE PDF
  // =====================================================

  doc.save(
    `Invoice_INV-${order._id.slice(-6)}.pdf`
  );
};