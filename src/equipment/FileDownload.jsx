import React from "react";
import {
  Menu,
  MenuItem,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const FileDownload = ({    
  visibleColumns,
  setVisibleColumns,
  fitnessData,
  itAssetsData,
  downloadAnchor,       
  setDownloadAnchor,    
}) => {

  // ✅ Export Excel with 2 sheets
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const fitnessSheet = XLSX.utils.json_to_sheet(fitnessData);
    const itAssetsSheet = XLSX.utils.json_to_sheet(itAssetsData);

    XLSX.utils.book_append_sheet(wb, fitnessSheet, "Fitness Devices");
    XLSX.utils.book_append_sheet(wb, itAssetsSheet, "IT Assets");

    XLSX.writeFile(wb, "equipment_data.xlsx");
    setDownloadAnchor(null);
  };

  // ✅ Export PDF with 2 tables
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.text("Fitness Devices", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [Object.keys(fitnessData[0] || {})],
      body: fitnessData.map((row) => Object.values(row)),
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text("IT Assets", 14, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [Object.keys(itAssetsData[0] || {})],
      body: itAssetsData.map((row) => Object.values(row)),
    });

    doc.save("equipment_data.pdf");
    setDownloadAnchor(null);
  };

  // ✅ Directly open Outlook compose window
  const handleSendToEmail = () => {
    const subject = encodeURIComponent("Equipment Data");
    const body = encodeURIComponent(
      "Hi,\n\nPlease find attached the equipment data.\n\nThanks."
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setDownloadAnchor(null);
  };

  return (
    <>
      {/* Download Menu */}
      <Menu
        anchorEl={downloadAnchor}
        open={Boolean(downloadAnchor)}
        onClose={() => setDownloadAnchor(null)}
      >
        <MenuItem onClick={handleExportExcel}>Export to Excel</MenuItem>
        <MenuItem onClick={handleSendToEmail}>Send via Email</MenuItem>
        <MenuItem onClick={handleExportPDF}>Download PDF</MenuItem>
      </Menu>
    </>
  );
};

export default FileDownload;
