import TableOperations from "./../../ui/TableOperations";
import Filter from "./../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={["all", "no-discount", "with-discount"]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
