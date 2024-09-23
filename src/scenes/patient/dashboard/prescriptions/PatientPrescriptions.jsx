import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";
import DataContainer from "@/components/DataContainer";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import H4 from "@/components/H4";

function PatientPrescriptions() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["prescriptions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/patient/prescriptions/list");
      return response.data.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  return (
    <Container>
      {data.length > 0 ? (
        data.map((item) => {
          const isCompleted = item.status === "Completed";

          return (
            <DataContainer
              key={item.id}
              className={`transition-opacity ${isCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <a
                href={
                  isCompleted
                    ? undefined
                    : `https://www.drugs.com/search.php?searchterm=${item.medication_name}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 cursor-pointer underline ${isCompleted ? "pointer-events-none text-gray-500" : ""}`}
              >
                <H4>{item.medication_name}</H4>
              </a>

              <p
                className={`font-semibold ${isCompleted ? "text-gray-500" : ""}`}
              >
                Dosage:{" "}
                <span
                  className={`font-normal ${isCompleted ? "text-gray-500" : ""}`}
                >
                  {item.dosage}
                </span>
              </p>

              <p
                className={`font-semibold ${isCompleted ? "text-gray-500" : ""}`}
              >
                Status:{" "}
                <span
                  className={`font-normal ${isCompleted ? "text-gray-500" : ""}`}
                >
                  {item.status}
                </span>
              </p>

              <p
                className={`font-semibold ${isCompleted ? "text-gray-500" : ""}`}
              >
                Suggested by:{" "}
                <span
                  className={`font-normal ${isCompleted ? "text-gray-500" : ""}`}
                >
                  Dr. {item.doctor_name}
                </span>
              </p>
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

export default PatientPrescriptions;
