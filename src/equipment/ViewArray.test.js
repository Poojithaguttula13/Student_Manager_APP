import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ViewArray from "./ViewArray";

describe("ViewArray Component", () => {
  const mockSetVisibleColumns = jest.fn();
  const mockSetFilterDialogOpen = jest.fn();

  const visibleColumns = {
    deviceName: true,
    deviceType: false,
    serialNumber: true,
    facility: true,
    lastActivity: false,
    equipmentStatus: true,
    powerMeterStatus: false,
    macId: true,
    ipAddress: false,
    connectedDevices: true,
    greengrassVer: false,
    status: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    render(
      <ViewArray
        visibleColumns={visibleColumns}
        setVisibleColumns={mockSetVisibleColumns}
        fitnessData={[]}
        itAssetsData={[]}
        filterDialogOpen={true}
        setFilterDialogOpen={mockSetFilterDialogOpen}
        {...props}
      />
    );
  };

  test("renders dialog with titles", () => {
    renderComponent();

    expect(screen.getByText("Select Visible Columns")).toBeInTheDocument();
    expect(screen.getByText("Fitness Devices")).toBeInTheDocument();
    expect(screen.getByText("IT Assets")).toBeInTheDocument();
  });

  test("renders all checkboxes for Fitness Devices", () => {
    renderComponent();

    // Scope to Fitness Devices section
    const fitnessSection = screen.getByText("Fitness Devices").closest("div");
    const fitnessLabels = [
      "DEVICE NAME",
      "DEVICE TYPE",
      "SERIAL NUMBER",
      "FACILITY",
      "LAST ACTIVITY ON",
      "EQUIPMENT STATUS",
      "POWER METER STATUS",
    ];

    fitnessLabels.forEach((label) => {
      const labelElement = within(fitnessSection).getByText(label);
      expect(labelElement).toBeInTheDocument();
    });
  });

  test("renders all checkboxes for IT Assets", () => {
    renderComponent();

    const itSection = screen.getByText("IT Assets").closest("div");
    const itLabels = [
      "DEVICE NAME",
      "MAC ID",
      "IP ADDRESS",
      "FACILITY",
      "LAST ACTIVITY ON",
      "CONNECTED DEVICES",
      "GREENGRASS VER.",
      "STATUS",
    ];

    itLabels.forEach((label) => {
      const labelElement = within(itSection).getByText(label);
      expect(labelElement).toBeInTheDocument();
    });
  });

  test("calls setVisibleColumns when checkbox is toggled", () => {
    const mockSetVisibleColumns = jest.fn();
    const visibleColumns = {
      deviceName: true,
      deviceType: true,
      serialNumber: true,
    };
  
    render(
      <ViewArray
        visibleColumns={visibleColumns}
        setVisibleColumns={mockSetVisibleColumns}
        fitnessData={[]}
        itAssetsData={[]}
        filterDialogOpen={true}
        setFilterDialogOpen={() => {}}
      />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    const labels = screen.getAllByText(/DEVICE NAME|DEVICE TYPE|SERIAL NUMBER/i);
    const serialIndex = labels.findIndex((label) =>
      label.textContent === "SERIAL NUMBER"
    );
    fireEvent.click(checkboxes[serialIndex]);
    expect(mockSetVisibleColumns).toHaveBeenCalledWith(expect.any(Function));
  });

  test("closes dialog when Close button is clicked", () => {
    renderComponent();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockSetFilterDialogOpen).toHaveBeenCalledWith(false);
  });

});
