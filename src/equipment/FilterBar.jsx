import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  ListItemText,
  Button,
  Divider,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ViewArrayOutlinedIcon from "@mui/icons-material/ViewArrayOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function FilterBar({
  visibleColumns,
  setVisibleColumns,
  fitnessData,
  itAssetsData,
}) {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [downloadAnchor, setDownloadAnchor] = useState(null);

  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailDetails, setEmailDetails] = useState({ to: "", subject: "" });

  const handleColumnToggle = (field) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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

  // ✅ Mock Email send
  const handleSendEmail = () => {
    alert(
      `📧 Email Sent!\nTo: ${emailDetails.to}\nSubject: ${emailDetails.subject}\nData Attached: Fitness + IT Assets`
    );
    setEmailDialogOpen(false);
    setDownloadAnchor(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
        }}
      >
        <Typography sx={{ fontSize: 20 }}>Filter Equipments</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Filter button now opens a dialog */}
          <IconButton
            data-testid="download-button"
            aria-label="Download"
            sx={{ border: "1px solid gray", p: 1 }}
            onClick={() => setFilterDialogOpen(true)}
          >
            <FilterAltOutlinedIcon />
          </IconButton>

          <IconButton sx={{ border: "1px solid gray", p: 1 }}>
            <ViewArrayOutlinedIcon />
          </IconButton>
          <IconButton sx={{ border: "1px solid gray", p: 1 }}>
            <BookmarkBorderIcon />
          </IconButton>
          <IconButton
            aria-label="download"
            data-testid="download-button"
            sx={{ border: "1px solid gray", p: 1 }}
            onClick={(e) => setDownloadAnchor(e.currentTarget)}
          >
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      <Dialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Select Visible Columns</DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
            }}
          >
            {/* Fitness Devices Section */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Fitness Devices
              </Typography>
              {[
                { field: "deviceName", label: "DEVICE NAME" },
                { field: "deviceType", label: "DEVICE TYPE" },
                { field: "serialNumber", label: "SERIAL NUMBER" },
                { field: "facility", label: "FACILITY" },
                { field: "lastActivity", label: "LAST ACTIVITY ON" },
                { field: "equipmentStatus", label: "EQUIPMENT STATUS" },
                { field: "powerMeterStatus", label: "POWER METER STATUS" },
              ].map((col) => (
                <Box
                  key={col.field}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={visibleColumns[col.field]}
                    onChange={() => handleColumnToggle(col.field)}
                  />
                  <ListItemText primary={col.label} />
                </Box>
              ))}
            </Box>

            {/* IT Assets Section */}
            <Box>
              <Typography variant="h6" gutterBottom>
                IT Assets
              </Typography>
              {[
                { field: "deviceName", label: "DEVICE NAME" },
                { field: "macId", label: "MAC ID" },
                { field: "ipAddress", label: "IP ADDRESS" },
                { field: "facility", label: "FACILITY" },
                { field: "lastActivity", label: "LAST ACTIVITY ON" },
                { field: "connectedDevices", label: "CONNECTED DEVICES" },
                { field: "greengrassVer", label: "GREENGRASS VER." },
                { field: "status", label: "STATUS" },
              ].map((col) => (
                <Box
                  key={col.field}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={visibleColumns[col.field]}
                    onChange={() => handleColumnToggle(col.field)}
                  />
                  <ListItemText primary={col.label} />
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Download Menu */}
      <Menu
        anchorEl={downloadAnchor}
        open={Boolean(downloadAnchor)}
        onClose={() => setDownloadAnchor(null)}
      >
        <MenuItem onClick={handleExportExcel}>Export to Excel</MenuItem>
        <MenuItem onClick={() => setEmailDialogOpen(true)}>
          Send via Email
        </MenuItem>
        <MenuItem onClick={handleExportPDF}>Download PDF</MenuItem>
      </Menu>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)}>
        <DialogTitle>Send Equipment Data</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Recipient Email"
            value={emailDetails.to}
            onChange={(e) =>
              setEmailDetails({ ...emailDetails, to: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Subject"
            value={emailDetails.subject}
            onChange={(e) =>
              setEmailDetails({ ...emailDetails, subject: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSendEmail} variant="contained"   data-testid="send-email-button">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
