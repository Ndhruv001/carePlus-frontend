import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";
import ErrorResponse from "@/components/ErrorResponse";
import DataContainer from "@/components/DataContainer";
import LoadingPage from "@/components/LoadingPage";
import Container from "@/components/Container";
import H4 from "@/components/H4";
import DoctorOnePatientRecordsAccess from "./DoctorOnePatientRecordsAccess";

function DoctorMedicalRecordsAccess() {
  const { patientId } = useParams();
  console.log("🚀 ~ DoctorMedicalRecordsAccess ~ patientId:", patientId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctor-medical-records-access"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/medical-records/list");
      return response.data.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  if (patientId) {
    if (!patientId) {
      return <p>Records not found.</p>;
    }

    return <DoctorOnePatientRecordsAccess />;
  }

  return (
    <Container>
      {data.length > 0 ? (
        data.map((item) => {
          return (
            <DataContainer key={item.id}>
              <H4>Patient: {item.patient_name}</H4>

              <p className="font-semibold ">
                Contact:{" "}
                <span className="font-normal">{item.patient_phone_number}</span>
              </p>

              <p className="font-semibold mb-2">
                Last Check-up:{" "}
                <span className="font-normal">{item.last_visit}</span>
              </p>

              <NavLink
                to={`${item.patient_id}`}
                className="text-white px-4 py-1 rounded mr-1 bg-blue-500 hover:bg-blue-600"
              >
                View Records
              </NavLink>
            </DataContainer>
          );
        })
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          There is no data available.
        </p>
      )}
    </Container>
  );
}

export default DoctorMedicalRecordsAccess;
