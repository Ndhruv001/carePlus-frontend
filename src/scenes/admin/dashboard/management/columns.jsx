import Button from "@/components/Button";
import { NavLink } from "react-router-dom";

const COLUMNS = ({ handleApprove, handleReject, isApproving, isRejecting }) => [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Specialization",
    accessor: "specialization",
  },
  {
    Header: "Experience",
    accessor: "experience",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <div className="flex justify-center">
        <NavLink
          to={`doctor-profile/${row.original.id}`}
          className="text-white px-4 py-1 rounded mr-1 bg-blue-500 hover:bg-blue-600"
        >
          View
        </NavLink>
        <Button onClick={() => handleApprove(row.original)} color="green">
          {isApproving ? "Saving.." : "Approve"}
        </Button>
        <Button onClick={() => handleReject(row.original)} color="red">
          {isRejecting ? "Saving.." : "Reject"}
        </Button>
      </div>
    ),
  },
];

export { COLUMNS };
