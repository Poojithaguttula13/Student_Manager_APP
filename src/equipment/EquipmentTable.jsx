import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Chip,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ArrowDropDown, FiberManualRecord } from "@mui/icons-material";
import axios from "axios";

export default function EquipmentTable({
  visibleColumns,
  setFitnessData,
  setItAssetsData,
}) {
  const [tables, setTables] = useState([]);
  const [activeTable, setActiveTable] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedTableKey, setSelectedTableKey] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fitnessRes, itAssetsRes] = await Promise.all([
          axios.get("http://localhost:3000/fitnessDevices"),
          axios.get("http://localhost:3000/itAssets"),
        ]);

        setFitnessData(fitnessRes.data);
        setItAssetsData(itAssetsRes.data);

        const tableConfigs = [
          {
            key: "fitness",
            title: "Fitness Devices",
            data: fitnessRes.data,
            getRowId: (row) => row.serialNumber,
            columns: [
              { field: "deviceName", headerName: "DEVICE NAME", flex: 1 },
              { field: "deviceType", headerName: "DEVICE TYPE", flex: 1 },
              { field: "serialNumber", headerName: "SERIAL NUMBER", flex: 1 },
              { field: "facility", headerName: "FACILITY", flex: 1 },
              { field: "lastActivity", headerName: "LAST ACTIVITY ON", flex: 1 },
              {
                field: "equipmentStatus",
                headerName: "EQUIPMENT STATUS",
                flex: 1,
                renderCell: (params) => {
                  const isActive = params.value === "Active";
                  return (
                    <Chip
                      onClick={(e) => openStatusMenu(e, params, "fitness")}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <FiberManualRecord
                            sx={{
                              fontSize: 12,
                              color: isActive ? "#4caf50" : "#f44336",
                            }}
                          />
                          {params.value}
                          <ArrowDropDown sx={{ fontSize: 18 }} />
                        </Box>
                      }
                      sx={{
                        backgroundColor: isActive ? "#0b3d0b" : "#5a0b0b",
                        color: "white",
                        borderRadius: "16px",
                        height: "26px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    />
                  );
                },
              },
              {
                field: "powerMeterStatus",
                headerName: "POWER METER STATUS",
                flex: 1,
                renderCell: () => (
                  <Chip
                    label="Up to Date"
                    sx={{
                      backgroundColor: "#0b3d0b",
                      color: "white",
                      borderRadius: "16px",
                      height: "26px",
                      fontSize: "0.8rem",
                    }}
                  />
                ),
              },
            ],
          },
          {
            key: "itAssets",
            title: "IT Assets",
            data: itAssetsRes.data,
            getRowId: (row) => row.macId,
            columns: [
              { field: "deviceName", headerName: "DEVICE NAME", flex: 1 },
              { field: "macId", headerName: "MAC ID", flex: 1 },
              { field: "ipAddress", headerName: "IP ADDRESS", flex: 1 },
              { field: "facility", headerName: "FACILITY", flex: 1 },
              { field: "lastActivity", headerName: "LAST ACTIVITY ON", flex: 1 },
              { field: "connectedDevices", headerName: "CONNECTED DEVICES", flex: 1 },
              { field: "greengrassVer", headerName: "GREENGRASS VER.", flex: 1 },
              {
                field: "status",
                headerName: "STATUS",
                flex: 1,
                renderCell: () => (
                  <Chip
                    label="Up to Date"
                    sx={{
                      backgroundColor: "#0b3d0b",
                      color: "white",
                      borderRadius: "16px",
                      height: "26px",
                      fontSize: "0.8rem",
                    }}
                  />
                ),
              },
            ],
          },
        ];
        

        setTables(tableConfigs);
        setActiveTable("fitness");
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [setFitnessData, setItAssetsData]);

  const openStatusMenu = (e, params, tableKey) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedRowId(params.id);
    setSelectedTableKey(tableKey);
  };

  const handleStatusChange = (status) => {
    if (!selectedRowId || !selectedTableKey) return;

    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.key !== selectedTableKey) return table;
        const updatedData = table.data.map((row) =>
          table.getRowId(row) === selectedRowId
            ? { ...row, equipmentStatus: status, status }
            : row
        );
        return { ...table, data: updatedData };
      })
    );

    setAnchorEl(null);
    setSelectedRowId(null);
    setSelectedTableKey(null);
  };

  return (
    <>
      {tables.map((table) => {
        const activeCols = table.columns.filter(
          (col) => visibleColumns[col.field]
        );

        return (
          <Box key={table.key} sx={{ mt: 3 }}>
            <Typography
              sx={{
                mb: 1,
                fontWeight: "bold",
                cursor: "pointer",
                p: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
              onClick={() =>
                setActiveTable(activeTable === table.key ? null : table.key)
              }
            >
              {table.title} ({table.data.length})
              {activeTable === table.key ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Typography>

            {activeTable === table.key && (
              <Box sx={{ height: isMobile ? 300 : 400, overflowX: "auto" }}>
                <DataGrid
                  rows={table.data}
                  columns={activeCols}
                  getRowId={table.getRowId}
                  pageSize={5}
                  hideFooterPagination
                  hideFooterSelectedRowCount
                  disableRowSelectionOnClick
                  sx={{
                    border: 0,
                    fontSize: isMobile ? "0.75rem" : "0.9rem",
                    "& .MuiDataGrid-cell": { border: "none" },
                    "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
                    "& .MuiDataGrid-row": { border: "none" },
                  }}
                />
              </Box>
            )}
          </Box>
        );
      })}

      {/* Status Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleStatusChange("Active")}>Active</MenuItem>
        <MenuItem onClick={() => handleStatusChange("Inactive")}>
          Inactive
        </MenuItem>
      </Menu>
    </>
  );
}
