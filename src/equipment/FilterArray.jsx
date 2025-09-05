// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Menu,
//   MenuItem,
//   ListItemText,
//   Checkbox,
//   Divider,
//   InputBase,
//   Collapse,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { GridSearchIcon } from "@mui/x-data-grid";

// const FilterArray = ({
//   anchorEl,
//   handleClose,
//   fitnessData,
//   itAssetsData,
//   setFilteredFitnessData,
//   setFilteredItAssetsData,
// }) => {
//   const [expandedHeader, setExpandedHeader] = useState(null);
//   const [selectedValues, setSelectedValues] = useState({});
//   const [searchTerms, setSearchTerms] = useState({}); // ✅ per-header search state
//   const [serialInput, setSerialInput] = useState("");
//   const [serialError, setSerialError] = useState("");

//   const open = Boolean(anchorEl);

//   const excludedHeaders = ["id", "macId", "ipAddress"];
//   const allHeaders = useMemo(() => {
//     const fitnessHeaders = fitnessData.length ? Object.keys(fitnessData[0]) : [];
//     const itAssetsHeaders = itAssetsData.length ? Object.keys(itAssetsData[0]) : [];
//     return [...new Set([...fitnessHeaders, ...itAssetsHeaders])].filter(
//       (h) => !excludedHeaders.includes(h)
//     );
//   }, [fitnessData, itAssetsData]);

//   const getUniqueValues = (header) => {
//     if (!header) return [];
//     const combined = [
//       ...fitnessData.map((d) => d[header]),
//       ...itAssetsData.map((d) => d[header]),
//     ].filter(Boolean);
//     return [...new Set(combined)];
//   };

//   const applyFilters = (data, newSelected) => {
//     return data.filter((item) => {
//       const lastActivity = item.lastActivity || "";

//       return Object.entries(newSelected).every(([key, values]) => {
//         if (!values.length) return true;

//         if (key === "lastActivityType") {
//           const [date, time] = lastActivity.split("|").map((p) => p.trim());
//           return values.some((type) => {
//             if (type === "date") return Boolean(date);
//             if (type === "time") return Boolean(time);
//             if (type === "datetime") return Boolean(date && time);
//             return true;
//           });
//         }

//         if (key === "serialNumber") {
//           return values.length ? item[key] === values[0] : true;
//         }

//         return values.includes(item[key]);
//       });
//     });
//   };

//   const handleValueChange = (header, value) => {
//     let updated;

//     if (header === "serialNumber") {
//       updated = value ? [value] : [];
//     } else {
//       updated = selectedValues[header]?.includes(value)
//         ? selectedValues[header].filter((v) => v !== value)
//         : [...(selectedValues[header] || []), value];
//     }

//     const newSelected = { ...selectedValues, [header]: updated };
//     setSelectedValues(newSelected);

//     const filteredFitness = applyFilters(fitnessData, newSelected);
//     const filteredItAssets = applyFilters(itAssetsData, newSelected);

//     setFilteredFitnessData(
//       Object.values(newSelected).some((vals) => vals.length)
//         ? filteredFitness
//         : fitnessData
//     );

//     setFilteredItAssetsData(
//       Object.values(newSelected).some((vals) => vals.length)
//         ? filteredItAssets
//         : itAssetsData
//     );
//   };

//   const formatHeader = (header) =>
//     header.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

//   return (
//     <Menu
//       anchorEl={anchorEl}
//       open={open}
//       onClose={handleClose}
//       PaperProps={{
//         style: { width: 300, maxHeight: 400, padding: "8px", overflowX: "hidden" },
//       }}
//       disableScrollLock={true}
//       container={document.body}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "right",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//     >
//       <Typography sx={{ fontSize: "20px", fontStyle: "bold", pb: 2, px: 2 }}>
//         Filters
//       </Typography>

//       {allHeaders.map((header) => {
//         const isExpanded = expandedHeader === header;
//         const values = getUniqueValues(header);
//         const searchTerm = searchTerms[header] || ""; // ✅ use per-header search term

//         return (
//           <Box key={header}>
//             <MenuItem
//               onClick={() => setExpandedHeader(isExpanded ? null : header)}
//               sx={{ display: "flex", justifyContent: "space-between" }}
//             >
//               <ListItemText primary={formatHeader(header)} />
//               {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
//             </MenuItem>

//             <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//               {/* 🔽 Serial number filter */}
//               {header === "serialNumber" ? (
//                 <Box sx={{ px: 2, py: 1 }}>
//                   <InputBase
//                   data-testid="serial-number-header"
//                   primary="Serial Number"
//                     placeholder="Enter Serial Number"
//                     fullWidth
//                     value={serialInput}
//                     onChange={(e) => {
//                       const val = e.target.value.toUpperCase();
//                       setSerialInput(val);

