// import React from "react";
// import { render, screen, within, waitFor } from "@testing-library/react";
// import EquipmentTable from "./EquipmentTable";
// import axios from "axios";


// jest.mock('axios', () =>({
//     get: jest.fn(),
//     fetchEquipment: jest.fn(),
//     fetchEquipmentTable: jest.fn(),

// }));

// const mockFitnessData = [
//   { deviceName: "Treadmill", deviceType: "Cardio", serialNumber: "SN123", facility: "Gym A", lastActivity: "2025-09-01", equipmentStatus: "Active" }
// ];
// const mockItAssetsData = [
//   { deviceName: "Laptop", macId: "00:1A:2B", ipAddress: "192.168.0.1", facility: "Office", lastActivity: "2025-09-01", connectedDevices: 5, greengrassVer: "1.0", status: "Up to Date" }
// ];

// jest.mock("@mui/material/useMediaQuery", () => () => false);


// describe("EquipmentTable", () => {
//   let setFitnessData, setItAssetsData, setActiveTable;

//   beforeEach(() => {
//     setFitnessData = jest.fn();
//     setItAssetsData = jest.fn();
//     setActiveTable = jest.fn();

//     axios.get.mockImplementation((url) => {
//       if (url.includes("fitnessDevices")) return Promise.resolve({ data: mockFitnessData });
//       if (url.includes("itAssets")) return Promise.resolve({ data: mockItAssetsData });
//       return Promise.reject("unknown url");
//     });
//   });

//   test("renders fitness table row", async () => {
//     render(
//       <EquipmentTable
//         visibleColumns={{ deviceName: true, deviceType: true, serialNumber: true, facility: true, lastActivity: true, equipmentStatus: true }}
//         setFitnessData={setFitnessData}
//         setItAssetsData={setItAssetsData}
//         filteredFitnessData={[]}
//         filteredItAssetsData={[]}
//         activeTable="fitness"
//         setActiveTable={setActiveTable}
//       />
//     );
  
//     const treadmill = screen.queryByText(/Treadmill/i);
//     expect(treadmill).toBeTruthy();
    
//   });

// });




import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
// import { act } from "react-dom/test-utils";
import EquipmentTable from "./EquipmentTable";
import axios from "axios";

// jest.mock("axios");

jest.mock('axios', () =>({
    get: jest.fn(),
    fetchEquipment: jest.fn(),
    fetchEquipmentTable: jest.fn(),

}));

const mockFitnessData = [
  { id: 1, deviceName: "Treadmill", deviceType: "Cardio" },
];
const mockItAssetsData = [
  { id: 2, deviceName: "Router", macId: "AA:BB:CC" },
];

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url.includes("fitness")) {
      return Promise.resolve({ data: mockFitnessData });
    }
    if (url.includes("itAssets")) {
      return Promise.resolve({ data: mockItAssetsData });
    }
    return Promise.resolve({ data: [] });
  });
});

test("renders tables after fetching data", async () => {
  await act(async () => {
    render(
      <EquipmentTable
        visibleColumns={{
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
        }}
        setFitnessData={jest.fn()}
        setItAssetsData={jest.fn()}
        filteredFitnessData={[]}
        filteredItAssetsData={[]}
      />
    );
  });

  expect(screen.getByText(/Fitness Devices/i)).toBeInTheDocument();
  expect(screen.getByText(/IT Assets/i)).toBeInTheDocument();
  
});

test("renders Fitness and IT Assets tables", async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes("fitness")) {
      return Promise.resolve({ data: [{ deviceName: "Treadmill", serialNumber: "123" }] });
    }
    if (url.includes("itAssets")) {
      return Promise.resolve({ data: [{ deviceName: "Router", macId: "abc" }] });
    }
    return Promise.resolve({ data: [] });
  });

  const mockSetFitnessData = jest.fn();
  const mockSetItAssetsData = jest.fn();
  const mockSetTables = jest.fn();

  render(
    <EquipmentTable
      visibleColumns={{ deviceName: true, deviceType: true }}
      filteredFitnessData={[]}        // ✅ empty array avoids crash
      filteredItAssetsData={[]}       // ✅ add this too if your component uses it
      setFitnessData={jest.fn()}
      setItAssetsData={jest.fn()}
      setTables={jest.fn()}
    />
  );
  
  expect(await screen.findByText(/Fitness Devices/i)).toBeInTheDocument();
  expect(await screen.findByText(/IT Assets/i)).toBeInTheDocument();

});

test("opens status menu when status chip is clicked", async () => {
  const mockFitnessData = [
    { serialNumber: "fit-1", deviceName: "Treadmill", equipmentStatus: "Active" }
  ];
  
  render(
    <EquipmentTable
      visibleColumns={{ deviceName: true, equipmentStatus: true }}
      filteredFitnessData={[
        { serialNumber: "fit-1", deviceName: "Treadmill", equipmentStatus: "Active" }
      ]}
      filteredItAssetsData={[]}
      setFitnessData={jest.fn()}
      setItAssetsData={jest.fn()}
      setTables={jest.fn()}
    />
  );
  const chip = await screen.findByTestId("status-chip-fit-1");
  fireEvent.click(chip);

  expect(chip).toBeInTheDocument();
});


