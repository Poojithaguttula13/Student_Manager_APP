import { useState, useEffect } from "react";
import EquipmentCorosuel from "../equipment/EquipmentCorosuel";
import EquipmentHeader from "../equipment/EquipmentHeader";
import EquipmentTable from "../equipment/EquipmentTable";
import FilterBar from "../equipment/FilterBar";

export default function EquipmentPage() {
  const [visibleColumns, setVisibleColumns] = useState({
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
  });

  const [fitnessData, setFitnessData] = useState([]);
  const [itAssetsData, setItAssetsData] = useState([]);
  const [filteredFitnessData, setFilteredFitnessData] = useState([]);
  const [filteredItAssetsData, setFilteredItAssetsData] = useState([]);
  const [activeTable, setActiveTable] = useState("fitness");

  // ✅ Keep filtered data in sync with full data on initial render & updates
  useEffect(() => {
    setFilteredFitnessData(fitnessData);
  }, [fitnessData]);

  useEffect(() => {
    setFilteredItAssetsData(itAssetsData);
  }, [itAssetsData]);

  return (
    <EquipmentCorosuel
      sx={{ padding: 2 }}
      header={<EquipmentHeader />}
      table={
        <EquipmentTable
          visibleColumns={visibleColumns}
          fitnessData={fitnessData}
          itAssetsData={itAssetsData}
          filteredFitnessData={filteredFitnessData}
          filteredItAssetsData={filteredItAssetsData}
          setFitnessData={setFitnessData}
          setItAssetsData={setItAssetsData}
          activeTable={activeTable}
          setActiveTable={setActiveTable}
        />
      }
      filter={
        <FilterBar
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          fitnessData={fitnessData}
          itAssetsData={itAssetsData}
          setFilteredFitnessData={setFilteredFitnessData}
          setFilteredItAssetsData={setFilteredItAssetsData}
          activeTable={activeTable}
        />
      }
    />
  );
}
