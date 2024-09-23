import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Transition } from "@headlessui/react";
import axiosInstance from "@/lib/config/axiosInstance";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Error from "@/components/Error";
import { useState } from "react";

const RescheduleFormModal = ({ isOpen, onClose, appointment }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({ mode: "onTouched" });

  const { mutate: rescheduleAppointment } = useMutation({
    mutationFn: (data) =>
      axiosInstance.post(`/patient/appointments/reschedule`, {
        ...appointment,
        appointment_date: data.date,
        appointment_time: data.time,
      }),
    onSuccess: () => {
      toast.success("Appointment rescheduled successfully!");
      onClose();
      reset();
    },
    onError: (error) => {
      toast.error(`Error rescheduling appointment: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    rescheduleAppointment(data);
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
      className="fixed z-50  bg-gray-700 text-gray-300 dark:bg-gray-700 dark:text-gray-300 shadow-xl rounded-lg p-6 w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Reschedule Appointment
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Date Input */}
        <div className="mb-4">
          <Input
            id="date"
            type="date"
            autoComplete="date"
            {...register("date", { required: "Date is required" })}
            placeholder="Select date"
          />
          <Error message={errors["date"]?.message} />
        </div>

        {/* Time Input */}
        <div className="mb-4">
          <Input
            id="time"
            type="time"
            autoComplete="time"
            {...register("time", { required: "Time is required" })}
            placeholder="Select time"
          />
          <Error message={errors["time"]?.message} />
        </div>

        <div className="flex justify-between mt-4">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isSubmitting ? "Rescheduling..." : "Reschedule"}
          </Button>
        </div>
      </form>
    </Transition>
  );
};

export default RescheduleFormModal;
