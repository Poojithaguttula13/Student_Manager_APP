import React from "react";
import { Container, Box } from "@mui/material";
// import FilterStudents from "../features/students/FilterStudents";
import StudentForm from "../features/students/StudentForm";
import StudentTable from "../features/students/StudentTable";

export default function StudentPage() {
  return (
    <Box>
      <Container maxWidth="lg" disableGutters>
        <StudentForm />
        <StudentTable />
      </Container>
    </Box>
  );
}