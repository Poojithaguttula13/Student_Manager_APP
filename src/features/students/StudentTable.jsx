import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../../store/StudentSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StudentTable({ filterGrade }) {
  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filtered =
    filterGrade === "All"
      ? students
      : students.filter((s) => s.grade === filterGrade);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary.main"
          onClick={() =>
            navigate(`/students/${params.row.id}`, { state: params.row })
          }
        >
          {params.row.name}
        </Button>
      ),
    },
    { field: "age", headerName: "Age", flex: 0.5, minWidth: 100 },
    { field: "grade", headerName: "Grade", flex: 0.5, minWidth: 100 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      minWidth: 120,
      renderCell: (params) => (
        <>
          <Button
            color="error"
            onClick={() => {
              setSelectedStudentId(params.row.id);
              setSelectedStudentName(params.row.name);
              setOpen(true);
            }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: { xs: 1, sm: 2 },
        }}
      >
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.id}
        />
      </Box>
      <Dialog
        PaperProps={{
          sx: {
            width: "600px",
            height: "200px",
            maxWidth: "none",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete{" "}
            <strong>{selectedStudentName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteStudent(selectedStudentId));
              setOpen(false);
            }}
            color="error"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}