import Input from "@/components/Input";
import Label from "@/components/Label";
import { useFormContext } from "react-hook-form";
import Error from "@/components/Error";

function PersonalDetails() {
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
          {...register("name", { required: "Name is required" })}
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

      <div className="mb-4">
        <Label htmlFor="contact">Phone Number</Label>
        <Input
          id="contact"
          type="tel"
          placeholder="Enter your phone number"
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

      <div className="mb-4">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          autoComplete="dob"
          defaultValue={defaultValue["dob"] || ""}
          {...register("dob", { required: "Date of birth is required" })}
        />
        <Error message={errors["dob"]?.message} />
      </div>

      <div className="mb-4">
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          className={`w-full bg-gray-100 p-2 border border-gray-300  focus:outline-none pl-4  rounded-md`}
          defaultValue={defaultValue["gender"] || ""}
          {...register("gender", {
            required: "Gender is required",
          })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <Error message={errors["gender"]?.message} />
      </div>
    </>
  );
}

export default PersonalDetails;
