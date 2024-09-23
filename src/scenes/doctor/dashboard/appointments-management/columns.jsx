import Button from "@/components/Button";

const COLUMNS = ({ handleAccept, handleCancel, isAccepting, isCancelling }) => [
  {
    Header: "Date",
    accessor: "appointment_date",
  },
  {
    Header: "Time",
    accessor: "appointment_time",
  },
  {
    Header: "Patient",
    accessor: "patient_name",
  },
  {
    Header: "Purpose",
    accessor: "purpose",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          disabled={row.original.status === "Scheduled"}
          onClick={() => handleAccept(row.original)}
          color="green"
        >
          {isAccepting ? "Saving.." : "Accept"}
        </Button>
        <Button onClick={() => handleCancel(row.original)} color="red">
          {isCancelling ? "Saving.." : "Cancel"}
        </Button>
      </div>
    ),
  },
];

export { COLUMNS };
