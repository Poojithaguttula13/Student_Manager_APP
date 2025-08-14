import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControlLabel,
} from "@mui/material";

export default function MenuBar({
  icon,
  label,
  options,
  selected,
  multiple = false,
  onChange,
  showCheckbox = true,
  showFormControl = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleToggle = (value) => {
    onChange(value);
    if (!multiple) setAnchorEl(null); 
  };

  return (
    <>
      <Button
        data-testid={`btn-Columns-${options.value}`}
        variant="contained"
        size="medium"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={icon}
      >
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {options.map((option) => {
          const isChecked = selected.includes(option.value);
          const checkbox = (
            <Checkbox
              checked={isChecked}
              onChange={() => handleToggle(option.value)}
            />
          );

          return (
            <MenuItem key={option.value}>
              {showFormControl ? (
                <FormControlLabel control={checkbox} label={option.label} />
              ) : (
                <>
                  {showCheckbox && checkbox}
                  <ListItemText
                    primary={option.label}
                    onClick={() => handleToggle(option.value)}
                  />
                </>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}