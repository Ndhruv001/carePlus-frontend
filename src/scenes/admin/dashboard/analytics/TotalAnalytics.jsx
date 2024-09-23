import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";

function TotalAnalytics() {
  const {
    data: appointmentsCount,
    isLoading: loadingAppointments,
    isError: appointmentsError,
  } = useQuery({
    queryKey: ["appointments-count"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/appointments/count");
      return response.data.data.count;
    },
  });

  const {
    data: doctorsCount,
    isLoading: loadingDoctors,
    isError: doctorsError,
  } = useQuery({
    queryKey: ["doctors-count"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/doctors/count");
      return response.data.data.count;
    },
  });

  const {
    data: patientsCount,
    isLoading: loadingPatients,
    isError: patientsError,
  } = useQuery({
    queryKey: ["patients-count"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/patients/count");
      return response.data.data.count;
    },
  });

  if (loadingAppointments || loadingDoctors || loadingPatients) {
    return <LoadingPage />;
  }

  if (appointmentsError || doctorsError || patientsError) {
    return (
      <ErrorResponse
        error={appointmentsError || doctorsError || patientsError}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between gap-4">
        {/* Total Appointments */}
        <div className="w-1/3 bg-blue-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-700">Appointments</h3>
          <p className="mt-4 text-4xl font-bold text-blue-900">
            {appointmentsCount}
          </p>
        </div>

        {/* Total Doctors */}
        <div className="w-1/3 bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-green-700">
            Total Doctors
          </h3>
          <p className="mt-4 text-4xl font-bold text-green-900">
            {doctorsCount}
          </p>
        </div>

        {/* Total Patients */}
        <div className="w-1/3 bg-yellow-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-yellow-700">
            Total Patients
          </h3>
          <p className="mt-4 text-4xl font-bold text-yellow-900">
            {patientsCount}
          </p>
        </div>
      </div>
    </>
  );
}

export default TotalAnalytics;
