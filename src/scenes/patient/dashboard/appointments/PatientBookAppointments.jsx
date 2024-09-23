import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";
import { toast } from "react-toastify";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Button from "@/components/Button";
import Error from "@/components/Error";
import { useState } from "react";

function BookAppointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: doctors, isLoading: loadingDoctors } = useQuery({
    queryKey: ["doctors-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/list");
      return response.data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => axiosInstance.post("/patient/book-appointment", data),
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(`Error booking appointment: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    mutate(data);
  };

  return (
    <Container>
      <h2 className="text-2xl font-bold font-serif text-center text-black dark:text-white mb-6">
        Book Appointment
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            placeholder="Select date"
            autoComplete="date"
            {...register("date", { required: "Date is required" })}
          />
          <Error message={errors["date"]?.message} />
        </div>

        <div className="mb-4">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            placeholder="Select time"
            autoComplete="time"
            {...register("time", { required: "Time is required" })}
          />
          <Error message={errors["time"]?.message} />
        </div>

        <div className="mb-4">
          <Label htmlFor="doctor">Doctor</Label>
          <div className="relative">
            {/* Doctor selection dropdown */}
            <select
              id="doctor"
              className={`w-full bg-gray-100 dark:bg-gray-900 dark:text-white p-2 border border-gray-300 focus:outline-none pl-4 rounded-md`}
              {...register("doctorId", { required: "Please select a doctor" })}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select a doctor</option>
              {loadingDoctors ? (
                <option>Loading doctors...</option>
              ) : (
                doctors?.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name}
                  </option>
                ))
              )}
            </select>

            {/* Error message if no doctor is selected */}
            <Error message={errors["doctorId"]?.message} />

            {/* View Profile button, only visible when a doctor is selected */}
            {selectedDoctor && (
              <div className="mt-2">
                <NavLink
                  to={`doctor-profile/${selectedDoctor}`}
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="purpose">Purpose</Label>
          <select
            id="purpose"
            className={`w-full bg-gray-100 dark:bg-gray-900 dark:text-white p-2 border border-gray-300  focus:outline-none pl-4  rounded-md`}
            {...register("purpose", {
              required: "Purpose is required",
            })}
          >
            <option value="">Select a purpose</option>
            <option value="Checkup">Checkup</option>
            <option value="Consultation">Consultation</option>
            <option value="Follow-Up">Follow-Up</option>
            <option value="Test">Test</option>
            <option value="Emergency">Emergency</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Other">Other</option>
          </select>
          <Error message={errors["purpose"]?.message} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </Button>
      </form>
    </Container>
  );
}

export default BookAppointment;
