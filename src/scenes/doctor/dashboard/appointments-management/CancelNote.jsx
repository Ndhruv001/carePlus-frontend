import { useForm } from "react-hook-form";
import { Transition } from "@headlessui/react";
import validateLetterCount from "@/lib/helpers/validateLetterCount";
import Label from "@/components/Label";
import Error from "@/components/Error";
import Button from "@/components/Button";
import { Fragment, useState } from "react";

const EditPrescription = ({ isOpen, onClose, handleCancelReason }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    handleCancelReason(data.reason);
    setIsSubmitting(true);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed z-50 bg-gray-700 text-gray-300 dark:bg-gray-700 dark:text-gray-300 shadow-xl rounded-lg p-6 w-96 max-w-md transform overflow-hidden transition-all">
              <h2 className="text-xl font-bold mb-4 text-center text-red-500">
                Are you sure you want to cancel appointment?
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Label htmlFor="reason">Please give a reason.</Label>
                  <textarea
                    id="reason"
                    rows={5}
                    className={`w-full p-2 border border-gray-400 bg-gray-100  text-black dark:bg-gray-800 dark:text-white focus:outline-none pl-4 min-h-32 max-h-44 rounded-md `}
                    {...register("reason", {
                      required: "reason is required",
                      validate: validateLetterCount,
                    })}
                  ></textarea>
                  <Error message={errors["reason"]?.message} />
                </div>
                <div className="flex justify-between mt-4">
                  <Button type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValid || !isDirty || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default EditPrescription;
