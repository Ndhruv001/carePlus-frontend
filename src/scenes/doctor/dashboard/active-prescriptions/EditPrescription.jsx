import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transition } from "@headlessui/react";
import axiosInstance from "@/lib/config/axiosInstance";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Button from "@/components/Button";
import Error from "@/components/Error";
import { useState } from "react";

const EditPrescription = ({ isOpen, onClose, prescription }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({ mode: "onTouched" });

  const { mutate: editPrescription } = useMutation({
    mutationFn: (data) =>
      axiosInstance.post(`/doctor/prescriptions/edit`, data),
    onSuccess: () => {
      queryClient.invalidateQueries("doctor-prescription");
      toast.success("prescription edit successfully!");
      onClose();
      reset();
    },
    onError: (error) => {
      toast.error(`Error edit prescription: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data) => {
    const formattedDosage = `${data.dosage_mg}, ${data.dosage_tablets} ${data.dosage_frequency.toLowerCase()}`;
    setIsSubmitting(true);
    editPrescription({
      id: prescription.id,
      medication_name: data.medication_name,
      dosage: formattedDosage,
    });
  };

  return (
    <>
      <Transition
        as="div"
        show={isOpen}
        enter="transition duration-500 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-300 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="fixed z-50  bg-gray-700 text-gray-300 dark:bg-gray-700 dark:text-gray-300 shadow-xl rounded-lg p-6 w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Edit prescription
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Medication Name */}
          <div className="mb-4">
            <Label htmlFor="medication_name">Medication Name</Label>
            <Input
              id="medication_name"
              type="text"
              autoComplete="medication_name"
              placeholder="Enter medication name"
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

          <div className="flex justify-between mt-4">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || !isDirty || isSubmitting}
            >
              {isSubmitting ? "Editing..." : "Edit"}
            </Button>
          </div>
        </form>
      </Transition>
    </>
  );
};

export default EditPrescription;
