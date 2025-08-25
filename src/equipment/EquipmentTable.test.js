// import React from "react";
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import EquipmentTable from "./EquipmentTable";
// import axios from "axios";

// // Mock axios
// jest.mock('axios', () =>({
//     get: jest.fn(),
//     fetchEquipment: jest.fn(),
//     fetchEquipmentTable: jest.fn(),

// }));

// const mockFitnessData = [
//   {
//     deviceName: "Treadmill Pro",
//     deviceType: "Treadmill",
//     serialNumber: "SN123",
//     facility: "Gym A",
//     lastActivity: "2025-08-10",
//     equipmentStatus: "Active",
//     powerMeterStatus: "Connected",
//   },
// ];

// const mockItAssetsData = [
//   {
//     deviceName: "Server X",
//     macId: "MAC123",
//     ipAddress: "192.168.0.1",
//     facility: "HQ",
//     lastActivity: "2025-08-11",
//     connectedDevices: 5,
//     greengrassVer: "1.0",
//     status: "Running",
//   },
// ];

// describe("EquipmentTable Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("fetches and displays fitness and IT assets data", async () => {
//     axios.get
//       .mockResolvedValueOnce({ data: mockFitnessData }) // fitnessDevices
//       .mockResolvedValueOnce({ data: mockItAssetsData }); // itAssets
  
//     render(<EquipmentTable />);
//     expect(await screen.findByText("Treadmill Pro")).toBeInTheDocument();
//     fireEvent.click(screen.getByText(/IT Assets/i));
//     expect(await screen.findByText("Server X", { exact: false })).toBeInTheDocument();
//   });

// });




// EquipmentTable.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EquipmentTable from "./EquipmentTable";
import axios from "axios";

// Mock axios
jest.mock('axios', () =>({
    get: jest.fn(),
    fetchEquipment: jest.fn(),
    fetchEquipmentTable: jest.fn(),

}));

describe("EquipmentTable Component", () => {
  const mockFitnessData = [
    {
      deviceName: "Treadmill",
      deviceType: "Cardio",
      serialNumber: "12345",
      facility: "Gym A",
      lastActivity: "2025-08-20",
      equipmentStatus: "Active",
    },
  ];

  const mockItAssetsData = [
    {
      deviceName: "Router",
      macId: "AA:BB:CC:DD",
      ipAddress: "192.168.1.1",
      facility: "Office",
      lastActivity: "2025-08-21",
      connectedDevices: 5,
      greengrassVer: "1.0.0",
    },
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

  let setFitnessData, setItAssetsData;

  beforeEach(() => {
    setFitnessData = jest.fn();
    setItAssetsData = jest.fn();

    axios.get.mockImplementation((url) => {
      if (url.includes("fitnessDevices")) return Promise.resolve({ data: mockFitnessData });
      if (url.includes("itAssets")) return Promise.resolve({ data: mockItAssetsData });
      return Promise.reject(new Error("Unknown API"));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and renders Fitness Devices data", async () => {
    render(
      <EquipmentTable
        visibleColumns={visibleColumns}
        setFitnessData={setFitnessData}
        setItAssetsData={setItAssetsData}
      />
    );

    // ✅ Wait for async data load
    await waitFor(() => {
      expect(setFitnessData).toHaveBeenCalledWith(mockFitnessData);
      expect(setItAssetsData).toHaveBeenCalledWith(mockItAssetsData);
    });

    // ✅ Fitness table should show row data
    expect(await screen.findByText("Treadmill")).toBeInTheDocument();
    expect(screen.getByText("Cardio")).toBeInTheDocument();
  });

  test("toggles table collapse and expand", async () => {
    render(
      <EquipmentTable
        visibleColumns={visibleColumns}
        setFitnessData={setFitnessData}
        setItAssetsData={setItAssetsData}
      />
    );

    await screen.findByText("Treadmill"); // wait till data loads

    const fitnessTitle = screen.getByText(/Fitness Devices/i);
    fireEvent.click(fitnessTitle); // collapse
    expect(screen.queryByText("Treadmill")).not.toBeInTheDocument();

    fireEvent.click(fitnessTitle); // expand again
    expect(await screen.findByText("Treadmill")).toBeInTheDocument();
  });

  test("opens status menu and changes status", async () => {
    render(
      <EquipmentTable
        visibleColumns={visibleColumns}
        setFitnessData={setFitnessData}
        setItAssetsData={setItAssetsData}
      />
    );

    await screen.findByText("Treadmill");

    // Click the Active chip
    const chip = screen.getByText(/Active/i);
    fireEvent.click(chip);

    // Status menu should open
    expect(await screen.findByText("Inactive")).toBeInTheDocument();

    // Select Inactive
    fireEvent.click(screen.getByText("Inactive"));

    // ✅ Row status should update to Inactive
    await waitFor(() => {
      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });
  });

  test("renders IT Assets table correctly", async () => {
    render(
      <EquipmentTable
        visibleColumns={visibleColumns}
        setFitnessData={setFitnessData}
        setItAssetsData={setItAssetsData}
      />
    );

    await screen.findByText("Treadmill");

    // Expand IT Assets
    const itAssetsTitle = screen.getByText(/IT Assets/i);
    fireEvent.click(itAssetsTitle);

    expect(await screen.findByText("Router")).toBeInTheDocument();
    expect(screen.getByText("192.168.1.1")).toBeInTheDocument();
  });

  test("respects visibleColumns prop", async () => {
    const hiddenColumns = { deviceName: false, deviceType: false, serialNumber: true };

    render(
      <EquipmentTable
        visibleColumns={hiddenColumns}
        setFitnessData={setFitnessData}
        setItAssetsData={setItAssetsData}
      />
    );

    await screen.findByText("12345"); // serialNumber still visible
    expect(screen.queryByText("Treadmill")).not.toBeInTheDocument();
    expect(screen.queryByText("Cardio")).not.toBeInTheDocument();
  });
});
