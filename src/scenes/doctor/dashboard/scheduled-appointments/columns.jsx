import Button from "@/components/Button";

const COLUMNS = ({ handleComplete }) => [
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
        <Button onClick={() => handleComplete(row.original)} color="green">
          complete
        </Button>
      </div>
    ),
  },
];

export { COLUMNS };
