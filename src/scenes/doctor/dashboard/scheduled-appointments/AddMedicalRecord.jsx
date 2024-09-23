import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transition } from "@headlessui/react";
import axiosInstance from "@/lib/config/axiosInstance";
import Label from "@/components/Label";
import Button from "@/components/Button";
import Error from "@/components/Error";
import validateLetterCount from "@/lib/helpers/validateLetterCount";
import AddPrescriptions from "./AddPrescriptions";

const AddMedicalRecord = ({ isOpen, onClose, appointment }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [medicalRecordData, setMedicalRecordData] = useState({});
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    reset,
  } = useForm({ mode: "onTouched" });

  const { mutate: addMedicalRecord } = useMutation({
    mutationFn: (data) =>
      axiosInstance.post(`/doctor/medical-records/add`, data),
    onSuccess: () => {
      queryClient.invalidateQueries("doctor-prescriptions-today");
      toast.success("Medical record added successfully!");
      onClose();
      reset();
    },
    onError: (error) => {
      toast.error(`Error adding medical record: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  function handlePrescribeMedicine() {
    setMedicalRecordData(getValues());
    setShowPrescription(true);
  }

  const onSubmit = (data) => {
    let payload = {};

    if (showPrescription) {
      const formattedDosage = `${data.dosage_mg}, ${data.dosage_tablets} ${data.dosage_frequency.toLowerCase()}`;
      payload = {
        prescription: {
          medication_name: data.medication_name,
          dosage: formattedDosage,
        },
        appointment_id: appointment.id,
        patient_id: appointment.patient_id,
        medical_record: medicalRecordData,
      };
    } else {
      payload = {
        appointment_id: appointment.id,
        patient_id: appointment.patient_id,
        medical_record: {
          record_type: data.record_type,
          details: data.details,
        },
      };
    }
    setIsSubmitting(true);
    addMedicalRecord(payload);
  };

  return (
    <Transition
      as="div"
      show={isOpen}
      enter="transition duration-500 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-300 ease-in"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      className="fixed z-50 bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300 shadow-xl rounded-lg p-6 w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {!showPrescription ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">
              Add Medical Record
            </h2>
            <div className="mb-4">
              <Label htmlFor="record_type">Record Type</Label>
              <select
                id="record_type"
                {...register("record_type", {
                  required: "Record type is required",
                })}
                className="w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-2 border border-gray-300 focus:outline-none pl-4 rounded-md"
              >
                <option value="">Select Type</option>
                <option value="Diagnosis">Diagnosis</option>
                <option value="Treatment">Treatment</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Surgical History">Surgical History</option>
                <option value="Lab Result">Lab Result</option>
              </select>
              <Error message={errors["record_type"]?.message} />
            </div>

            <div className="mb-4">
              <Label htmlFor="details">Details</Label>
              <textarea
                id="details"
                placeholder="Enter appointment summary here.."
                rows={5}
                className="w-full p-2 border border-gray-400 bg-gray-100 text-black dark:bg-gray-900 dark:text-white focus:outline-none pl-4 min-h-32 max-h-44 rounded-md"
                {...register("details", {
                  required: "Detail is required",
                  validate: validateLetterCount,
                })}
              ></textarea>
              <Error message={errors["details"]?.message} />
            </div>

            <button
              onClick={handlePrescribeMedicine}
              className="text-blue-500 hover:text-blue-600"
            >
              Prescribe Medicine {`->`}
            </button>
          </>
        ) : (
          <AddPrescriptions register={register} errors={errors} />
        )}
        <div className="flex justify-between mt-4">
          <Button type="button" onClick={onClose} color="red">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || !isDirty || isSubmitting}
            color="green"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Transition>
  );
};

export default AddMedicalRecord;
