import { render, screen, fireEvent } from "@testing-library/react";
import FileDownload from "./FileDownload";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

jest.mock("xlsx", () => {
    return {
      utils: {
        book_new: jest.fn(() => ({ Sheets: {}, SheetNames: [] })), // fake workbook
        json_to_sheet: jest.fn((data) => ({ sheet: data })),       // fake sheet
        book_append_sheet: jest.fn((wb, sheet, name) => {
          wb.Sheets[name] = sheet;
          wb.SheetNames.push(name);
        }),
      },
      writeFile: jest.fn(),
    };
  });
  
  

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    save: jest.fn(),
    lastAutoTable: { finalY: 30 },
  }));
});

jest.mock("jspdf-autotable", () => jest.fn());

describe("FileDownload Component", () => {
  let mockSetDownloadAnchor;

  const fitnessData = [
    { deviceName: "Treadmill", deviceType: "Cardio" },
    { deviceName: "Bench Press", deviceType: "Strength" },
  ];

  const itAssetsData = [
    { assetName: "Laptop", assetType: "Electronics" },
    { assetName: "Printer", assetType: "Electronics" },
  ];

  beforeEach(() => {
    mockSetDownloadAnchor = jest.fn();
    jest.clearAllMocks();

    render(
      <FileDownload
        visibleColumns={{}}
        setVisibleColumns={jest.fn()}
        fitnessData={fitnessData}
        itAssetsData={itAssetsData}
        downloadAnchor={{}} // non-null so menu opens
        setDownloadAnchor={mockSetDownloadAnchor}
      />
    );
  });

  test("renders all menu items", () => {
    expect(screen.getByText(/Export to Excel/i)).toBeInTheDocument();
    expect(screen.getByText(/Send via Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Download PDF/i)).toBeInTheDocument();
  });

  test("calls XLSX.writeFile and closes menu on Export to Excel", () => {
    const excelItem = screen.getByText(/Export to Excel/i);
    fireEvent.click(excelItem);  
    expect(mockSetDownloadAnchor).toHaveBeenCalledWith(null);
  });

  test("sets window.location.href and closes menu on Send via Email", () => {
    delete window.location;
    window.location = { href: "" };

    const emailItem = screen.getByText(/Send via Email/i);
    fireEvent.click(emailItem);

    expect(window.location.href).toContain("mailto:");
    expect(window.location.href).toContain("Equipment%20Data");
    expect(mockSetDownloadAnchor).toHaveBeenCalledWith(null);
  });

});
