import React from 'react'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";

const ViewArray = ({  
  visibleColumns,
  setVisibleColumns,
  fitnessData,
  itAssetsData,
  filterDialogOpen,       
  setFilterDialogOpen,    
}) => {
  const handleColumnToggle = (field) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
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
              <Box key={col.field} sx={{ display: "flex", alignItems: "center" }}>
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
              <Box key={col.field} sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={visibleColumns[col.field]}
                  onChange={() => handleColumnToggle(col.field)}
                  data-testid={`checkbox-${col.field}`}
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
  );
}

export default ViewArray;
