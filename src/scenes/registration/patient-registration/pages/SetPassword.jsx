import { useFormContext } from "react-hook-form";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Error from "@/components/Error";

function SetPassword() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const defaultValue = getValues();

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          autoComplete="password"
          defaultValue={defaultValue["password"] || ""}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <Error message={errors["password"]?.message} />
      </div>
      <div className="mb-4">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm password"
          autoComplete="confirm-password"
          defaultValue={defaultValue["confirm_password"] || ""}
          {...register("confirm_password", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === defaultValue["password"] || "Passwords do not match",
          })}
        />
        <Error message={errors["confirm-password"]?.message} />
      </div>
      <div className="mb-4">
        <Label>
          <input
            type="checkbox"
            {...register("consent", {
              required: "Must be checked before submitting the form",
            })}
          />
          <span className="ml-2 text-gray-700">
            I agree to the terms and conditions
          </span>
        </Label>
      </div>
    </>
  );
}

export default SetPassword;
