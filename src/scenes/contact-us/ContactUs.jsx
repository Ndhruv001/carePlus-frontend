import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/config/axiosInstance";
import validateLetterCount from "@/lib/helpers/validateLetterCount";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Error from "@/components/Error";
import { toast } from "react-toastify";
import { useState } from "react";

function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (data) => axiosInstance.post("/user/contact-us", data),
    onSuccess: () => {
      toast.success("Your message has been sent successfully!");
      reset();
    },
    onError: (error) => {
      console.log("🚀 ~ FRONTEND ~ ContactUs ~ error:", error);
      toast.error("Failed to send message, please try again later.");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 max-w-xl text-center mb-6">
        If you have any questions, feedback, or need support, please feel free
        to contact us. We&apos;re here to help you!
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="name"
            {...register("name", { required: "Name is required" })}
          />
          <Error message={errors["name"]?.message} />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Your Email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <Error message={errors["email"]?.message} />
        </div>

        <div className="mb-4">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            rows={5}
            className={`w-full p-2 border border-gray-300 bg-gray-100 dark:border-gray-400 focus:outline-none pl-4 min-h-32 max-h-44 rounded-md dark:bg-gray-900`}
            {...register("message", {
              required: "Message is required",
              validate: validateLetterCount,
            })}
          ></textarea>
          <Error message={errors["message"]?.message} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}

export default ContactUs;
