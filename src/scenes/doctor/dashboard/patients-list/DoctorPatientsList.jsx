import { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useQuery } from "@tanstack/react-query";
import { COLUMNS as columnDefinition } from "./columns";
import axiosInstance from "@/lib/config/axiosInstance";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import Searchbar from "@/components/Searchbar";

function DoctorPatientsList() {
  const {
    data: patientList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctor-patient-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/patients/list");
      return response.data.data;
    },
  });

  const columns = useMemo(() => columnDefinition, []);
  const memoizeData = useMemo(() => patientList || [], [patientList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: memoizeData,
    },
    useGlobalFilter
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  return (
    <Container>
      <Searchbar setFilter={setGlobalFilter} filter={globalFilter} />
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={i}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-green-100 text-gray-700"
            >
              {headerGroup.headers.map((column) => {
                const { key, ...rest } = column.getHeaderProps();
                return (
                  <th key={key} {...rest} className="border p-2">
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                    <td key={key} {...rest} className="border p-2 ">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
export default DoctorPatientsList;
