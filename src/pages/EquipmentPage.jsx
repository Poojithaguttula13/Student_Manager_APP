import EquipmentCorosuel from "../equipment/EquipmentCorosuel";
import EquipmentHeader from "../equipment/EquipmentHeader";
import EquipmentTable from "../equipment/EquipmentTable";
import FilterBar from "../equipment/FilterBar";


export default function EquipmentPage() {
  return (
    <EquipmentCorosuel 
      header={<EquipmentHeader />} 
      table={<EquipmentTable />}
      filter = {<FilterBar />}
    />
  );
}
