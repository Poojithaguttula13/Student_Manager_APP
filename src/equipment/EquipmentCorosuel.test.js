// EquipmentCorosuel.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EquipmentCorosuel from "./EquipmentCorosuel";
import axios from "axios";

// Mock axios
jest.mock('axios', () =>({
    get: jest.fn(),
    fetchEquipment: jest.fn(),
    fetchEquipmentTable: jest.fn(),

}));

// Mock react-slick Slider to just render children
jest.mock("react-slick", () => {
    return ({ children }) => <div data-testid="mock-slider">{children}</div>;
  });
  

describe("EquipmentCorosuel Component", () => {
    const mockCards = [
        {
          id: 1,
          title: "Treadmill",
          deviceQuantity: 5,
          reason: "Routine check",
          maintenanceStatus: "Pending",
          status: "Inactive",
          image: "/test-image.jpg"
        },
        {
          id: 2,
          title: "Elliptical",
          deviceQuantity: 3,
          reason: "Repair",
          maintenanceStatus: "Completed",
          status: "Active",
          image: "/test-image2.jpg"
        }
      ];
    
      beforeEach(() => {
        axios.get.mockResolvedValueOnce({ data: mockCards });
      });

      test("renders the header text", async () => {
        render(
          <EquipmentCorosuel
            header={<h1>Equipment Header</h1>}
            filter={<div>Filter Component</div>}
            table={<div>Table Component</div>}
          />
        );
    
        expect(screen.getByText(/Equipment Header/i)).toBeInTheDocument();
      });

      test("calls API and displays card titles", async () => {
        render(
          <EquipmentCorosuel
            header={<h1>Header</h1>}
            filter={<div>Filter</div>}
            table={<div>Table</div>}
          />
        );
    
        await waitFor(() => {
          expect(screen.getByText("Treadmill")).toBeInTheDocument();
          expect(screen.getByText("Elliptical")).toBeInTheDocument();
        });
    
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/cards");
      });


});
