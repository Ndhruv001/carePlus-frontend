import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { COLUMNS as columnDefinition } from "./columns";
import axiosInstance from "@/lib/config/axiosInstance";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import RescheduleFormModal from "./RescheduleFormModal";

function PatientAppointments() {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: appointmentsList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/patient/appointments/list");
      return response.data.data;
    },
  });

  const { mutate: cancelAppointment } = useMutation({
    mutationFn: (appointmentId) =>
      axiosInstance.post("/patient/appointments/cancel", appointmentId),
    onSuccess: () => {
      toast.success("Appointment cancelled successfully!");
      queryClient.invalidateQueries("appointments");
    },
    onError: (error) => {
      toast.error(`Error cancelling appointment: ${error.message}`);
    },
    onSettled: () => {
      setIsCancelling(false);
    },
  });

  function handleReschedule(rowData) {
    setSelectedAppointment(rowData);
    setIsRescheduling(true);
  }

  function handleCancel(data) {
    setIsCancelling(true);
    cancelAppointment({ id: data.id });
  }

  const COLUMNS = columnDefinition({
    handleReschedule,
    handleCancel,
    isRescheduling,
    isCancelling,
  });
  const columns = useMemo(() => COLUMNS, []);
  const memoizeData = useMemo(() => appointmentsList || [], [appointmentsList]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: memoizeData,
    });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  function getRowClasses(status) {
    switch (status) {
      case "Cancelled":
        return "text-orange-400";
      case "Rejected":
        return "text-red-600";
      case "Completed":
        return "text-blue-600";
      case "Scheduled":
        return "text-green-600";
      case "Pending":
        return "text-yellow-400";
      default:
        return "";
    }
  }

  return (
    <Container>
      <div className="flex justify-end mb-4">
        <NavLink
          to="/patient"
          className="text-white px-4 py-1 rounded mr-1 bg-green-500 hover:bg-green-600"
        >
          Add New Appointment
        </NavLink>
      </div>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={i}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-blue-100 text-gray-700"
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
            const rowClasses = getRowClasses(row.original.status);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className={`${rowClasses} border`}
              >
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                    <td key={key} {...rest} className="border p-2">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Reschedule Modal */}
      {isRescheduling && (
        <RescheduleFormModal
          isOpen={isRescheduling}
          onClose={() => setIsRescheduling(false)}
          appointment={selectedAppointment}
        />
      )}
    </Container>
  );
}

export default PatientAppointments;
