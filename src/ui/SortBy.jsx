import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortedValue = searchParams.get("sortBy") ?? "";
  function handleChange(e) {
    const next = new URLSearchParams(searchParams);
    next.set("sortBy", e.target.value);
    setSearchParams(next);
  }

  return (
    <Select
      options={options}
      type={"white"}
      value={sortedValue}
      onChange={handleChange}
    ></Select>
  );
}

export default SortBy;
