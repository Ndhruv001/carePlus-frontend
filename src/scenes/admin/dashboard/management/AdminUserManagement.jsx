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

function AdminUserManagement() {
  const [isRejecting, setIsRejecting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: appointmentsList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["approval-list"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/admin/management/approval/list"
      );
      return response.data.data;
    },
  });

  const { mutate: approve } = useMutation({
    mutationFn: (registrationId) =>
      axiosInstance.post("/admin/management/approval/approve", registrationId),
    onSuccess: () => {
      toast.success("Approved");
      queryClient.invalidateQueries("approval-list");
    },
    onError: (error) => {
      toast.error(`Error approve registration: ${error.message}`);
    },
    onSettled: () => {
      setIsApproving(false);
    },
  });

  const { mutate: reject } = useMutation({
    mutationFn: (registrationId) =>
      axiosInstance.post("/admin/management/approval/reject", registrationId),
    onSuccess: () => {
      toast.success("Rejected!");
      queryClient.invalidateQueries("approval-list");
    },
    onError: (error) => {
      toast.error(`Error reject registration: ${error.message}`);
    },
    onSettled: () => {
      setIsRejecting(false);
    },
  });

  function handleApprove(rowData) {
    setIsApproving(true);
    approve({ registrationId: rowData.id });
  }
  function handleReject(rowData) {
    setIsRejecting(true);
    reject({ registrationId: rowData.id });
  }

  const COLUMNS = columnDefinition({
    handleApprove,
    handleReject,
    isRejecting,
    isApproving,
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
      <table
        {...getTableProps()}
        className="w-full border-collapse overflow-scroll"
      >
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

export default AdminUserManagement;
