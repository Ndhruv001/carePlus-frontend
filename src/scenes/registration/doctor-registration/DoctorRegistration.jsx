import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import PersonalDetails from "./pages/PersonalDetails";
import ProfessionalDetails from "./pages/ProfessionalDetails";
import AdditionalInformation from "./pages/AdditionalInformation";
import SetPassword from "./pages/SetPassword";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axiosInstance";

function DoctorRegistration() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data) => axiosInstance.post("/doctor/auth/register", data),
    onSuccess: () => {
      toast.success("Registration successfull! redirect to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },

    onError: (error) => {
      console.log("🚀 ~ Frontend ~ DoctorRegistration ~ error:", error);

      if (error.response?.status === 409) {
        toast.error("Email is already exist! try with different email");
      } else {
        toast.error("Registration failed! Please try again.");
      }
    },

    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const methods = useForm();
  const { isDirty, isValid } = methods.formState;

  function prevStep(e) {
    e.preventDefault();
    setStep((prev) => prev - 1);
  }

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function onSubmit(data) {
    if (step < 4) {
      nextStep();
    } else {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append(key, file);
          });
        } else if (
          Array.isArray(value) &&
          value.every((item) => item instanceof File)
        ) {
          value.forEach((file) => {
            formData.append(key, file);
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      setIsSubmitting(true);
      mutate(formData);
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            Step {step} of 4
          </h2>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <PersonalDetails />}
            {step === 2 && <ProfessionalDetails />}
            {step === 3 && <AdditionalInformation />}
            {step === 4 && <SetPassword />}

            <div className="flex justify-between mt-4">
              {step > 1 && (
                <Button type="button" onClick={prevStep}>
                  Previous
                </Button>
              )}

              <Button
                type="submit"
                disabled={step === 4 && (!isDirty || !isValid)}
              >
                {isSubmitting ? "Submitting..." : step < 4 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

export default DoctorRegistration;
