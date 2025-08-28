import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "./ViewArray";
import * as XLSX from "xlsx";


// Mock jsPDF and autoTable
jest.mock("xlsx", () => {
  const originalModule = jest.requireActual("xlsx");
  return {
    __esModule: true,
    ...originalModule,
    utils: {
      book_new: jest.fn(() => ({})),
      json_to_sheet: jest.fn(() => ({})),
      book_append_sheet: jest.fn(),
    },
    writeFile: jest.fn(), // spy on this
  };
});
jest.mock("jspdf-autotable", () => jest.fn());

// Mock XLSX
jest.mock("xlsx", () => ({
  utils: {
    book_new: jest.fn(() => ({})),
    json_to_sheet: jest.fn(() => ({})),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));

describe("FilterBar Component", () => {
  const fitnessData = [
    { deviceName: "Treadmill", deviceType: "Cardio", serialNumber: "123" },
  ];
  const itAssetsData = [
    { deviceName: "Laptop", macId: "00:11", ipAddress: "192.168.0.1" },
  ];

  const visibleColumns = {
    deviceName: true,
    deviceType: true,
    serialNumber: true,
    facility: true,
    lastActivity: true,
    equipmentStatus: true,
    powerMeterStatus: true,
    macId: true,
    ipAddress: true,
    connectedDevices: true,
    greengrassVer: true,
    status: true,
  };

  let setVisibleColumns;

  beforeEach(() => {
    setVisibleColumns = jest.fn();
    render(
      <FilterBar
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
      />
    );
  });

  test("renders FilterBar with buttons", () => {
    expect(screen.getByText("Filter Equipments")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  test("opens filter dialog on filter button click", () => {
    const filterButton = screen.getAllByLabelText("Download")[0];
    fireEvent.click(filterButton);
    expect(screen.getByText("Select Visible Columns")).toBeInTheDocument();
    expect(screen.getByText("Fitness Devices")).toBeInTheDocument();
    expect(screen.getByText("IT Assets")).toBeInTheDocument();
  });

  test("toggles column visibility", () => {
    // Open filter dialog
    const filterButton = screen.getAllByLabelText("Download")[0];
    fireEvent.click(filterButton);
  
    // Get all checkboxes in the dialog
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);
  
    // Assume first checkbox is DEVICE NAME
    fireEvent.click(checkboxes[0]);
  
    expect(setVisibleColumns).toHaveBeenCalledWith(expect.any(Function));
  });
  
  

  test("opens download menu on download button click", () => {
    const downloadButton = screen.getAllByLabelText("download")[0];
    fireEvent.click(downloadButton);
    expect(screen.getByText("Export to Excel")).toBeInTheDocument();
    expect(screen.getByText("Send via Email")).toBeInTheDocument();
    expect(screen.getByText("Download PDF")).toBeInTheDocument();
  });

  it("exports Excel file", () => {
    render(
      <FilterBar
        visibleColumns={{ deviceName: true }}
        setVisibleColumns={jest.fn()}
        fitnessData={[{ deviceName: "Treadmill" }]}
        itAssetsData={[{ deviceName: "Laptop" }]}
      />
    );

    // Open download menu
    const downloadButton = screen.getAllByLabelText("download")[0];
    fireEvent.click(downloadButton);

    // Click Export to Excel
    fireEvent.click(screen.getByText("Export to Excel"));

  });

  test("opens email dialog and sends email", () => {
    const downloadButton = screen.getAllByLabelText("download")[0];
    fireEvent.click(downloadButton);

    const emailMenuItem = screen.getByText("Send via Email");
    fireEvent.click(emailMenuItem);

    const toInput = screen.getByLabelText("Recipient Email");
    const subjectInput = screen.getByLabelText("Subject");

    fireEvent.change(toInput, { target: { value: "test@example.com" } });
    fireEvent.change(subjectInput, { target: { value: "Equipment Report" } });

    const sendButton = screen.getByTestId("send-email-button");

    // Mock window.alert
    window.alert = jest.fn();
    fireEvent.click(sendButton);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("test@example.com")
    );
  });
});
