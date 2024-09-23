import { useMemo, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useQuery } from "@tanstack/react-query";
import { COLUMNS as columnDefinition } from "./columns";
import axiosInstance from "@/lib/config/axiosInstance";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import Searchbar from "@/components/Searchbar";
import AddMedicalRecord from "./AddMedicalRecord";

function TodaysAppointments() {
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});

  const {
    data: appointmentsList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctor-appointments-today"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/appointments/today");
      return response.data.data;
    },
  });

  function handleComplete(rowData) {
    setAppointmentData(rowData);
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  const COLUMNS = columnDefinition({
    handleComplete,
  });
  const columns = useMemo(() => COLUMNS, []);
  const memoizeData = useMemo(() => appointmentsList || [], [appointmentsList]);

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
      <div className="flex justify-between">
        <div className="mt-1">
          <h1 className="text-xl text-center text-black dark:text-white font-serif font-semibold">
            Today&apos;s Appointments
          </h1>
        </div>
        <Searchbar setFilter={setGlobalFilter} filter={globalFilter} />
      </div>
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
              <tr
                key={row.id}
                {...row.getRowProps()}
                className={`${row.original.status === "Scheduled" ? "text-green-500" : ""}`}
              >
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
      {isOpen && (
        <AddMedicalRecord
          isOpen={isOpen}
          onClose={onClose}
          appointment={appointmentData}
        />
      )}
    </Container>
  );
}

export default TodaysAppointments;
