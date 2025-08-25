import { useState } from "react";
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

  return (
    <EquipmentCorosuel
      header={<EquipmentHeader />}
      table={
        <EquipmentTable
          visibleColumns={visibleColumns}
          setFitnessData={setFitnessData}
          setItAssetsData={setItAssetsData}
        />
      }
      filter={
        <FilterBar
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          fitnessData={fitnessData}
          itAssetsData={itAssetsData}
        />
      }
    />
  );
}
