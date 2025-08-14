// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Box, Typography, Chip, Menu, MenuItem } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import axios from "axios";
// import { ArrowDropDown, FiberManualRecord } from "@mui/icons-material";

// const EquipmentTable = () => {
//   const [equipment, setEquipment] = useState([]);
//   const [activeTable, setActiveTable] = useState("fitness"); // default open
//   const [fitnessData, setFitnessData] = useState([]);
//   const [itAssetsData, setItAssetsData] = useState([]);

//   // State for dropdown menu
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [rowStatus, setRowStatus] = useState({}); // store active/inactive per row

//   const handleStatusClick = (e, row) => {
//     e.stopPropagation();
//     setRowStatus((prev) => ({
//       ...prev,
//       [row.id]: prev[row.id] === "Inactive" ? "Active" : "Inactive",
//     }));
//   };

//   const handleStatusChange = (status) => {
//     setFitnessData((prev) =>
//       prev.map((item) =>
//         item.id === selectedRow.id
//           ? { ...item, equipmentStatus: status }
//           : item
//       )
//     );
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//     axios.get("http://localhost:3000/fitnessDevices").then((res) => {
//       setFitnessData(res.data);
//     });

//     axios.get("http://localhost:3000/itAssets").then((res) => {
//       setItAssetsData(res.data);
//     });
//   }, []);

//   const fitnessColumns = [
//     { field: "deviceName", headerName: "DEVICE NAME", flex: 1 },
//     { field: "deviceType", headerName: "DEVICE TYPE", flex: 1 },
//     { field: "serialNumber", headerName: "SERIAL NUMBER", flex: 1 },
//     { field: "facility", headerName: "FACILITY", flex: 1 },
//     { field: "lastActivity", headerName: "LAST ACTIVITY ON", flex: 1 },

//     // {
//     //   field: "equipmentStatus",
//     //   headerName: "EQUIPMENT STATUS",
//     //   flex: 1,
//     //   renderCell: (params) => {
//     //     const isActive = params.value === "Active";
//     //     return (
//     //       <Chip
//     //         onClick={(e) => handleStatusClick(e, params.row)}
//     //         label={
//     //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//     //             <FiberManualRecord
//     //               sx={{
//     //                 fontSize: 12,
//     //                 color: isActive ? "#4caf50" : "#f44336",
//     //               }}
//     //             />
//     //             {params.value}
//     //             <ArrowDropDown sx={{ fontSize: 18 }} />
//     //           </Box>
//     //         }
//     //         sx={{
//     //           backgroundColor: isActive ? "#0b3d0b" : "#5a0b0b",
//     //           color: "white",
//     //           borderRadius: "16px",
//     //           height: "26px",
//     //           cursor: "pointer",
//     //           fontSize: "0.8rem",
//     //         }}
//     //       />
//     //     );
//     //   },
//     // },

//     {
//       field: "equipmentStatus",
//       headerName: "EQUIPMENT STATUS",
//       flex: 1,
//       renderCell: (params) => {
//         const status =
//           rowStatus[params.row.id] ?? params.value; // take from state or initial value
//         const isActive = status === "Active";

//         return (
//           <Chip
//             onClick={(e) => handleStatusClick(e, params.row)}
//             label={
//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <FiberManualRecord
//                   sx={{
//                     fontSize: 12,
//                     color: isActive ? "#4caf50" : "#f44336",
//                   }}
//                 />
//                 {status}
//                 <ArrowDropDown sx={{ fontSize: 18 }} />
//               </Box>
//             }
//             sx={{
//               backgroundColor: isActive ? "#0b3d0b" : "#5a0b0b",
//               color: "white",
//               borderRadius: "16px",
//               height: "26px",
//               cursor: "pointer",
//               fontSize: "0.8rem",
//             }}
//           />
//         );
//       },
//     },


//     {
//       field: "powerMeterStatus",
//       headerName: "POWER METER STATUS",
//       flex: 1,
//       renderCell: (params) => (
//         <Chip
//           label={
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//               <FiberManualRecord
//                 sx={{
//                   fontSize: 12,
//                   color: "#4caf50", // Always green dot
//                 }}
//               />
//               {params.value}
//             </Box>
//           }
//           sx={{
//             backgroundColor: "#0b3d0b",
//             color: "white",
//             borderRadius: "16px",
//             height: "26px",
//             fontSize: "0.8rem",
//           }}
//         />
//       ),
//     }
//   ];

//   const itAssetsColumns = [
//     { field: "deviceName", headerName: "DEVICE NAME", flex: 1 },
//     { field: "macId", headerName: "MAC ID", flex: 1 },
//     { field: "ipAddress", headerName: "IP ADDRESS", flex: 1 },
//     { field: "facility", headerName: "FACILITY", flex: 1 },
//     { field: "lastActivity", headerName: "LAST ACTIVITY ON", flex: 1 },
//     { field: "connectedDevices", headerName: "CONNECTED DEVICES", flex: 1 },
//     { field: "greengrassVer", headerName: "GREENGRASS VER.", flex: 1 },
//     {
//       field: "status",
//       headerName: "STATUS",
//       flex: 1,
//       renderCell: (params) => (
//         <Chip
//           label={
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//               <FiberManualRecord
//                 sx={{
//                   fontSize: 12,
//                   color: "#4caf50", // Always green dot
//                 }}
//               />
//               {params.value}
//             </Box>
//           }
//           sx={{
//             backgroundColor: "#0b3d0b",
//             color: "white",
//             borderRadius: "16px",
//             height: "26px",
//             fontSize: "0.8rem",
//           }}
//         />
//       ),
//     }
//     // { field: "status", headerName: "STATUS", flex: 1 }
//   ];

