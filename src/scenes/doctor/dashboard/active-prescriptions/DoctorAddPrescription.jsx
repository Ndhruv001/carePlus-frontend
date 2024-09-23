import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/config/axiosInstance";
import { toast } from "react-toastify";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Error from "@/components/Error";
import Label from "@/components/Label";
import Input from "@/components/Input";

function DoctorAddPrescription() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (data) => axiosInstance.post("/doctor/prescriptions/add", data),
    onSuccess: () => {
      toast.success("Prescription add successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(`Error adding prescription: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  function onSubmit(data) {
    const formattedDosage = `${data.dosage_mg}, ${data.dosage_tablets} ${data.dosage_frequency.toLowerCase()}`;

    const updatedData = {
      ...data,
      dosage: formattedDosage,
    };

    delete updatedData.dosage_mg;
    delete updatedData.dosage_tablets;
    delete updatedData.dosage_frequency;

    setIsSubmitting(true);
    mutate(updatedData);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold font-serif text-center text-black dark:text-white mb-6">
          Add Prescription
        </h2>

        {/* Patient ID */}
        <div className="mb-4">
          <Label htmlFor="patient_id">Patient ID</Label>
          <Input
            id="patient_id"
            type="number"
            placeholder="Enter patient id"
            autoComplete="patient_id"
            {...register("patient_id", { required: "Patient ID is required" })}
          />
          <Error message={errors["patient_id"]?.message} />
        </div>

        {/* Medication Name */}
        <div className="mb-4">
          <Label htmlFor="medication_name">Medication Name</Label>
          <Input
            id="medication_name"
            type="text"
            placeholder="Enter medication name"
            autoComplete="medication_name"
            {...register("medication_name", {
              required: "Medication name is required",
            })}
          />
          <Error message={errors["medication_name"]?.message} />
        </div>

        {/* Dosage */}
        <div className="mb-4">
          <Label htmlFor="dosage">Dosage</Label>
          <div className="flex space-x-4">
            {/* mg selection */}
            <div className="flex-1">
              <select
                id="dosage"
                {...register("dosage_mg", {
                  required: "Dosage in mg is required",
                })}
                className={`w-full bg-gray-100 dark:bg-gray-900 dark:text-white p-2 border border-gray-300  focus:outline-none pl-4  rounded-md`}
              >
                <option value="">Select mg</option>
                <option value="10mg">10mg</option>
                <option value="50mg">50mg</option>
                <option value="100mg">100mg</option>
                <option value="200mg">200mg</option>
                <option value="250mg">250mg</option>
                <option value="500mg">500mg</option>
                <option value="750mg">750mg</option>
                <option value="1000mg">1000mg</option>
              </select>
              <Error message={errors["dosage_mg"]?.message} />
            </div>

            {/* Tablet count */}
            <div className="flex-1">
              <select
                {...register("dosage_tablets", {
                  required: "Tablet count is required",
                })}
                className={`w-full bg-gray-100 dark:bg-gray-900 dark:text-white p-2 border border-gray-300  focus:outline-none pl-4  rounded-md`}
              >
                <option value="">Select tablets</option>
                <option value="1 tablet">1 tablet</option>
                <option value="2 tablets">2 tablets</option>
                <option value="3 tablets">3 tablets</option>
                <option value="4 tablets">4 tablets</option>
                <option value="5 tablets">5 tablets</option>
                <option value="6 tablets">6 tablets</option>
                <option value="7 tablets">7 tablets</option>
                <option value="8 tablets">8 tablets</option>
                <option value="9 tablets">9 tablets</option>
                <option value="10 tablets">10 tablets</option>
              </select>
              <Error message={errors["dosage_tablets"]?.message} />
            </div>

            {/* Frequency */}
            <div className="flex-1">
              <select
                {...register("dosage_frequency", {
                  required: "Dosage frequency is required",
                })}
                className={`w-full bg-gray-100 dark:bg-gray-900 dark:text-white p-2 border border-gray-300  focus:outline-none pl-4  rounded-md`}
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <Error message={errors["dosage_frequency"]?.message} />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button type="submit" color="green">
            {isSubmitting ? "Submitting.." : "Add Medication"}
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default DoctorAddPrescription;
