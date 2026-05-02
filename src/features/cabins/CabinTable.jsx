import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "./../../ui/Spinner";
import CabinRow from "./../cabins/CabinRow";
import Table from "./../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const filterVal = searchParams.get("discount");
  console.log("all good");
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  let filteredCabins = cabins;
  if (filterVal === "no-discount") {
    filteredCabins = cabins.filter((e) => e.discount === 0);
  }

  if (filterVal === "with-discount") {
    filteredCabins = cabins.filter((e) => e.discount > 0);
  }

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (typeof aVal === "string") return aVal.localeCompare(bVal) * modifier;
    return (aVal - bVal) * modifier;
  });

  return (
    <Menus>
      <Table cols={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
