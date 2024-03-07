import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";

function GuestsTableOperations() {
  const {mode} = useShowHideSidebar();
  return (
    <TableOperations mode={mode}>
    
      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort Full Name (A-Z)" },
          { value: "fullName-desc", label: "Sort Full Name (Z-A)" },
          { value: "email-asc", label: "Sort by Email (A-Z)" },
          { value: "email-desc", label: "Sort by Email (Z-A)" },
          {
            value: "nationality-asc",
            label: "Sort by Nationality (A-Z)",
          },
          {
            value: "nationality-desc",
            label: "Sort by Nationality (Z-A)",
          },
          
        ]}
      />
    </TableOperations>
  );
}

export default GuestsTableOperations;
