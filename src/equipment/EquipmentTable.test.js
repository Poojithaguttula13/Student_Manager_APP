import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EquipmentTable from "./EquipmentTable";
import axios from "axios";

// Mock axios
jest.mock('axios', () =>({
    get: jest.fn(),
    fetchEquipment: jest.fn(),
    fetchEquipmentTable: jest.fn(),

}));

const mockFitnessData = [
  {
    deviceName: "Treadmill Pro",
    deviceType: "Treadmill",
    serialNumber: "SN123",
    facility: "Gym A",
    lastActivity: "2025-08-10",
    equipmentStatus: "Active",
    powerMeterStatus: "Connected",
  },
];

const mockItAssetsData = [
  {
    deviceName: "Server X",
    macId: "MAC123",
    ipAddress: "192.168.0.1",
    facility: "HQ",
    lastActivity: "2025-08-11",
    connectedDevices: 5,
    greengrassVer: "1.0",
    status: "Running",
  },
];

describe("EquipmentTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and displays fitness and IT assets data", async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockFitnessData }) // fitnessDevices
      .mockResolvedValueOnce({ data: mockItAssetsData }); // itAssets
  
    render(<EquipmentTable />);
  
    // Wait for fitness data to appear
    expect(await screen.findByText("Treadmill Pro")).toBeInTheDocument();
  
    // Show IT Assets table
    fireEvent.click(screen.getByText(/IT Assets/i));
  
    // Wait for IT Assets row to appear
    expect(await screen.findByText("Server X", { exact: false })).toBeInTheDocument();
  });

//   test("opens the status menu when clicking the status icon", async () => {
//     const mockFitnessData = [
//       { deviceId: 101, deviceName: "Treadmill", status: "Available" },
//     ];
//     const mockITAssetsData = [];

//     axios.get.mockImplementation((url) => {
//       if (url.includes("fitnessDevices")) {
//         return Promise.resolve({ data: mockFitnessData });
//       }
//       if (url.includes("itAssets")) {
//         return Promise.resolve({ data: mockITAssetsData });
//       }
//       return Promise.resolve({ data: [] });
//     });

//     render(<EquipmentTable />);

//     // Wait for row to render
//     // await waitFor(() => {
//       expect(screen.getByText("Treadmill")).toBeInTheDocument();
//     // });

//     // Now you can query the status icon if it exists in your table
//     // const statusIcon = screen.getAllByTestId("status-icon")[0];
//     // fireEvent.click(statusIcon);
//     // expect(...).toBe(...);
//   });
  
  
  

//   test("toggles tables on header click", async () => {
//     axios.get
//       .mockResolvedValueOnce({ data: mockFitnessData })
//       .mockResolvedValueOnce({ data: mockItAssetsData });

//     render(<EquipmentTable />);

//     // Wait for fitness table to render
//     await screen.findByText("Treadmill Pro");

//     // Click IT Assets header
//     fireEvent.click(screen.getByText(/IT Assets/i));

//     // IT assets should be visible
//     expect(await screen.findByText("Server X")).toBeInTheDocument();
//   });

//   test("opens status menu and changes equipment status", async () => {
//     axios.get
//       .mockResolvedValueOnce({ data: mockFitnessData })
//       .mockResolvedValueOnce({ data: mockItAssetsData });

//     render(<EquipmentTable />);

//     const statusChip = await screen.findByText(/Active/i);
//     fireEvent.click(statusChip);

//     // Menu should open
//     expect(screen.getByRole("menu")).toBeInTheDocument();

//     // Change status
//     fireEvent.click(screen.getByText("Inactive"));

//     // Status should be updated
//     expect(await screen.findByText(/Inactive/i)).toBeInTheDocument();
//   });

//   test("handles API error gracefully", async () => {
//     axios.get.mockRejectedValueOnce(new Error("Network error"));
//     axios.get.mockRejectedValueOnce(new Error("Network error"));

//     render(<EquipmentTable />);

//     // No data should appear
//     await waitFor(() => {
//       expect(screen.queryByText(/Treadmill Pro/i)).not.toBeInTheDocument();
//     });
//   });

});
