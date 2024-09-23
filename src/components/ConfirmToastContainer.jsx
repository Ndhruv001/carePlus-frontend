import { toast, ToastContainer, Zoom } from "react-toastify";
import Button from "@/components/Button";

function CustomConfirmToast({ message, onConfirm, onCancel }) {
  return (
    <div>
      <p>{message}</p>
      <div className="flex justify-end mt-2">
        <Button onClick={onConfirm} color="red">
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

function ConfirmToastContainer() {
  function showConfirmToast() {
    toast(
      <CustomConfirmToast
        message="Are you sure you want to cancel the appointment?"
        onConfirm={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
      />
    );
  }

  function handleConfirm(confirmation) {
    toast.dismiss();

    if (confirmation) {
      // ^ write the logic here for cancellation of an appointment
    }
  }

  return (
    <div>
      <Button onClick={showConfirmToast} color="red">
        Cancel
      </Button>
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={false}
      />
    </div>
  );
}

export default ConfirmToastContainer;