//                       const regex = /^[A-Z][0-9]{10}$/;
//                       if (val === "" || regex.test(val)) {
//                         setSerialError("");
//                         handleValueChange("serialNumber", val);
//                       } else {
//                         setSerialError(
//                           "Format must be 1 alphabet + 10 digits (e.g., A1234567890)"
//                         );
//                       }
//                     }}
//                     sx={{
//                       px: 1,
//                       py: 0.5,
//                       fontSize: 14,
//                       border: "1px solid gray",
//                       borderRadius: "4px",
//                     }}
//                   />
//                   {serialError && (
//                     <Typography
//                       variant="caption"
//                       sx={{ color: "red", mt: 1, display: "block" }}
//                     >
//                       {serialError}
//                     </Typography>
//                   )}
//                 </Box>
//               ) : header === "lastActivity" ? (
//                 <>
//                   {["date", "time", "datetime"].map((type) => (
//                     <MenuItem key={type} sx={{ pl: 4 }}>
//                       <Checkbox
//                         checked={
//                           selectedValues["lastActivityType"]?.includes(type) ||
//                           false
//                         }
//                         onChange={() =>
//                           handleValueChange("lastActivityType", type)
//                         }
//                       />
//                       <ListItemText
//                         primary={
//                           type === "datetime"
//                             ? "Date & Time"
//                             : type.charAt(0).toUpperCase() + type.slice(1)
//                         }
//                       />
//                     </MenuItem>
//                   ))}
//                 </>
//               ) : values.length ? (
//                 <>
//                   {/* Search box */}
//                   <Box
//                     sx={{
//                       px: 1,
//                       display: "flex",
//                       alignItems: "center",
//                       borderBottom: "1px solid black",
//                     }}
//                   >
//                     <GridSearchIcon sx={{ color: "gray", mr: 1, fontSize: 24 }} />
//                     <InputBase
//                       placeholder="Search…"
//                       fullWidth
//                       value={searchTerm}
//                       onChange={(e) =>
//                         setSearchTerms((prev) => ({
//                           ...prev,
//                           [header]: e.target.value,
//                         }))
//                       }
//                       sx={{ px: 1, py: 0.5, fontSize: 14 }}
//                     />
//                   </Box>
//                   <Divider />

//                   {values
//                     .filter((val) =>
//                       val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//                     )
//                     .map((val) => (
//                       <MenuItem key={val} sx={{ pl: 4 }}>
//                         <Checkbox
//                           checked={selectedValues[header]?.includes(val) || false}
//                           onChange={() => handleValueChange(header, val)}
//                         />
//                         <ListItemText primary={val} />
//                       </MenuItem>
//                     ))}
//                 </>
//               ) : (
//                 <Typography sx={{ px: 3, py: 1, fontSize: 14 }}>
//                   No data present
//                 </Typography>
//               )}
//             </Collapse>
//           </Box>
//         );
//       })}
//     </Menu>
//   );
// };

// export default FilterArray;





import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  Checkbox,
  Divider,
  InputBase,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { GridSearchIcon } from "@mui/x-data-grid";

