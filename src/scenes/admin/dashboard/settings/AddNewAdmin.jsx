import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Transition } from "@headlessui/react";
import axiosInstance from "@/lib/config/axiosInstance";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Error from "@/components/Error";
import Button from "@/components/Button";
import { useState } from "react";

const AddNewAdmin = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    reset,
  } = useForm({ mode: "onTouched" });

  const password = watch("password");

  const { mutate } = useMutation({
    mutationFn: (data) => axiosInstance.post("/admin/new-admin/add", data),

    onSuccess: () => {
      toast.success("Admin added successfully!");
      onClose();
      reset();
    },

    onError: (error) => {
      console.log("🚀~ FRONTEND ~ AddNewAdmin ~ error:", error.message);
      toast.error("Something went wrong.");
    },

    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  function onSubmit(data) {
    setIsSubmitting(true);
    mutate(data);
  }

  return (
    <>
      <Transition
        show={isOpen}
        enter="transition duration-500 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-300 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
          <h2 className="text-xl font-bold mb-4">Add New Admin</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                autoComplete="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long",
                  },
                })}
              />
              <Error message={errors["name"]?.message} />
            </div>

            {/* Email */}
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                autoComplete="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <Error message={errors["email"]?.message} />
            </div>

            {/* Password */}
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                autoComplete="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <Error message={errors["password"]?.message} />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                placeholder="Re-enter password"
                {...register("confirm_password", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <Error message={errors["confirm_password"]?.message} />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid || !isDirty || isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Admin"}
              </Button>
            </div>
          </form>
        </div>
      </Transition>
    </>
  );
};

export default AddNewAdmin;