//   return (
//     <>
//       {/* Fitness Devices */}
//       <Box sx={{ mt: 4 }}>
//         <Typography
//           sx={{
//             mb: 1,
//             fontWeight: "bold",
//             cursor: "pointer",
//             p: 1,
//             borderRadius: 1,
//             display: "flex",
//             alignItems: "center",
//           }}
//           onClick={() => setActiveTable("fitness")}
//         >
//           Fitness Devices ({fitnessData.length ?? 0})
//           {activeTable === "fitness" ? (
//             <KeyboardArrowDownIcon />
//           ) : (
//             <KeyboardArrowUpIcon />
//           )}
//         </Typography>
//         {activeTable === "fitness" && (
//           <Box sx={{ height: 400 }}>
//             <DataGrid
//               rows={fitnessData}
//               columns={fitnessColumns}
//               getRowId={(row) => row.serialNumber}
//               pageSize={6}
//             />
//           </Box>
//         )}
//       </Box>

//       {/* IT Assets */}
//       <Box sx={{ mt: 2 }}>
//         <Typography
//           sx={{
//             mb: 1,
//             fontWeight: "bold",
//             cursor: "pointer",
//             p: 1,
//             borderRadius: 1,
//             display: "flex",
//             alignItems: "center",
//           }}
//           onClick={() => setActiveTable("itAssets")}
//         >
//           IT Assets ({itAssetsData.length ?? 0})
//           {activeTable === "itAssets" ? (
//             <KeyboardArrowDownIcon />
//           ) : (
//             <KeyboardArrowUpIcon />
//           )}
//         </Typography>
//         {activeTable === "itAssets" && (
//           <Box sx={{ height: 400 }}>
//             <DataGrid
//               rows={itAssetsData}
//               columns={itAssetsColumns}
//               getRowId={(row) => row.macId}
//               pageSize={5}
//             />
//           </Box>
//         )}
//       </Box>

//       {/* Dropdown Menu for Equipment Status */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={() => setAnchorEl(null)}
//       >
//         <MenuItem onClick={() => handleStatusChange("Active")}>Active</MenuItem>
//         <MenuItem onClick={() => handleStatusChange("Inactive")}>Inactive</MenuItem>
//       </Menu>

//     </>
//   );
// };

// export default EquipmentTable;




import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Chip, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { ArrowDropDown, FiberManualRecord } from "@mui/icons-material";

const EquipmentTable = () => {
  const [activeTable, setActiveTable] = useState("fitness");
  const [fitnessData, setFitnessData] = useState([]);
  const [itAssetsData, setItAssetsData] = useState([]);

  // For dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  // Row-specific status overrides
  const [rowStatus, setRowStatus] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/fitnessDevices").then((res) => {
      setFitnessData(res.data);
    });
    axios.get("http://localhost:3000/itAssets").then((res) => {
      setItAssetsData(res.data);
    });
  }, []);

  const openStatusMenu = (e, params) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedRowId(params.id); // params.id is unique from getRowId
  };

  const handleStatusChange = (status) => {
    setRowStatus((prev) => ({
      ...prev,
      [selectedRowId]: status,
    }));

    // Optional: also update the main data so DataGrid shows it right away
    setFitnessData((prev) =>
      prev.map((item) =>
        item.serialNumber === selectedRowId
          ? { ...item, equipmentStatus: status }
          : item
      )
    );

    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const fitnessColumns = [
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
        const status = rowStatus[params.id] ?? params.value;
        const isActive = status === "Active";

        return (
          <Chip
            onClick={(e) => openStatusMenu(e, params)}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FiberManualRecord
                  sx={{
                    fontSize: 12,
                    color: isActive ? "#4caf50" : "#f44336",
                  }}
                />
                {status}
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
      renderCell: (params) => (
        <Chip
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <FiberManualRecord
                sx={{
                  fontSize: 12,
                  color: "#4caf50", // Always green
                }}
              />
              {params.value}
            </Box>
          }
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
  ];

  const itAssetsColumns = [
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
      renderCell: (params) => (
        <Chip
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <FiberManualRecord
                sx={{
                  fontSize: 12,
                  color: "#4caf50",
                }}
              />
              {params.value}
            </Box>
          }
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
  ];

  return (
    <>
      {/* Fitness Devices */}
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            mb: 1,
            fontWeight: "bold",
            cursor: "pointer",
            p: 1,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setActiveTable("fitness")}
        >
          Fitness Devices ({fitnessData.length ?? 0})
          {activeTable === "fitness" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </Typography>
        {activeTable === "fitness" && (
          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={fitnessData}
              columns={fitnessColumns}
              getRowId={(row) => row.serialNumber}
              pageSize={6}
            />
          </Box>
        )}
      </Box>

      {/* IT Assets */}
      <Box sx={{ mt: 2 }}>
        <Typography
          sx={{
            mb: 1,
            fontWeight: "bold",
            cursor: "pointer",
            p: 1,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setActiveTable("itAssets")}
        >
          IT Assets ({itAssetsData.length ?? 0})
          {activeTable === "itAssets" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </Typography>
        {activeTable === "itAssets" && (
          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={itAssetsData}
              columns={itAssetsColumns}
              getRowId={(row) => row.macId}
              pageSize={5}
            />
          </Box>
        )}
      </Box>

      {/* Dropdown Menu */}
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
};

export default EquipmentTable;
