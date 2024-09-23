import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "@/lib/config/axiosInstance";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";

function BarchartAnalytics() {
  const [userType, setUserType] = useState("doctor");
  const [timeHorizon, setTimeHorizon] = useState("daily");

  const {
    data: registrationData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["registration-trends", userType, timeHorizon],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/analytics/${userType}/${timeHorizon}`
      );
      return response.data.data;
    },
  });
  console.log("🚀 ~ BarchartAnalytics ~ registrationData:", registrationData);

  const chartData = useMemo(() => {
    if (!registrationData) return [];

    return registrationData.map((item) => ({
      date: item.date,
      count: item.count,
    }));
  }, [registrationData]);

  const customTooltipStyles = useMemo(() => {
    return {
      backgroundColor: "#fff",
      color: "#000",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #000",
    };
  }, []);

  const handleUserTypeChange = (e) => setUserType(e.target.value);
  const handleTimeHorizonChange = (e) => setTimeHorizon(e.target.value);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorResponse error={error} />;

  return (
    <div className="flex flex-col gap-2 ">
      <h2 className="text-xl font-semibold text-center">Registration Trend</h2>
      <div className="flex justify-between mb-4">
        {/* User Type Dropdown (Doctor/Patient) */}
        <div>
          <select
            id="userType"
            value={userType}
            onChange={handleUserTypeChange}
            className="p-2 rounded border dark:bg-gray-900 dark:text-gray-300 hover:cursor-pointer"
          >
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>

        {/* Time Horizon Dropdown (Daily/Monthly/Yearly) */}
        <div>
          <select
            id="timeHorizon"
            value={timeHorizon}
            onChange={handleTimeHorizonChange}
            className="p-2 rounded border dark:bg-gray-900 dark:text-gray-300 hover:cursor-pointer"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={customTooltipStyles} />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarchartAnalytics;
