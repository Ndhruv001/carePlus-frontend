import { useState, useMemo } from "react";
import { useTable } from "react-table";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import { COLUMNS } from "./columns";

const PopularTableAnalytics = () => {
  const [rowLimit, setRowLimit] = useState(10);

  const {
    data: popularDoctors,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["popular-doctors", rowLimit],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/doctors/popular?limit=${rowLimit}`
      );
      return response.data.data;
    },
    keepPreviousData: true,
  });

  const columns = useMemo(() => COLUMNS, []);

  const memoizedData = useMemo(() => popularDoctors || [], [popularDoctors]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: memoizedData,
    });

  const getPopularityShade = (popularity) => {
    const maxPopularity = Math.max(
      ...memoizedData.map((doc) => doc.appointment_count)
    );
    const shade = Math.round((popularity / maxPopularity) * 255);
    return `rgba(0, 128, 0, ${shade / 255})`; // Darker green for most popular
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorResponse error={error} />;

  return (
    <div className="flex flex-col gap-2 ">
      <h2 className="text-xl font-semibold text-center">Top Popular Doctors</h2>
      <div className="flex justify-end items-end mb-4">
        <select
          id="rowLimit"
          value={rowLimit}
          onChange={(e) => setRowLimit(Number(e.target.value))}
          className="border rounded p-1 dark:bg-gray-900 dark:text-white"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={i}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-blue-100 text-gray-700"
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="border p-2"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const popularity = row.original.appointment_count;
            const rowStyle = getPopularityShade(popularity);

            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                style={{ color: rowStyle }}
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    className="border p-2"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PopularTableAnalytics;
