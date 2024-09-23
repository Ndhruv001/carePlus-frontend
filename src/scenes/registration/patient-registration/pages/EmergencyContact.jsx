import { useFormContext } from "react-hook-form";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Error from "@/components/Error";

function EmergencyContact() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const defaultValue = getValues();

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="name">Emergency Name</Label>
        <Input
          id="name"
          placeholder="Enter name"
          autoComplete="name"
          defaultValue={defaultValue["emergency_contact_name"] || ""}
          {...register("emergency_contact_name", {
            required: "Name is required",
          })}
        />
        <Error message={errors["emergency_contact_name"]?.message} />
      </div>
      <div className="mb-4">
        <Label htmlFor="contact">Emergency Phone Number</Label>
        <Input
          id="contact"
          type="number"
          placeholder="Enter Phone No."
          autoComplete="contact"
          defaultValue={defaultValue["emergency_contact_number"] || ""}
          {...register("emergency_contact_number", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        <Error message={errors["emergency_contact_number"]?.message} />
      </div>
    </>
  );
}

export default EmergencyContact;
