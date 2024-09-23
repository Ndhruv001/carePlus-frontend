import { useMemo, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { COLUMNS as columnDefinition } from "./columns";
import axiosInstance from "@/lib/config/axiosInstance";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import Searchbar from "@/components/Searchbar";
import CancelNote from "./CancelNote";

function DoctorAppointmentsManagement() {
  const [isCancelling, setIsCancelling] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: appointmentsList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/appointments/list");
      return response.data.data;
    },
  });

  const { mutate: acceptAppointment } = useMutation({
    mutationFn: (appointmentId) =>
      axiosInstance.post("/doctor/appointments/accept", appointmentId),
    onSuccess: () => {
      toast.success("Appointment accepted!");
      queryClient.invalidateQueries("doctor-appointments");
    },
    onError: (error) => {
      toast.error(`Error accept appointment: ${error.message}`);
    },
    onSettled: () => {
      setIsAccepting(false);
    },
  });

  const { mutate: cancelAppointment } = useMutation({
    mutationFn: (appointmentId) =>
      axiosInstance.post("/doctor/appointments/cancel", appointmentId),
    onSuccess: () => {
      toast.success("Appointment cancelled successfully!");
      queryClient.invalidateQueries("doctor-appointments");
    },
    onError: (error) => {
      toast.error(`Error cancel appointment: ${error.message}`);
    },
    onSettled: () => {
      setIsCancelling(false);
    },
  });

  function handleAccept(rowData) {
    setIsAccepting(true);
    acceptAppointment({ id: rowData.id });
  }

  function handleCancel(rowData) {
    setIsOpen(true);
    setRowData(rowData);
    setIsCancelling(true);
  }

  function handleCancelReason(reason) {
    cancelAppointment({
      id: rowData.id,
      patient_id: rowData.patient_id,
      reason: reason,
    });
  }

  function onClose() {
    setIsOpen(false);
  }

  const COLUMNS = columnDefinition({
    handleAccept,
    handleCancel,
    isCancelling,
    isAccepting,
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
        <CancelNote
          isOpen={isOpen}
          onClose={onClose}
          handleCancelReason={handleCancelReason}
        />
      )}
    </Container>
  );
}

export default DoctorAppointmentsManagement;
