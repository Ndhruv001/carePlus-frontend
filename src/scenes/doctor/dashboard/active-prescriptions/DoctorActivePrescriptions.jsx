import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/config/axiosInstance";
import DataContainer from "@/components/DataContainer";
import Container from "@/components/Container";
import LoadingPage from "@/components/LoadingPage";
import ErrorResponse from "@/components/ErrorResponse";
import Button from "@/components/Button";
import H4 from "@/components/H4";
import EditPrescription from "./EditPrescription";

function DoctorActivePrescriptions() {
  const [isCompleting, setIsCompleting] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctor-prescriptions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/prescriptions/list");
      return response.data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (prescriptionId) =>
      axiosInstance.post(
        "/doctor/prescriptions/mark-as-complete",
        prescriptionId
      ),
    onSuccess: () => {
      toast.success("Prescription complete successfully");
      queryClient.invalidateQueries("doctor-prescriptions");
    },
    onError: (error) => {
      console.log("🚀~ FRONTEND ~ DoctorActivePrescriptions ~ error:", error);
      toast.error("Error while prescription marking");
    },
    onSettled: () => {
      setIsCompleting(false);
    },
  });

  function handleEdit(prescription) {
    setIsEditing(true);
    setSelectedPrescription(prescription);
  }

  function handleComplete(data) {
    setIsCompleting(true);
    mutate({ id: data.id });
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorResponse error={error} />;
  }

  return (
    <Container>
      <div className="flex justify-end mb-4">
        <NavLink
          to="/doctor/add-prescriptions"
          className="text-white px-4 py-1 rounded mr-1 bg-green-500 hover:bg-green-600"
        >
          Add New Prescription
        </NavLink>
      </div>
      {data.length > 0 ? (
        data.map((item) => {
          return (
            <DataContainer key={item.id}>
              <NavLink
                to={`/doctor/medical-records-access/${item.patient_id}`}
                className="hover:text-blue-500 cursor-pointer underline "
              >
                <H4>Patient: {item.patient_name}</H4>
              </NavLink>

              <p className="font-semibold ">
                Medication:{" "}
                <span className="font-normal">{item.medication}</span>
              </p>

              <p className="font-semibold ">
                Dosage: <span className="font-normal">{item.dosage}</span>
              </p>

              <p className="font-semibold ">
                Status: <span className="font-normal">{item.status}</span>
              </p>
              <Button onClick={() => handleEdit(item)}>
                Edit Prescription
              </Button>
              <Button
                color="red"
                disabled={isCompleting}
                onClick={() => handleComplete(item)}
              >
                {isCompleting ? "Saving.." : "Complete"}
              </Button>
            </DataContainer>
          );
        })
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          There is no data available.
        </p>
      )}

      {/* Reschedule Modal */}
      {isEditing && (
        <EditPrescription
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          prescription={selectedPrescription}
        />
      )}
    </Container>
  );
}

export default DoctorActivePrescriptions;
