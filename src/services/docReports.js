import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = doc => {
    const document = new jsPDF();

        const tableColumn = ["Supplier Name", "Date", "Cost", "Quantity", "Breed"];

        const tableRows = [];

        doc.forEach(record => {
            const recordData = [
                record.supplierName,
                record.date,
                record.cost,
                record.quantity,
                record.breed,
            ];

            tableRows.push(recordData);
        });

        document.autoTable(tableColumn, tableRows, { startY: 20 });

        document.text("DOC Report", 14, 15);

        document.save(`Nevil Nutri Feeds DOC Report.pdf`);

 };

 export default generatePDF;