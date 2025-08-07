import React from "react";
import { Container, Box } from "@mui/material";
// import FilterStudents from "../features/students/FilterStudents";
import StudentForm from "../features/students/StudentForm";
import GradeFilter from "../features/students/GradeFilter";

export default function StudentPage() {
  return (
    <Box>
      <Container maxWidth="lg" disableGutters>
        <StudentForm />
        <GradeFilter />
      </Container>
    </Box>
  );
}