const FilterArray = ({
  anchorEl,
  handleClose,
  fitnessData,
  itAssetsData,
  setFilteredFitnessData,
  setFilteredItAssetsData,
}) => {
  const [expandedHeader, setExpandedHeader] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [serialInput, setSerialInput] = useState("");
  const [serialError, setSerialError] = useState("");
  const [filteredRefs, setFilteredRefs] = useState([]); // ✅ serial number suggestions

  const open = Boolean(anchorEl);

  const excludedHeaders = ["id", "macId", "ipAddress"];
  const allHeaders = useMemo(() => {
    const fitnessHeaders = fitnessData.length ? Object.keys(fitnessData[0]) : [];
    const itAssetsHeaders = itAssetsData.length ? Object.keys(itAssetsData[0]) : [];
    return [...new Set([...fitnessHeaders, ...itAssetsHeaders])].filter(
      (h) => !excludedHeaders.includes(h)
    );
  }, [fitnessData, itAssetsData]);

  const getUniqueValues = (header) => {
    if (!header) return [];
    const combined = [
      ...fitnessData.map((d) => d[header]),
      ...itAssetsData.map((d) => d[header]),
    ].filter(Boolean);
    return [...new Set(combined)];
  };

  const applyFilters = (data, newSelected) => {
    return data.filter((item) => {
      const lastActivity = item.lastActivity || "";

      return Object.entries(newSelected).every(([key, values]) => {
        if (!values.length) return true;

        if (key === "lastActivityType") {
          const [date, time] = lastActivity.split("|").map((p) => p.trim());
          return values.some((type) => {
            if (type === "date") return Boolean(date);
            if (type === "time") return Boolean(time);
            if (type === "datetime") return Boolean(date && time);
            return true;
          });
        }

        if (key === "serialNumber") {
          return values.length ? item[key] === values[0] : true;
        }

        return values.includes(item[key]);
      });
    });
  };

  const handleValueChange = (header, value) => {
    let updated;

    if (header === "serialNumber") {
      updated = value ? [value] : [];
    } else {
      updated = selectedValues[header]?.includes(value)
        ? selectedValues[header].filter((v) => v !== value)
        : [...(selectedValues[header] || []), value];
    }

    const newSelected = { ...selectedValues, [header]: updated };
    setSelectedValues(newSelected);

    const filteredFitness = applyFilters(fitnessData, newSelected);
    const filteredItAssets = applyFilters(itAssetsData, newSelected);

    setFilteredFitnessData(
      Object.values(newSelected).some((vals) => vals.length)
        ? filteredFitness
        : fitnessData
    );

    setFilteredItAssetsData(
      Object.values(newSelected).some((vals) => vals.length)
        ? filteredItAssets
        : itAssetsData
    );
  };

  const formatHeader = (header) =>
    header.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: { width: 300, maxHeight: 400, padding: "8px", overflowX: "hidden" },
      }}
      disableScrollLock={true}
      container={document.body}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Typography sx={{ fontSize: "20px", fontStyle: "bold", pb: 2, px: 2 }}>
        Filters
      </Typography>

      {allHeaders.map((header) => {
        const isExpanded = expandedHeader === header;
        const values = getUniqueValues(header);
        const searchTerm = searchTerms[header] || "";

        return (
          <Box key={header}>
            <MenuItem
              onClick={() => setExpandedHeader(isExpanded ? null : header)}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText primary={formatHeader(header)} />
              {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </MenuItem>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              {/* 🔽 Serial number filter */}
              {header === "serialNumber" ? (
                <Box sx={{ px: 2, py: 1 }}>
                  <InputBase
                    data-testid="serial-number-header"
                    placeholder="Enter Serial Number"
                    fullWidth
                    value={serialInput}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setSerialInput(val);

                      const regex = /^[A-Z][0-9]{10}$/;
                      if (val === "" || regex.test(val)) {
                        setSerialError("");
                        handleValueChange("serialNumber", val);
                      } else {
                        setSerialError(
                          "Format must be 1 alphabet + 10 digits (e.g., A1234567890)"
                        );
                      }

                      // ✅ filter reference matches
                      const refs = getUniqueValues("serialNumber").filter((sn) =>
                        sn.toUpperCase().startsWith(val)
                      );
                      setFilteredRefs(val ? refs : []);
                    }}
                    sx={{
                      px: 1,
                      py: 0.5,
                      fontSize: 14,
                      border: "1px solid gray",
                      borderRadius: "4px",
                    }}
                  />
                  {serialError && (
                    <Typography
                      variant="caption"
                      sx={{ color: "red", mt: 1, display: "block" }}
                    >
                      {serialError}
                    </Typography>
                  )}

                  {/* ✅ reference suggestion dropdown */}
                  {filteredRefs.length > 0 && (
                    <Box
                      sx={{
                        mt: 1,
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        maxHeight: 120,
                        overflowY: "auto",
                      }}
                    >
                      {filteredRefs.map((ref, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                          sx={{
                            px: 1,
                            py: 0.5,
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#e0f7fa", 
                                color: "#00796b",           
                              },
                            }}
                          onClick={() => {
                            setSerialInput(ref);
                            handleValueChange("serialNumber", ref);
                            setFilteredRefs([]);
                          }}
                        >
                          {ref}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : header === "lastActivity" ? (
                <>
                  {["date", "time", "datetime"].map((type) => (
                    <MenuItem key={type} sx={{ pl: 4 }}>
                      <Checkbox
                        checked={
                          selectedValues["lastActivityType"]?.includes(type) ||
                          false
                        }
                        onChange={() =>
                          handleValueChange("lastActivityType", type)
                        }
                      />
                      <ListItemText
                        primary={
                          type === "datetime"
                            ? "Date & Time"
                            : type.charAt(0).toUpperCase() + type.slice(1)
                        }
                      />
                    </MenuItem>
                  ))}
                </>
              ) : values.length ? (
                <>
                  {/* ✅ fixed underline search bar */}
                  <Box
                    sx={{
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <GridSearchIcon sx={{ color: "gray", mr: 1, fontSize: 20 }} />
                    <InputBase
                      placeholder="Search…"
                      fullWidth
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerms((prev) => ({
                          ...prev,
                          [header]: e.target.value,
                        }))
                      }
                      sx={{ px: 1, py: 0.5, fontSize: 14 }}
                    />
                  </Box>
                  <Divider />

                  {values
                    .filter((val) =>
                      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((val) => (
                      <MenuItem key={val} sx={{ pl: 4 }}>
                        <Checkbox
                          checked={selectedValues[header]?.includes(val) || false}
                          onChange={() => handleValueChange(header, val)}
                        />
                        <ListItemText primary={val} />
                      </MenuItem>
                    ))}
                </>
              ) : (
                <Typography sx={{ px: 3, py: 1, fontSize: 14 }}>
                  No data present
                </Typography>
              )}
            </Collapse>
          </Box>
        );
      })}
    </Menu>
  );
};

export default FilterArray;
