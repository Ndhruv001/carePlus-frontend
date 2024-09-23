import { useFormContext } from "react-hook-form";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Error from "@/components/Error";

function BasicInformations() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const defaultValue = getValues();

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          autoComplete="name"
          defaultValue={defaultValue["name"] || ""}
          {...register("name", {
            required: "Name is required",
          })}
        />
        <Error message={errors["name"]?.message} />
      </div>
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="Enter your email"
          autoComplete="email"
          defaultValue={defaultValue["email"] || ""}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        <Error message={errors["email"]?.message} />
      </div>
      <div className="mb-6">
        <Label htmlFor="dob">DOB</Label>
        <Input
          id="dob"
          type="date"
          placeholder="Enter your DOB"
          autoComplete="dob"
          defaultValue={defaultValue["dob"] || ""}
          {...register("dob", { required: "Date of birth is required" })}
        />
        <Error message={errors["dob"]?.message} />
      </div>
      <div className="mb-6">
        <Label htmlFor="contact">Phone number</Label>
        <Input
          id="contact"
          type="number"
          placeholder="Enter your Phone No."
          autoComplete="contact"
          defaultValue={defaultValue["phone_number"] || ""}
          {...register("phone_number", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid phone number",
            },
          })}
        />
        <Error message={errors["phone_number"]?.message} />
      </div>
    </>
  );
}

export default BasicInformations;
