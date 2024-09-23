import { useFormContext } from "react-hook-form";
import Input from "@/components/Input";
import Label from "@/components/Label";
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
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          className={`w-full bg-gray-100 p-2 border border-gray-300  focus:outline-none pl-4  rounded-md`}
          defaultValue={defaultValue["gender"] || ""}
          {...register("gender", { required: "Gender is required" })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <Error message={errors["gender"]?.message} />
      </div>
      <div className="mb-4">
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          placeholder="Enter your state"
          autoComplete="state"
          defaultValue={defaultValue["state"] || ""}
          {...register("state", { required: "State is required" })}
        />
        <Error message={errors["state"]?.message} />
      </div>
      <div className="mb-6">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Enter your city"
          autoComplete="city"
          defaultValue={defaultValue["city"] || ""}
          {...register("city", { required: "City is required" })}
        />
        <Error message={errors["city"]?.message} />
      </div>
    </>
  );
}

export default PersonalDetails;
