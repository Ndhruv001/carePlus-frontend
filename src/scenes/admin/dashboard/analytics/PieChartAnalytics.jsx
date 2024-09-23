import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axiosInstance from "@/lib/config/axiosInstance";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";

const COLORS = {
  Cancelled: "#FFA07A",
  Scheduled: "#32CD32",
  Completed: "#1E90FF",
  Rejected: "#FF4500",
  Pending: "#FFD700",
};

function PieChartAnalytics() {
  const {
    data: appointmentsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointments-status-count"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/admin/appointments/status/count"
      );
      return response.data.data;
    },
  });

  const chartData = useMemo(() => {
    if (!appointmentsData) return [];

    return appointmentsData.map((item) => ({
      name: item.status,
      value: item.count,
    }));
  }, [appointmentsData]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h2 className="text-xl font-semibold">Appointments Status Overview</h2>
      <PieChart width={500} height={400}>
        <Pie
          data={chartData}
          cx={250}
          cy={180}
          innerRadius={60}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name] || "#8884d8"}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default PieChartAnalytics;
